import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, api } from '../client'
import { Endpoint } from '../endpoints'
import { holdsKeys, sessionsKeys, ticketsKeys } from '../queryKeys'
import type { CreateOrderInput, HoldSeatInput, Order, SeatHold } from '../types'

export const holdQueryOptions = (holdId: string) =>
  queryOptions({
    queryKey: holdsKeys.detail(holdId).queryKey,
    queryFn: async () => (await api.get<{ data: SeatHold }>(`${Endpoint.Holds}/${holdId}`)).data,
  })

/** Seat maps and seat counts go stale when holds change, so refresh them. */
function useRefreshSessions() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: sessionsKeys._def })
}

export function useCreateHold(sessionId: number) {
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: async (seats: HoldSeatInput[]) =>
      (await api.post<{ data: SeatHold }>(`${Endpoint.Sessions}/${sessionId}/holds`, { seats })).data,
    onSuccess: refreshSessions,
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) refreshSessions()
    },
  })
}

export function useReleaseHold() {
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: (holdId: string) => api.delete<void>(`${Endpoint.Holds}/${holdId}`),
    onSuccess: refreshSessions,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: async (input: CreateOrderInput) =>
      (await api.post<{ data: Order }>(Endpoint.Orders, input)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys._def })
      return refreshSessions()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) refreshSessions()
    },
  })
}
