import { Fragment, useEffect, useRef } from 'react'
import { useSessionsData } from '@/api/queries/sessions/useSessionsData'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useSessionsFilters } from './useSessionsFilters'
import { Button } from '@/components/core/Button'
import { Divider } from '@/components/core/Divider'
import { EmptyState } from '@/components/core/EmptyState'
import { ErrorState } from '@/components/core/ErrorState'
import { Pagination } from '@/components/core/Pagination'
import { Skeleton } from '@/components/core/Skeleton'
import { TooltipProvider } from '@/components/core/Tooltip'
import { Typography } from '@/components/core/Typography'
import { FiltersPanel } from './FiltersPanel'
import { MovieSessionsRow } from './MovieSessionsRow'
import { SessionsSkeleton } from './SessionsSkeleton'
import { SortSelect } from './SortSelect'

function formatCount(total: number) {
  if (total === 0) return 'No sessions found'
  return `Showing ${total} ${total === 1 ? 'session' : 'sessions'}`
}

export function SessionsPage() {
  const { filters, setPage, clear, activeCount } = useSessionsFilters()
  // Quick changes in a row send one request. The list is dimmed while it waits.
  const requestedFilters = useDebouncedValue(filters)
  const { data, isPending, isLoadingError, isFetching, isPlaceholderData, refetch } =
    useSessionsData(requestedFilters)
  const isOutdated = isPlaceholderData || requestedFilters !== filters
  const sectionRef = useRef<HTMLElement>(null)
  // The page number is left out: a page change keeps the default scroll to the top of the page.
  const filtersKey = JSON.stringify({ ...filters, page: undefined })
  const previousFiltersKey = useRef(filtersKey)

  // The filters panel is sticky, so scrolling the page brings the sessions back into view and leaves the panel in place.
  useEffect(() => {
    if (previousFiltersKey.current === filtersKey) return
    previousFiltersKey.current = filtersKey
    if (sectionRef.current && sectionRef.current.getBoundingClientRect().top < 0) {
      sectionRef.current.scrollIntoView({ block: 'start' })
    }
  }, [filtersKey])

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-9 px-12.75 pb-16 pt-1.5">
        <div className="flex flex-col gap-1.5">
          <Typography variant="h1">Sessions</Typography>
          <Typography variant="bodyM" className="text-muted">
            Browse showtimes across all venues
          </Typography>
        </div>
        <div className="flex items-start gap-12.75">
          <FiltersPanel />
          <section ref={sectionRef} className="flex min-w-0 flex-1 scroll-mt-6 flex-col gap-13">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                {data && (
                  <Typography variant="labelS">{formatCount(data.meta.totalSessions)}</Typography>
                )}
                {isPending && <Skeleton className="h-3 w-32" />}
                {/* Keeps the sort on the right when there is no count. */}
                {isLoadingError && <span />}
                <SortSelect />
              </div>
              {isPending && <SessionsSkeleton />}
              {isLoadingError && (
                <ErrorState
                  message="Could not load sessions."
                  onRetry={() => refetch()}
                  isRetrying={isFetching}
                />
              )}
              {data && !isPlaceholderData && data.data.length === 0 && (
                <EmptyState
                  title="No sessions found"
                  description="Try another date or different filters."
                >
                  {activeCount > 0 && (
                    <Button variant="tertiary" size="sm" onClick={clear}>
                      Clear filters
                    </Button>
                  )}
                </EmptyState>
              )}
              <div
                className={`flex flex-col gap-8 transition-opacity ${isOutdated ? 'opacity-60' : ''}`}
              >
                {data?.data.map((group, index) => (
                  <Fragment key={group.movie.id}>
                    {index > 0 && <Divider />}
                    <MovieSessionsRow {...group} />
                  </Fragment>
                ))}
              </div>
            </div>
            {data && (
              <Pagination
                page={data.meta.currentPage}
                lastPage={data.meta.lastPage}
                onChange={setPage}
              />
            )}
          </section>
        </div>
      </div>
    </TooltipProvider>
  )
}
