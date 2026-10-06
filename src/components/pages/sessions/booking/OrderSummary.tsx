import type { ReactNode } from 'react'
import type { Session } from '../../../../api/types'
import { formatShortDate } from '../../../../utils/formatShortDate'
import { Typography } from '../../../core/Typography'

type OrderSummaryProps = {
  session: Session
  seats: { code: string; ticketType: { name: string } }[]
  /** Adds a total row. The checkout step shows its total below the card instead. */
  total?: { label: string; value: number }
  showPoster?: boolean
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Typography variant="bodyS" as="span" className="text-muted">
        {label}
      </Typography>
      <Typography variant="labelS">{children}</Typography>
    </div>
  )
}

/** "2 x Adult, 1 x Child", in the order the types first appear. */
function formatTickets(seats: OrderSummaryProps['seats']) {
  const counts = new Map<string, number>()
  seats.forEach(({ ticketType }) => counts.set(ticketType.name, (counts.get(ticketType.name) ?? 0) + 1))
  return [...counts].map(([name, count]) => `${count} x ${name}`).join(', ')
}

export function OrderSummary({ session, seats, total, showPoster }: OrderSummaryProps) {
  const { movie, venue, hall } = session
  const startsAt = new Date(`${session.date}T${session.time}`)

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-4.5">
      <div className="flex gap-3">
        {showPoster &&
          (movie.posterUrl ? (
            <img src={movie.posterUrl} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" />
          ) : (
            <div className="h-12 w-12 shrink-0 rounded-md bg-elevated" />
          ))}
        <div className="flex flex-col gap-2">
          <Typography variant="button" as="p" className="uppercase">
            {movie.title}
          </Typography>
          <Typography variant="bodyS" className="text-muted">
            {venue.name} · Hall {hall.name} · {formatShortDate(startsAt)} · {session.time}
          </Typography>
        </div>
      </div>
      <hr className="h-px border-0 bg-elevated" />
      <Row label="Seats">{seats.map((seat) => seat.code).join(', ')}</Row>
      <Row label="Tickets">{formatTickets(seats)}</Row>
      {total && (
        <>
          <hr className="h-px border-0 bg-elevated" />
          <div className="flex items-center justify-between">
            <Typography variant="bodyS" as="span" className="text-muted uppercase">
              {total.label}
            </Typography>
            <Typography variant="h1" as="span">
              ₾ {total.value}
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}
