import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { ticketsKeys } from '@/api/queryKeys'
import type { CreateOrderInput, Order } from '@/api/types'
import { useRefreshSessions } from '@/api/queries/sessions/useRefreshSessions'

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: async (input: CreateOrderInput) =>
      (await api.post<{ data: Order }>(Endpoint.Orders, input)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all })
      return refreshSessions()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) refreshSessions()
    },
  })
}
