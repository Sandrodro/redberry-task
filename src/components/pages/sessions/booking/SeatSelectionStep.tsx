import type { FilterOptions, Seat, SeatMap as SeatMapData, Session, TicketTypeSlug } from '@/api/types'
import { useAuth } from '@/hooks/useAuth'
import { getTicketPrice, roundPrice } from '@/utils/ticketPrice'
import { Button } from '@/components/core/Button'
import { Typography } from '@/components/core/Typography'
import { SeatMap } from './SeatMap'
import { SelectedSeatCard } from './SelectedSeatCard'
import { StepLayout } from './StepLayout'
import type { SelectedSeat } from './types'

type SeatSelectionStepProps = {
  session: Session
  filterOptions: FilterOptions
  seatMap: SeatMapData | undefined
  isMapError: boolean
  onRetryMap: () => void
  selected: SelectedSeat[]
  lostCodes: string[]
  notice: string | null
  isPending: boolean
  onToggleSeat: (seat: Seat, sectionName: string) => void
  onChangeType: (seatId: number, slug: TicketTypeSlug) => void
  onNext: () => void
}

export function SeatSelectionStep({
  session,
  filterOptions,
  seatMap,
  isMapError,
  onRetryMap,
  selected,
  lostCodes,
  notice,
  isPending,
  onToggleSeat,
  onChangeType,
  onNext,
}: SeatSelectionStepProps) {
  const { user } = useAuth()
  const { minAge, code: ageCode } = session.movie.ageRating
  const tooYoung = user?.age != null && user.age < minAge
  // Cheapest first, as in the design: Child, Student, Adult.
  const ticketTypes = [...filterOptions.ticketTypes].sort((a, b) => a.priceRatio - b.priceRatio)
  const blockedTypes = ticketTypes
    .filter((type) => type.blockedFromRatingAge !== null && minAge >= type.blockedFromRatingAge)
    .map((type) => type.slug)

  const prices = selected.map(({ ticketType }) => {
    const type = ticketTypes.find((item) => item.slug === ticketType)
    return getTicketPrice(session.price, type?.priceRatio ?? 1)
  })
  const subtotal = roundPrice(prices.reduce((sum, price) => sum + price, 0))
  const message = tooYoung ? `You must be at least ${minAge} years old to book ${ageCode} titles.` : notice

  return (
    <StepLayout
      step="seats"
      onSeatsClick={() => {}}
      main={
        seatMap ? (
          <SeatMap
            map={seatMap}
            selectedIds={selected.map(({ seat }) => seat.id)}
            lostCodes={lostCodes}
            onToggle={onToggleSeat}
          />
        ) : isMapError ? (
          <div className="flex flex-col items-start gap-3">
            <Typography variant="bodyM" className="text-muted">
              Could not load the hall map.
            </Typography>
            <Button variant="tertiary" size="sm" onClick={onRetryMap}>
              Try again
            </Button>
          </div>
        ) : (
          <Typography variant="bodyM" className="text-muted">
            Loading the hall map...
          </Typography>
        )
      }
      aside={
        <>
          <Typography variant="button">Your seats · Max {filterOptions.maxSeatsPerOrder}</Typography>
          <div className="flex max-h-87.75 flex-col gap-3 overflow-y-auto">
            {selected.length === 0 ? (
              <Typography variant="bodyS" className="text-muted">
                Pick up to {filterOptions.maxSeatsPerOrder} seats from the map. Each seat can carry its own
                ticket type.
              </Typography>
            ) : (
              selected.map((item, index) => (
                <SelectedSeatCard
                  key={item.seat.id}
                  selected={item}
                  ticketTypes={ticketTypes}
                  blockedTypes={blockedTypes}
                  price={prices[index]}
                  onChangeType={(slug) => onChangeType(item.seat.id, slug)}
                  onRemove={() => onToggleSeat(item.seat, item.sectionName)}
                />
              ))
            )}
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-2.5">
            {message && (
              <Typography variant="labelS" className="text-brand">
                {message}
              </Typography>
            )}
            <div className="flex items-center justify-between px-1.25">
              <Typography variant="labelS">SUBTOTAL</Typography>
              <Typography variant="h1" as="span">
                ₾ {subtotal}
              </Typography>
            </div>
            <Button
              disabled={selected.length === 0 || tooYoung || isPending}
              onClick={onNext}
              className="w-full"
            >
              {isPending ? 'Holding seats...' : 'Next: Checkout'}
            </Button>
          </div>
        </>
      }
    />
  )
}
