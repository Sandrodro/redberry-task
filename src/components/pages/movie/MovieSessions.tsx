import { noop, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { movieSessionsQueryOptions, useMovieSessionsData } from '@/api/queries/movies/useMovieSessionsData'
import type { MovieDetail, Session } from '@/api/types'
import { useAuth } from '@/hooks/useAuth'
import { formatDayMonth } from '@/utils/formatDayMonth'
import { getFirstAvailableDate } from '@/utils/getUpcomingDates'
import { Spinner } from '@/components/core/Spinner'
import { Typography } from '@/components/core/Typography'
import { DateStrip } from '@/components/DateStrip'
import { SessionTicket } from './SessionTicket'
import { WarningNote } from './WarningNote'

/** A date loaded on hover is reused for this long, so moving over it again does not fetch again. */
const PREFETCH_STALE_MS = 30_000

/** Groups a venue's sessions by hall, in the order the halls first appear. */
function groupByHall(sessions: Session[]) {
  const halls = new Map<number, { id: number; name: string; sessions: Session[] }>()
  for (const session of sessions) {
    const hall = halls.get(session.hall.id) ?? { id: session.hall.id, name: session.hall.name, sessions: [] }
    hall.sessions.push(session)
    halls.set(hall.id, hall)
  }
  return Array.from(halls.values())
}

export function MovieSessions({ movie }: { movie: MovieDetail }) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [selectedDate, setSelectedDate] = useState<string>()
  const date = selectedDate ?? getFirstAvailableDate(movie.availableDates)
  const { data: venues, isPending, isError, isPlaceholderData } = useMovieSessionsData(movie.slug, date)

  const sessionCount = venues?.reduce((total, venue) => total + venue.sessions.length, 0) ?? 0
  // While a new date loads, the previous sessions stay on screen, so the text names their date.
  const shownDate = venues?.[0]?.sessions[0]?.date ?? date
  const fade = `transition-opacity ${isPlaceholderData ? 'opacity-60' : ''}`
  const isUnderage = !!user && user.age !== null && user.age < movie.ageRating.minAge

  function prefetchDate(hoveredDate: string) {
    void queryClient
      .query({ ...movieSessionsQueryOptions(movie.slug, hoveredDate), staleTime: PREFETCH_STALE_MS })
      .catch(noop)
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-6.75 pb-6.5">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.75">
          <Typography variant="h2">Sessions</Typography>
          {sessionCount > 0 && (
            <Typography variant="bodyS" className={`text-muted ${fade}`}>
              {sessionCount} {sessionCount === 1 ? 'session' : 'sessions'} on {formatDayMonth(shownDate)}
            </Typography>
          )}
        </div>
        <DateStrip
          size="lg"
          value={date}
          onChange={setSelectedDate}
          onHover={prefetchDate}
          availableDates={movie.availableDates}
        />
      </div>
      {isUnderage && (
        <WarningNote>
          <Typography variant="bodyS">
            This film is rated {movie.ageRating.code}. You cannot buy tickets for it with this account.
          </Typography>
        </WarningNote>
      )}
      {isPending && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}
      {isError && (
        <Typography variant="bodyM" className="text-muted">
          Sessions could not be loaded.
        </Typography>
      )}
      {venues && !isPlaceholderData && sessionCount === 0 && (
        <Typography variant="bodyM" className="text-muted">
          No sessions on this date.
        </Typography>
      )}
      {venues && sessionCount > 0 && (
        <div className={`flex flex-col gap-6.75 ${fade}`}>
          {venues.map(({ venue, sessions }) => (
            <div key={venue.id} className="flex flex-col gap-3">
              <Typography variant="button">{venue.name}</Typography>
              <div className="flex flex-wrap gap-2.5">
                {groupByHall(sessions).map((hall) => (
                  <div key={hall.id} className="flex flex-col gap-2.25 rounded-[18px] bg-card p-3.75">
                    <Typography variant="labelS">Hall {hall.name}</Typography>
                    <div className="flex flex-wrap gap-2.25">
                      {hall.sessions.map((session) => (
                        <SessionTicket
                          key={session.id}
                          // This endpoint leaves out `movie`, which the booking modal reads.
                          session={{ ...session, movie }}
                          disabled={session.isSoldOut || isUnderage}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
