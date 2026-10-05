import { useMutation } from '@tanstack/react-query'
import { ApiError, api } from '../../client'
import { Endpoint } from '../../endpoints'
import type { HoldSeatInput, SeatHold } from '../../types'
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
