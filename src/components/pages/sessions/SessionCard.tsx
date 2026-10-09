import type { Session } from '@/api/types'
import SeatsIcon from '@/assets/icons/seats.svg?react'
import { useBookingModal } from '@/hooks/useBookingModal'
import { Badge } from '@/components/core/Badge'
import { Typography } from '@/components/core/Typography'
import { EndedSessionTooltip } from '@/components/EndedSessionTooltip'
import { hasSessionEnded } from '@/utils/hasSessionEnded'

const LOW_SEATS_LIMIT = 10

type SessionCardProps = {
  session: Session
  disabled: boolean
}

export function SessionCard({ session, disabled }: SessionCardProps) {
  const { openBooking } = useBookingModal()
  const lowSeats = session.seatsLeft <= LOW_SEATS_LIMIT
  const ended = hasSessionEnded(session)

  return (
    <EndedSessionTooltip ended={ended}>
      <button
        type="button"
        disabled={disabled || ended}
        onClick={() => openBooking(session)}
        className="flex w-63 cursor-pointer flex-col gap-3 rounded-2xl bg-card p-3.75 text-left disabled:cursor-not-allowed disabled:opacity-40"
      >
        <div className="flex w-full items-center justify-between">
          <Typography variant="h3" as="span">
            {session.time}
          </Typography>
          <Badge tone="elevated" className="px-2.5! py-1.25!">
            {session.format.name}
          </Badge>
        </div>
        <div className="flex w-full items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <Typography variant="bodyS" as="span" className="text-muted">
              {session.language.name}
            </Typography>
            <Typography variant="labelS">
              {session.venue.name} · Hall {session.hall.name}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2.5">
            {session.isSoldOut ? (
              <Typography variant="bodyS" as="span" className="text-muted">
                Sold out
              </Typography>
            ) : (
              <span
                className={`flex items-center gap-1 ${lowSeats ? 'text-brand' : 'text-success'}`}
              >
                <SeatsIcon />
                <Typography variant="bodyS" as="span">
                  {session.seatsLeft} left
                </Typography>
              </span>
            )}
            <Typography variant="button">From ₾{session.price}</Typography>
          </div>
        </div>
      </button>
    </EndedSessionTooltip>
  )
}
