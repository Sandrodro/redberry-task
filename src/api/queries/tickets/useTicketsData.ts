import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { ticketsKeys } from '@/api/queryKeys'
import type { Order, TicketFilter } from '@/api/types'

export const ticketsQueryOptions = (filter?: TicketFilter) =>
  queryOptions({
    queryKey: ticketsKeys.list(filter),
    queryFn: async () =>
      (await api.get<{ data: Order[] }>(Endpoint.Tickets, { query: { filter } })).data,
  })

export function useTicketsData(filter?: TicketFilter) {
  return useQuery(ticketsQueryOptions(filter))
}
