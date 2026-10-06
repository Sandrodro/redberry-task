import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { useRefreshSessions } from './useRefreshSessions'

export function useReleaseHold() {
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: (holdId: string) => api.delete<void>(`${Endpoint.Holds}/${holdId}`),
    onSuccess: refreshSessions,
  })
}
