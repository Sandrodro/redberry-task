import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { api, apiData } from '../client'
import { Endpoint } from '../endpoints'
import { filterOptionsKeys, sessionsKeys } from '../queryKeys'
import type {
  FilterOptions,
  SeatMap,
  Session,
  SessionsFilters,
  SessionsPage,
} from '../types'

export const filterOptionsQueryOptions = queryOptions({
  queryKey: filterOptionsKeys.all.queryKey,
  queryFn: () => apiData<FilterOptions>(Endpoint.FilterOptions),
  staleTime: Infinity,
})

export const sessionsQueryOptions = (filters: SessionsFilters = {}) =>
  queryOptions({
    queryKey: sessionsKeys.list(filters).queryKey,
    queryFn: () => api<SessionsPage>(Endpoint.Sessions, { query: { ...filters } }),
    placeholderData: keepPreviousData,
  })

export const sessionQueryOptions = (id: number) =>
  queryOptions({
    queryKey: sessionsKeys.detail(id).queryKey,
    queryFn: () => apiData<Session>(`${Endpoint.Sessions}/${id}`),
  })

export const seatMapQueryOptions = (id: number) =>
  queryOptions({
    queryKey: sessionsKeys.seats(id).queryKey,
    queryFn: () => apiData<SeatMap>(`${Endpoint.Sessions}/${id}/seats`),
  })
