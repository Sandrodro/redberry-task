import type { Session } from '@/api/types'
import SeatsIcon from '@/assets/icons/seats.svg?react'
import TicketBodyIcon from '@/assets/icons/ticket-body.svg?react'
import { useBookingModal } from '@/hooks/useBookingModal'
import { Badge } from '@/components/core/Badge'
import { Typography } from '@/components/core/Typography'
import { EndedSessionTooltip } from '@/components/EndedSessionTooltip'
import { hasSessionEnded } from '@/utils/hasSessionEnded'

type SessionTicketProps = {
  session: Session
  disabled: boolean
}

export function SessionTicket({ session, disabled }: SessionTicketProps) {
  const { openBooking } = useBookingModal()
  const ended = hasSessionEnded(session)

  return (
    <EndedSessionTooltip ended={ended}>
      <button
        type="button"
        disabled={disabled || ended}
        onClick={() => openBooking(session)}
        className="relative flex h-20.25 w-51.75 cursor-pointer items-center rounded-xl text-left drop-shadow-[0_1px_1px_var(--shadow)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <TicketBodyIcon aria-hidden className="absolute inset-0 size-full text-background" />
        <span className="relative flex w-31 flex-col items-center justify-center gap-2 py-3.75">
          <Typography variant="h2" as="span">
            {session.time}
          </Typography>
          <span className="flex items-center gap-1.5">
            <Typography variant="bodyS" as="span" className="text-muted">
              {session.language.code}
            </Typography>
            <Badge tone="elevated" className="bg-card! px-3! py-1! text-white/70!">
              {session.format.name}
            </Badge>
          </span>
        </span>
        <span className="relative flex w-20.75 flex-col items-center justify-center gap-2 px-3.75 py-2.5">
          <Typography variant="h3" as="span" className="text-brand">
            ₾ {session.price}
          </Typography>
          {session.isSoldOut ? (
            <Typography variant="bodyS" as="span" className="text-muted">
              Sold out
            </Typography>
          ) : (
            <span className="flex items-center gap-1 text-muted">
              <SeatsIcon />
              <Typography variant="bodyS" as="span">
                {session.seatsLeft} left
              </Typography>
            </span>
          )}
        </span>
        <span
          aria-hidden
          className="absolute left-31 top-2.75 h-14.75 border-l-[1.5px] border-dashed border-white"
        />
      </button>
    </EndedSessionTooltip>
  )
}
