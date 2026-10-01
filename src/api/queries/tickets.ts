import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiData } from '../client'
import { Endpoint } from '../endpoints'
import { sessionsKeys, ticketsKeys } from '../queryKeys'
import type { Order } from '../types'

export const ticketsQueryOptions = (filter?: 'upcoming' | 'past') =>
  queryOptions({
    queryKey: ticketsKeys.list(filter).queryKey,
    queryFn: () => apiData<Order[]>(Endpoint.Tickets, { query: { filter } }),
  })

export function useRefundOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (reference: string) =>
      apiData<Order>(`${Endpoint.Orders}/${encodeURIComponent(reference)}/refund`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys._def })
      queryClient.invalidateQueries({ queryKey: sessionsKeys._def })
    },
  })
}
