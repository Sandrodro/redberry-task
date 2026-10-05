import type { Movie } from '../../../api/types'
import { formatDayMonth } from '../../../utils/formatDayMonth'
import { formatMovieDetails } from '../../../utils/formatMovieDetails'
import { Badge } from '../../core/Badge'
import { Typography } from '../../core/Typography'
import { NotifyMeButton } from './NotifyMeButton'

export function ComingSoonCard({ movie }: { movie: Movie }) {
  return (
    <article className="flex h-40 w-117.5 items-center gap-4.5 rounded-[20px] bg-card p-3.5 shadow-[0_1px_2px_var(--shadow)]">
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt=""
          draggable={false}
          className="h-full w-34 shrink-0 rounded-[14px] object-cover"
        />
      ) : (
        <div className="h-full w-34 shrink-0 rounded-[14px] bg-elevated" />
      )}
      <div className="flex h-33 min-w-0 flex-1 flex-col items-start justify-between">
        <div className="flex max-w-full flex-col items-start gap-2">
          <Typography variant="labelS" className="uppercase text-brand">
            In cinemas {formatDayMonth(movie.releaseDate, 'long')}
          </Typography>
          <div className="flex max-w-full flex-col gap-2">
            <Typography variant="h3" as="h3" className="truncate">
              {movie.title}
            </Typography>
            <Typography variant="bodyM" className="text-muted">
              {formatMovieDetails(movie)}
            </Typography>
          </div>
          <Badge tone="brand" size="sm">
            {movie.ageRating.code}
          </Badge>
        </div>
        <NotifyMeButton slug={movie.slug} notified={movie.isNotified} />
      </div>
    </article>
  )
}
