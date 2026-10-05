import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { sessionsKeys } from '../../queryKeys'
import type { SessionsFilters, SessionsPage } from '../../types'

export const sessionsListQueryOptions = (filters: SessionsFilters) =>
  queryOptions({
    queryKey: sessionsKeys.list(filters).queryKey,
    queryFn: () => api.get<SessionsPage>(Endpoint.Sessions, { query: { ...filters } }),
  })

export function useSessionsData(filters: SessionsFilters = {}) {
  return useQuery({ ...sessionsListQueryOptions(filters), placeholderData: keepPreviousData })
}
