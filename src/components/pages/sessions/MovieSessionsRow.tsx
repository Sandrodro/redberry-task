import { Link } from '@tanstack/react-router'
import type { MovieSessions } from '@/api/types'
import { Badge } from '@/components/core/Badge'
import { Cover } from '@/components/core/Cover'
import { Slider } from '@/components/core/Slider'
import { Typography } from '@/components/core/Typography'
import { UnderageNote } from '@/components/session/UnderageNote'
import { useIsUnderage } from '@/hooks/useIsUnderage'
import { SessionCard } from './SessionCard'

export function MovieSessionsRow({ movie, sessions }: MovieSessions) {
  const isUnderage = useIsUnderage(movie.ageRating)

  return (
    <article className="flex flex-col gap-3.5">
      <Link
        to="/movies/$slug"
        params={{ slug: movie.slug }}
        className="flex items-center gap-4 self-start"
      >
        <Cover src={movie.posterUrl} className="h-20 w-14 shrink-0 rounded-lg" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Typography variant="h3" as="h2">
              {movie.title}
            </Typography>
            <Badge tone="brand" size="sm">
              {movie.ageRating.code}
            </Badge>
          </div>
          <Typography variant="bodyM" className="text-muted">
            {movie.runtimeMinutes} min
          </Typography>
        </div>
      </Link>
      {isUnderage && <UnderageNote ageRating={movie.ageRating} />}
      <Slider
        items={sessions}
        getKey={(session) => session.id}
        renderItem={(session) => (
          <SessionCard session={session} disabled={session.isSoldOut || isUnderage} />
        )}
        gapClassName="gap-3"
      />
    </article>
  )
}
