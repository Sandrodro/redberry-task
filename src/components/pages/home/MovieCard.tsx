import { Link } from '@tanstack/react-router'
import type { Movie } from '@/api/types'
import { formatMovieDetails } from '@/utils/formatters/formatMovieDetails'
import { Badge } from '@/components/core/Badge'
import { ButtonLink } from '@/components/core/ButtonLink'
import { Cover } from '@/components/core/Cover'
import { Typography } from '@/components/core/Typography'

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="flex h-113 w-65 flex-col justify-between rounded-[20px] bg-card p-3 shadow-[0_1px_2px_var(--shadow),inset_0_0_4px_var(--shadow)]">
      <Link to="/movies/$slug" params={{ slug: movie.slug }} className="flex flex-col gap-2.5">
        <Cover src={movie.posterUrl} className="h-75 w-full rounded-[14px]" />
        <div className="flex flex-col gap-1.75">
          <div className="flex min-w-0 flex-col gap-1.75">
            <Typography variant="h3" className="truncate">
              {movie.title}
            </Typography>
            <Typography variant="bodyS" className="text-muted">
              {formatMovieDetails(movie)}
            </Typography>
          </div>
          <Badge tone="brand" size="sm" className="self-start">
            {movie.ageRating.code}
          </Badge>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <Typography variant="labelS">From ₾ {movie.fromPrice}</Typography>
        <ButtonLink to="/movies/$slug" params={{ slug: movie.slug }} size="sm">
          Buy Ticket
        </ButtonLink>
      </div>
    </article>
  )
}
