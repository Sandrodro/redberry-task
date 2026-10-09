import type { Movie } from '@/api/types'
import { formatDayMonth } from '@/utils/formatters/formatDate'
import { formatMovieDetails } from '@/utils/formatters/formatMovieDetails'
import { Badge } from '@/components/core/Badge'
import { Typography } from '@/components/core/Typography'
import { NotifyMeButton } from './NotifyMeButton'

export function ComingSoonCard({ movie }: { movie: Movie }) {
  return (
    <article className="flex h-40 w-117.5 items-center gap-3.75 rounded-[20px] bg-card p-3 shadow-[0_1px_2px_var(--shadow),inset_0_0_4px_var(--shadow)]">
      {movie.backdropUrl ? (
        <img
          src={movie.backdropUrl}
          alt=""
          draggable={false}
          className="h-full min-w-0 flex-1 rounded-[14px] object-cover"
        />
      ) : (
        <div className="h-full min-w-0 flex-1 rounded-[14px] bg-elevated" />
      )}
      <div className="flex h-33 min-w-0 max-w-1/2 flex-col items-start justify-between pr-15">
        <div className="flex max-w-full flex-col items-start gap-1.75">
          <Typography variant="labelS" className="uppercase text-brand">
            In cinemas {formatDayMonth(movie.releaseDate, 'long')}
          </Typography>
          <div className="flex max-w-full flex-col gap-1.75">
            <Typography variant="labelS" as="h3" className="truncate">
              {movie.title}
            </Typography>
            <Typography variant="bodyS" className="text-muted">
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
