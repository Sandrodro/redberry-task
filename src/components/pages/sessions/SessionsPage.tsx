import { Fragment } from 'react'
import { useSessionsData } from '@/api/queries/sessions/useSessionsData'
import { useSessionsFilters } from '@/hooks/useSessionsFilters'
import { Button } from '@/components/core/Button'
import { Pagination } from '@/components/core/Pagination'
import { Typography } from '@/components/core/Typography'
import { FiltersPanel } from './FiltersPanel'
import { MovieSessionsRow } from './MovieSessionsRow'
import { SortSelect } from './SortSelect'

function formatCount(total: number) {
  if (total === 0) return 'No sessions found'
  return `Showing ${total} ${total === 1 ? 'session' : 'sessions'}`
}

export function SessionsPage() {
  const { filters, setPage } = useSessionsFilters()
  const { data, isError, isPlaceholderData, refetch } = useSessionsData(filters)

  return (
    <div className="flex flex-col gap-9 px-12.75 pb-16 pt-1.5">
      <div className="flex flex-col gap-1.5">
        <Typography variant="h1">Sessions</Typography>
        <Typography variant="bodyM" className="text-muted">
          Browse showtimes across all venues
        </Typography>
      </div>
      <div className="flex items-start gap-12.75">
        <FiltersPanel />
        <section className="flex min-w-0 flex-1 flex-col gap-13">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              {data && <Typography variant="labelS">{formatCount(data.meta.totalSessions)}</Typography>}
              <SortSelect />
            </div>
            {isError && (
              <div className="flex flex-col items-start gap-3">
                <Typography variant="bodyM" className="text-muted">
                  Could not load sessions.
                </Typography>
                <Button variant="tertiary" size="sm" onClick={() => refetch()}>
                  Try again
                </Button>
              </div>
            )}
            <div
              className={`flex flex-col gap-8 transition-opacity ${isPlaceholderData ? 'opacity-60' : ''}`}
            >
              {data?.data.map((group, index) => (
                <Fragment key={group.movie.id}>
                  {index > 0 && <hr className="h-px border-0 bg-elevated" />}
                  <MovieSessionsRow {...group} />
                </Fragment>
              ))}
            </div>
          </div>
          {data && (
            <Pagination page={data.meta.currentPage} lastPage={data.meta.lastPage} onChange={setPage} />
          )}
        </section>
      </div>
    </div>
  )
}
