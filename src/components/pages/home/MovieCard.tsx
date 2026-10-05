import { Link } from '@tanstack/react-router'
import type { Movie } from '../../../api/types'
import { formatMovieDetails } from '../../../utils/formatMovieDetails'
import { Badge } from '../../core/Badge'
import { ButtonLink } from '../../core/ButtonLink'
import { Typography } from '../../core/Typography'

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="flex h-113 w-65 flex-col justify-between rounded-[20px] bg-card p-3.5 shadow-[0_1px_2px_var(--shadow)]">
      <Link to="/sessions" className="flex flex-col gap-3">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt=""
            draggable={false}
            className="h-75 w-full rounded-[14px] object-cover"
          />
        ) : (
          <div className="h-75 w-full rounded-[14px] bg-elevated" />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex min-w-0 flex-col gap-2">
            <Typography variant="h2" as="h3" className="truncate">
              {movie.title}
            </Typography>
            <Typography variant="bodyM" className="text-muted">
              {formatMovieDetails(movie)}
            </Typography>
          </div>
          <Badge tone="brand" size="sm" className="self-start">
            {movie.ageRating.code}
          </Badge>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <Typography variant="button">From ₾ {movie.fromPrice}</Typography>
        <ButtonLink to="/sessions" size="sm">
          Buy Ticket
        </ButtonLink>
      </div>
    </article>
  )
}
