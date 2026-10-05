import { createFileRoute } from '@tanstack/react-router'
import { filterOptionsQueryOptions } from '../api/queries/sessions/useFilterOptionsData'
import { sessionsListQueryOptions } from '../api/queries/sessions/useSessionsData'
import { SessionsPage } from '../components/pages/sessions/SessionsPage'
import { sessionsSearchSchema, toSessionsFilters } from '../utils/sessionsSearchSchema'

export const Route = createFileRoute('/sessions')({
  validateSearch: sessionsSearchSchema,
  loaderDeps: ({ search }) => search,
  // Filter options are awaited (cached after the first load), so the page always renders with them.
  // Sessions are not awaited: the page keeps showing the previous results while a new filter loads.
  loader: async ({ context: { queryClient }, deps }) => {
    const options = await queryClient.ensureQueryData(filterOptionsQueryOptions())
    void queryClient.prefetchQuery(sessionsListQueryOptions(toSessionsFilters(deps, options)))
  },
  component: SessionsPage,
})
