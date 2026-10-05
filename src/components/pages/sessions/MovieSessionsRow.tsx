import type { MovieSessions } from '../../../api/types'
import { Badge } from '../../core/Badge'
import { Slider } from '../../core/Slider'
import { Typography } from '../../core/Typography'
import { SessionCard } from './SessionCard'

export function MovieSessionsRow({ movie, sessions }: MovieSessions) {
  return (
    <article className="flex flex-col gap-3.5">
      <div className="flex items-center gap-4">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt="" className="h-20 w-14 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="h-20 w-14 shrink-0 rounded-lg bg-elevated" />
        )}
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
      </div>
      <Slider
        items={sessions}
        getKey={(session) => session.id}
        renderItem={(session) => <SessionCard session={session} />}
        gapClassName="gap-3"
      />
    </article>
  )
}
