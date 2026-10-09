import { createFileRoute } from '@tanstack/react-router'
import { filterOptionsQueryOptions } from '@/api/queries/filter-options/useFilterOptionsData'
import { SessionsPage } from '@/components/pages/sessions/SessionsPage'
import { sessionsSearchSchema } from '@/utils/sessionsSearchSchema'

export const Route = createFileRoute('/sessions')({
  validateSearch: sessionsSearchSchema,
  // Filter options are awaited (cached after the first load), so the page always renders with them.
  // Sessions are loaded by the page, after the filters stop changing.
  loader: ({ context: { queryClient } }) =>
    queryClient.query({ ...filterOptionsQueryOptions(), staleTime: 'static' }),
  component: SessionsPage,
})
