import type { Session } from '@/api/types'
import { formatLongDate } from '@/utils/formatDate'
import { Typography } from '@/components/core/Typography'
import { formatTimer } from './utils'

type BookingHeaderProps = {
  session: Session
  /** Null until seats are held. */
  secondsLeft: number | null
}

export function BookingHeader({ session, secondsLeft }: BookingHeaderProps) {
  const { movie, venue, hall, format, language } = session
  // `date` and `time` are the venue's local time, so no time zone conversion is needed.
  const date = formatLongDate(new Date(`${session.date}T${session.time}`))

  return (
    <div className="flex items-start justify-between gap-4 pr-10">
      <div className="flex min-w-0 flex-col gap-2">
        <Typography variant="h2" className="uppercase">
          {movie.title}
        </Typography>
        <Typography variant="bodyS" className="text-muted">
          {venue.name} · Hall {hall.name} · {date} · {session.time} · {format.name} ·{' '}
          {language.name}
        </Typography>
      </div>
      {secondsLeft !== null && (
        <div className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl bg-card px-3.5 py-2">
          <Typography variant="labelS" className="text-muted">
            SEATS HELD
          </Typography>
          <Typography variant="button" as="span">
            {formatTimer(secondsLeft)}
          </Typography>
        </div>
      )}
    </div>
  )
}
