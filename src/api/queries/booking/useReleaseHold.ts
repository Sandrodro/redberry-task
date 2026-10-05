import { useMutation } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { useRefreshSessions } from './useRefreshSessions'

export function useReleaseHold() {
  const refreshSessions = useRefreshSessions()
  return useMutation({
    mutationFn: (holdId: string) => api.delete<void>(`${Endpoint.Holds}/${holdId}`),
    onSuccess: refreshSessions,
  })
}
