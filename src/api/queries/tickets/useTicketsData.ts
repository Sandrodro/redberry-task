import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { ticketsKeys } from '@/api/queryKeys'
import type { Order } from '@/api/types'

export const ticketsQueryOptions = (filter?: 'upcoming' | 'past') =>
  queryOptions({
    queryKey: ticketsKeys.list(filter).queryKey,
    queryFn: async () =>
      (await api.get<{ data: Order[] }>(Endpoint.Tickets, { query: { filter } })).data,
  })

export function useTicketsData(filter?: 'upcoming' | 'past') {
  return useQuery(ticketsQueryOptions(filter))
}
