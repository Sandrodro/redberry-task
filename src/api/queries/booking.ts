import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, apiData } from '../client'
import { Endpoint } from '../endpoints'
import { holdsKeys, sessionsKeys, ticketsKeys } from '../queryKeys'
import type { CreateOrderInput, HoldSeatInput, Order, SeatHold } from '../types'

export const holdQueryOptions = (holdId: string) =>
  queryOptions({
    queryKey: holdsKeys.detail(holdId).queryKey,
    queryFn: () => apiData<SeatHold>(`${Endpoint.Holds}/${holdId}`),
  })

/** Seat maps and seat counts go stale when holds change, so refresh them. */
function useRefreshSessions() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: sessionsKeys._def })
}

export function useCreateHold(sessionId: number) {
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: (seats: HoldSeatInput[]) =>
      apiData<SeatHold>(`${Endpoint.Sessions}/${sessionId}/holds`, {
        method: 'POST',
        json: { seats },
      }),
    onSuccess: refreshSessions,
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) refreshSessions()
    },
  })
}

export function useReleaseHold() {
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: (holdId: string) => apiData<void>(`${Endpoint.Holds}/${holdId}`, { method: 'DELETE' }),
    onSuccess: refreshSessions,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: (input: CreateOrderInput) =>
      apiData<Order>(Endpoint.Orders, { method: 'POST', json: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys._def })
      return refreshSessions()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) refreshSessions()
    },
  })
}
