import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { ticketsKeys } from '../../queryKeys'
import type { Order } from '../../types'

export function useTicketsData(filter?: 'upcoming' | 'past') {
  return useQuery({
    queryKey: ticketsKeys.list(filter).queryKey,
    queryFn: async () =>
      (await api.get<{ data: Order[] }>(Endpoint.Tickets, { query: { filter } })).data,
  })
}
