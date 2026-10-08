import type { ReactNode } from 'react'
import type { Order } from '@/api/types'
import { formatShortDate } from '@/utils/formatDate'
import { Button } from '@/components/core/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/core/Tooltip'
import { Typography } from '@/components/core/Typography'

/** Refunds close this many hours before the session. Only used for the note, `isRefundable` drives the button. */
const REFUND_CUTOFF_HOURS = 2

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant="overline" className="text-muted">
        {label}
      </Typography>
      <Typography variant="labelM">{children}</Typography>
    </div>
  )
}

type MyTicketsCardProps = {
  order: Order
  onRefund: () => void
  error?: string
}

export function MyTicketsCard({ order, onRefund, error }: MyTicketsCardProps) {
  const { session, tickets } = order
  const { movie } = session
  // `date` and `time` are the venue's local time, so no time zone conversion is needed.
  const startsAt = new Date(`${session.date}T${session.time}`)
  const refundUntil = new Date(startsAt.getTime() - REFUND_CUTOFF_HOURS * 60 * 60 * 1000)
  const refundUntilTime = refundUntil.toTimeString().slice(0, 5)

  return (
    <article className="flex gap-4.5 overflow-hidden rounded-[26px] bg-card">
      <div className="flex flex-1 items-center gap-4.5 px-7.5">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt=""
            className="aspect-3/4 w-25 shrink-0 rounded-[10px] object-cover"
          />
        ) : (
          <div className="aspect-3/4 w-25 shrink-0 rounded-[10px] bg-elevated" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Typography variant="h2">{movie.title}</Typography>
            <Typography
              variant="labelS"
              className="rounded-full bg-brand/10 px-2 py-0.75 text-brand"
            >
              {movie.ageRating.code}
            </Typography>
            <Typography variant="bodyM" className="text-muted">
              {movie.runtimeMinutes} min
            </Typography>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-10">
              <MetaItem label="Date">
                {formatShortDate(startsAt)} · {session.time}
              </MetaItem>
              <MetaItem label="Venue">
                {session.venue.name} · Hall {session.hall.name}
              </MetaItem>
              <MetaItem label="Format">
                {session.format.name} · {session.language.name}
              </MetaItem>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Typography variant="overline" className="text-muted">
                Seats
              </Typography>
              {tickets.map((ticket) => (
                <Typography
                  key={ticket.id}
                  variant="labelS"
                  className="rounded-md bg-white/10 px-2.5 py-1"
                >
                  {ticket.seatCode} · {ticket.ticketType.name}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-75 shrink-0 flex-col gap-4 border-l border-dashed border-elevated px-6 py-5">
        <div className="flex flex-col gap-0.5">
          <Typography variant="overline" className="text-muted">
            Order
          </Typography>
          <Typography variant="labelM">#{order.reference}</Typography>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <Typography variant="labelM" className="text-muted">
              Total paid
            </Typography>
            <Typography variant="h1">₾{order.totalPrice}</Typography>
          </div>
          {order.isUpcoming && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="block">
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={onRefund}
                      disabled={!order.isRefundable}
                      className="w-full"
                    >
                      Refund
                    </Button>
                  </span>
                </TooltipTrigger>
                {!order.isRefundable && (
                  <TooltipContent>
                    Refunds close {REFUND_CUTOFF_HOURS} hours before the session starts
                  </TooltipContent>
                )}
              </Tooltip>
              {order.isRefundable && (
                <Typography variant="bodyS" className="text-center text-muted">
                  Refundable until {refundUntilTime}, {formatShortDate(refundUntil)}
                </Typography>
              )}
              {error && (
                <Typography variant="bodyS" className="text-center text-brand">
                  {error}
                </Typography>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
