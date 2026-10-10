import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { sessionsKeys, ticketsKeys } from '@/api/queryKeys'
import type { Order } from '@/api/types'

export function useRefundOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (reference: string) =>
      (
        await api.post<{ data: Order }>(
          `${Endpoint.Orders}/${encodeURIComponent(reference)}/refund`,
        )
      ).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all })
      queryClient.invalidateQueries({ queryKey: sessionsKeys.all })
    },
  })
}
