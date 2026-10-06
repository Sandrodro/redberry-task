import { useMutation } from '@tanstack/react-query'
import { ApiError, api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import type { HoldSeatInput, SeatHold } from '@/api/types'
import { useRefreshSessions } from './useRefreshSessions'

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
