import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { sessionsKeys } from '@/api/queryKeys'
import type { SessionsFilters, SessionsPage } from '@/api/types'

export const sessionsListQueryOptions = (filters: SessionsFilters) =>
  queryOptions({
    queryKey: sessionsKeys.list(filters),
    queryFn: () => api.get<SessionsPage>(Endpoint.Sessions, { query: { ...filters } }),
  })

export function useSessionsData(filters: SessionsFilters = {}) {
  return useQuery({ ...sessionsListQueryOptions(filters), placeholderData: keepPreviousData })
}
