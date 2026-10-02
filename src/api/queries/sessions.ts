import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { api } from '../client'
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
  queryFn: async () => (await api.get<{ data: FilterOptions }>(Endpoint.FilterOptions)).data,
  staleTime: Infinity,
})

export const sessionsQueryOptions = (filters: SessionsFilters = {}) =>
  queryOptions({
    queryKey: sessionsKeys.list(filters).queryKey,
    queryFn: () => api.get<SessionsPage>(Endpoint.Sessions, { query: { ...filters } }),
    placeholderData: keepPreviousData,
  })

export const sessionQueryOptions = (id: number) =>
  queryOptions({
    queryKey: sessionsKeys.detail(id).queryKey,
    queryFn: async () => (await api.get<{ data: Session }>(`${Endpoint.Sessions}/${id}`)).data,
  })

export const seatMapQueryOptions = (id: number) =>
  queryOptions({
    queryKey: sessionsKeys.seats(id).queryKey,
    queryFn: async () =>
      (await api.get<{ data: SeatMap }>(`${Endpoint.Sessions}/${id}/seats`)).data,
  })
