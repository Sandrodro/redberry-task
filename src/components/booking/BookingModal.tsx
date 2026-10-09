import { useState } from 'react'
import { ApiError } from '@/api/client'
import { useCreateHold } from '@/api/queries/holds/useCreateHold'
import { useRefreshSessions } from '@/api/queries/sessions/useRefreshSessions'
import { useReleaseHold } from '@/api/queries/holds/useReleaseHold'
import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import { useSeatMapData } from '@/api/queries/sessions/useSeatMapData'
import type { Order, Seat, SeatHold, Session } from '@/api/types'
import { useAuth } from '@/hooks/useAuth'
import { ErrorState } from '@/components/core/ErrorState'
import { Modal } from '@/components/core/Modal'
import { Spinner } from '@/components/core/Spinner'
import { BookingHeader } from './BookingHeader'
import { CheckoutStep } from './CheckoutStep'
import { ConfirmationView } from './ConfirmationView'
import { SeatSelectionStep } from './SeatSelectionStep'
import type { BookingStep } from './StepIndicator'
import type { SelectedSeat } from './types'
import { useHoldCountdown } from './useHoldCountdown'

const HOLD_EXPIRED_MESSAGE = 'Your hold time expired. Please re-select your seats.'

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
  const releaseHold = useReleaseHold()
  const refreshSessions = useRefreshSessions()

  const [step, setStep] = useState<BookingStep>('seats')
  const [selected, setSelected] = useState<SelectedSeat[]>([])
  const [hold, setHold] = useState<SeatHold | null>(null)
  const [order, setOrder] = useState<Order | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [lostCodes, setLostCodes] = useState<string[]>([])

  const secondsLeft = useHoldCountdown(order ? null : (hold?.expiresAt ?? null), handleHoldExpired)

  function handleClose() {
    // A paid hold became an order. Any other live hold goes back on the map right away.
    if (hold && !order) releaseHold.mutate(hold.holdId)
    onClose()
  }

  function toggleSeat(seat: Seat, sectionName: string) {
    if (!filterOptions) return
    setNotice(null)
    if (selected.some((item) => item.seat.id === seat.id)) {
      setSelected(selected.filter((item) => item.seat.id !== seat.id))
    } else if (selected.length >= filterOptions.maxSeatsPerOrder) {
      setNotice(`You can select up to ${filterOptions.maxSeatsPerOrder} seats per order.`)
    } else {
      setSelected([...selected, { seat, sectionName, ticketType: 'adult' }])
    }
  }

  /** Seats another buyer took. They show as sold, leave the selection, and the rest of the selection stays. */
  function handleSeatsLost(codes: string[]) {
    setLostCodes((current) => [...new Set([...current, ...codes])])
    setSelected((current) => current.filter((item) => !codes.includes(item.seat.code)))
    setHold(null)
    setStep('seats')
    setNotice(`Seats ${codes.join(', ')} were just taken. Your other seats are still selected.`)
  }

  function handleHoldExpired() {
    setHold(null)
    setSelected([])
    setLostCodes([])
    setStep('seats')
    setNotice(HOLD_EXPIRED_MESSAGE)
    refreshSessions()
  }

  function holdSeats() {
    setNotice(null)
    const seats = selected.map(({ seat, ticketType }) => ({ seatId: seat.id, ticketType }))
    createHold.mutate(seats, {
      onSuccess: (data) => {
        setHold(data)
        setStep('checkout')
      },
      onError: (error) => {
        if (!(error instanceof ApiError))
          return setNotice('Could not hold the seats. Please try again.')
        if (error.status === 409) handleSeatsLost(error.contested ?? [])
        else setNotice(Object.values(error.errors ?? {})[0]?.[0] ?? error.message)
      },
    })
  }

  return (
    <Modal open onClose={handleClose} className={`w-286.5 ${order ? '' : 'min-h-165'}`}>
      {order ? (
        <ConfirmationView order={order} onClose={handleClose} />
      ) : isFilterOptionsError && !filterOptions ? (
        <ErrorState
          message="Could not load the booking options."
          onRetry={() => refetchFilterOptions()}
          isRetrying={isFetchingFilterOptions}
        />
      ) : !filterOptions || !user || seatMap.isPending ? (
        <Spinner className="absolute inset-0 m-auto" />
      ) : (
        <div className="flex flex-col gap-8">
          <BookingHeader session={session} secondsLeft={secondsLeft} />
          {step === 'seats' || !hold ? (
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
              onToggleSeat={toggleSeat}
              onChangeType={(seatId, ticketType) =>
                setSelected(
                  selected.map((item) =>
                    item.seat.id === seatId ? { ...item, ticketType } : item,
                  ),
                )
              }
              onNext={holdSeats}
            />
          ) : (
            <CheckoutStep
              session={session}
              hold={hold}
              user={user}
              onBackToSeats={() => setStep('seats')}
              onPaid={setOrder}
              onHoldExpired={handleHoldExpired}
              onSeatsLost={handleSeatsLost}
            />
          )}
        </div>
      )}
    </Modal>
  )
}
