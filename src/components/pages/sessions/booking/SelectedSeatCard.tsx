import type { TicketType, TicketTypeSlug } from '../../../../api/types'
import CloseIcon from '../../../../assets/icons/close.svg?react'
import { Typography } from '../../../core/Typography'
import type { SelectedSeat } from './types'

type SelectedSeatCardProps = {
  selected: SelectedSeat
  ticketTypes: TicketType[]
  /** Slugs of ticket types that cannot be used for this movie. */
  blockedTypes: TicketTypeSlug[]
  price: number
  onChangeType: (slug: TicketTypeSlug) => void
  onRemove: () => void
}

export function SelectedSeatCard({
  selected,
  ticketTypes,
  blockedTypes,
  price,
  onChangeType,
  onRemove,
}: SelectedSeatCardProps) {
  const { seat, sectionName } = selected
  const blockedNames = ticketTypes
    .filter((type) => blockedTypes.includes(type.slug))
    .map((type) => type.name)

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-3.75">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Typography variant="bodyS" as="span" className="text-muted">
            Seat
          </Typography>
          <Typography variant="labelS">{seat.code}</Typography>
          <Typography variant="bodyS" as="span" className="text-muted">
            {sectionName}
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <Typography variant="labelS">₾{price}</Typography>
          <button
            type="button"
            aria-label={`Remove seat ${seat.code}`}
            onClick={onRemove}
            className="cursor-pointer text-white"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      </div>
      <hr className="h-px border-0 bg-elevated" />
      <div className="flex gap-2">
        {ticketTypes.map((type) => {
          const active = type.slug === selected.ticketType
          return (
            <button
              key={type.slug}
              type="button"
              disabled={blockedTypes.includes(type.slug)}
              aria-pressed={active}
              onClick={() => onChangeType(type.slug)}
              className={`flex-1 cursor-pointer rounded-2xl py-2 disabled:cursor-not-allowed disabled:opacity-40 ${active ? 'bg-brand' : 'bg-elevated'}`}
            >
              <Typography variant="bodyS" as="span">
                {type.name} {Math.round(type.priceRatio * 100)}%
              </Typography>
            </button>
          )
        })}
      </div>
      {blockedNames.length > 0 && (
        <Typography variant="bodyS" className="text-muted">
          {blockedNames.join(', ')} tickets are not available for this title.
        </Typography>
      )}
    </div>
  )
}
