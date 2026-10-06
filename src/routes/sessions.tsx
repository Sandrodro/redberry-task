import { noop } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { filterOptionsQueryOptions } from '@/api/queries/filter-options/useFilterOptionsData'
import { sessionsListQueryOptions } from '@/api/queries/sessions/useSessionsData'
import { SessionsPage } from '@/components/pages/sessions/SessionsPage'
import { sessionsSearchSchema, toSessionsFilters } from '@/utils/sessionsSearchSchema'

export const Route = createFileRoute('/sessions')({
  validateSearch: sessionsSearchSchema,
  loaderDeps: ({ search }) => search,
  // Filter options are awaited (cached after the first load), so the page always renders with them.
  // Sessions are not awaited: the page keeps showing the previous results while a new filter loads.
  loader: async ({ context: { queryClient }, deps }) => {
    const options = await queryClient.query({ ...filterOptionsQueryOptions(), staleTime: 'static' })
    void queryClient.query(sessionsListQueryOptions(toSessionsFilters(deps, options))).catch(noop)
  },
  component: SessionsPage,
})
