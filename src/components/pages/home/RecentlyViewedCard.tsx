import { Link } from '@tanstack/react-router'
import type { Movie } from '@/api/types'
import { formatMovieDetails } from '@/utils/formatters/formatMovieDetails'
import { Badge } from '@/components/core/Badge'
import { Cover } from '@/components/core/Cover'
import { Typography } from '@/components/core/Typography'

export function RecentlyViewedCard({ movie }: { movie: Movie }) {
  return (
    <Link
      to="/movies/$slug"
      params={{ slug: movie.slug }}
      className="flex w-82.25 shrink-0 items-center gap-3 rounded-2xl bg-card p-2.5"
    >
      <Cover src={movie.posterUrl} className="h-16.75 min-w-0 flex-1 rounded-lg" />
      <div className="flex w-52.5 shrink-0 flex-col items-start gap-1">
        <div className="flex w-full flex-col gap-1">
          <Typography variant="button" className="truncate uppercase">
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
    </Link>
  )
}
