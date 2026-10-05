import type { FeaturedMovie } from '../../../api/types'
import TicketIcon from '../../../assets/icons/ticket.svg?react'
import TimerIcon from '../../../assets/icons/timer.svg?react'
import { Badge } from '../../core/Badge'
import { ButtonLink } from '../../core/ButtonLink'
import { Typography } from '../../core/Typography'

/** "15 Sep" */
function formatDayMonth(date: string) {
  const parts = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).formatToParts(
    new Date(`${date}T00:00`),
  )
  const part = (type: string) => parts.find((item) => item.type === type)?.value
  return `${part('day')} ${part('month')}`
}

export function FeaturedBanner({ movie }: { movie: FeaturedMovie }) {
  return (
    <article className="relative h-full">
      {movie.backdropUrl ? (
        <img src={movie.backdropUrl} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-elevated" />
      )}
      <div className="absolute inset-0 bg-linear-to-l from-black/8 to-black/80" />
      <div className="absolute bottom-44.75 left-16.75 flex w-145 flex-col items-start gap-4.5">
        <Badge tone="brand" className="uppercase">
          Premiere · Week of {formatDayMonth(movie.releaseDate)}
        </Badge>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4.5">
            <Typography variant="display" as="h2" className="uppercase">
              {movie.title}
            </Typography>
            <div className="flex gap-2">
              <Badge tone="brand">{movie.ageRating.code}</Badge>
              <Badge icon={<TimerIcon className="size-3.5" />}>{movie.runtimeMinutes} Min</Badge>
              {movie.formats.map((format) => (
                <Badge key={format.id}>{format.name}</Badge>
              ))}
            </div>
            <Typography variant="bodyL" className="w-140">
              {movie.synopsis}
            </Typography>
          </div>
          <div className="flex gap-3">
            <ButtonLink to="/sessions" icon={<TicketIcon />}>
              Buy tickets
            </ButtonLink>
            <ButtonLink to="/sessions" variant="tertiary">
              All sessions
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  )
}
