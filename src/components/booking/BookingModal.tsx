import { useEffect, useReducer, useState } from 'react'
import { ApiError } from '@/api/client'
import { useCreateHold } from '@/api/queries/holds/useCreateHold'
import { useRefreshSessions } from '@/api/queries/sessions/useRefreshSessions'
import { useHoldData } from '@/api/queries/holds/useHoldData'
import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import { useSeatMapData } from '@/api/queries/sessions/useSeatMapData'
import type { Session } from '@/api/types'
import { useAuth } from '@/hooks/useAuth'
import { storage } from '@/utils/storage'
import { ErrorState } from '@/components/core/ErrorState'
import { Modal } from '@/components/core/Modal'
import { Spinner } from '@/components/core/Spinner'
import { BookingHeader } from './BookingHeader'
import { BookingStep } from './types'
import { BookingActionType, bookingReducer, getInitialBookingState } from './bookingReducer'
import { CheckoutStep } from './CheckoutStep'
import { ConfirmationView } from './ConfirmationView'
import { SeatSelectionStep } from './SeatSelectionStep'
import { useHoldCountdown } from './useHoldCountdown'
import { getHoldStorageKey, getSelectedSeats } from './utils'

type BookingModalProps = {
  session: Session
  onClose: () => void
}

/** Mount it when a session is picked and unmount it on close, so every opening starts on step 1. */
export function BookingModal({ session, onClose }: BookingModalProps) {
  const { user } = useAuth()
  const {
    data: filterOptions,
    isError: isFilterOptionsError,
    isFetching: isFetchingFilterOptions,
    refetch: refetchFilterOptions,
  } = useFilterOptionsData()
  const seatMap = useSeatMapData(session.id)
  const createHold = useCreateHold(session.id)
  const refreshSessions = useRefreshSessions()

  // A hold from an earlier opening or a page reload. It is read once, when the modal opens.
  const holdKey = getHoldStorageKey(session.id)
  const [savedHoldId] = useState(() => storage.get(holdKey))
  const savedHold = useHoldData(savedHoldId)

  const [{ step, selected, hold, order, notice, lostCodes, isResumed }, dispatch] = useReducer(
    bookingReducer,
    !!savedHoldId,
    getInitialBookingState,
  )
  const isResuming = !isResumed && !seatMap.isError

  const isSavedHoldLive = savedHold.data?.isLive === true && savedHold.data.sessionId === session.id
  const isSavedHoldStale = savedHold.isError || (!!savedHold.data && !isSavedHoldLive)

  // Needs the seat map to find the seats. Dispatched once, during render, so the seat step never flashes before checkout.
  if (!isResumed && !savedHold.isPending && seatMap.data) {
    if (savedHold.data && isSavedHoldLive) {
      dispatch({
        type: BookingActionType.HoldResumed,
        hold: savedHold.data,
        selected: getSelectedSeats(seatMap.data, savedHold.data.seats),
      })
    } else {
      dispatch({
        type: BookingActionType.Resumed,
        isHoldExpired: !!savedHold.data && !savedHold.data.isLive,
      })
    }
  }

  // An expired or unknown hold is forgotten.
  useEffect(() => {
    if (isSavedHoldStale) storage.remove(holdKey)
  }, [isSavedHoldStale, holdKey])

  const secondsLeft = useHoldCountdown(order ? null : (hold?.expiresAt ?? null), handleHoldExpired)

  function handleSeatsLost(codes: string[]) {
    dispatch({ type: BookingActionType.SeatsLost, codes })
    storage.remove(holdKey)
  }

  function handleHoldExpired() {
    dispatch({ type: BookingActionType.HoldExpired })
    storage.remove(holdKey)
    refreshSessions()
  }

  function holdSeats() {
    dispatch({ type: BookingActionType.NoticeChanged, notice: null })
    const seats = selected.map(({ seat, ticketType }) => ({ seatId: seat.id, ticketType }))
    createHold.mutate(seats, {
      onSuccess: (data) => {
        dispatch({ type: BookingActionType.Held, hold: data })
        storage.set(holdKey, data.holdId)
      },
      onError: (error) => {
        if (!(error instanceof ApiError)) {
          return dispatch({
            type: BookingActionType.NoticeChanged,
            notice: 'Could not hold the seats. Please try again.',
          })
        }
        if (error.status === 409) handleSeatsLost(error.contested ?? [])
        else {
          const message = Object.values(error.errors ?? {})[0]?.[0] ?? error.message
          dispatch({ type: BookingActionType.NoticeChanged, notice: message })
        }
      },
    })
  }

  return (
    <Modal open onClose={onClose} className={`w-286.5 ${order ? '' : 'min-h-165'}`}>
      {order ? (
        <ConfirmationView order={order} onClose={onClose} />
      ) : isFilterOptionsError && !filterOptions ? (
        <ErrorState
          message="Could not load the booking options."
          onRetry={() => refetchFilterOptions()}
          isRetrying={isFetchingFilterOptions}
        />
      ) : !filterOptions || !user || seatMap.isPending || isResuming ? (
        <Spinner className="absolute inset-0 m-auto" />
      ) : (
        <div className="flex flex-col gap-8">
          <BookingHeader session={session} secondsLeft={secondsLeft} />
          {step === BookingStep.Seats || !hold ? (
            <SeatSelectionStep
              session={session}
              filterOptions={filterOptions}
              seatMap={seatMap.data}
              onRetryMap={() => seatMap.refetch()}
              isRetryingMap={seatMap.isFetching}
              selected={selected}
              lostCodes={lostCodes}
              notice={notice}
              isPending={createHold.isPending}
              onToggleSeat={(seat, sectionName) =>
                dispatch({
                  type: BookingActionType.SeatToggled,
                  seat,
                  sectionName,
                  maxSeats: filterOptions.maxSeatsPerOrder,
                })
              }
              onChangeType={(seatId, ticketType) =>
                dispatch({ type: BookingActionType.TicketTypeChanged, seatId, ticketType })
              }
              onNext={holdSeats}
            />
          ) : (
            <CheckoutStep
              session={session}
              hold={hold}
              user={user}
              onBackToSeats={() => dispatch({ type: BookingActionType.BackToSeats })}
              onPaid={(paid) => {
                storage.remove(holdKey)
                dispatch({ type: BookingActionType.Paid, order: paid })
              }}
              onHoldExpired={handleHoldExpired}
              onSeatsLost={handleSeatsLost}
            />
          )}
        </div>
      )}
    </Modal>
  )
}
