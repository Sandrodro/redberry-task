import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { sessionsKeys } from '../../queryKeys'
import type { SessionsFilters, SessionsPage } from '../../types'

export function useSessionsData(filters: SessionsFilters = {}) {
  return useQuery({
    queryKey: sessionsKeys.list(filters).queryKey,
    queryFn: () => api.get<SessionsPage>(Endpoint.Sessions, { query: { ...filters } }),
    placeholderData: keepPreviousData,
  })
}
