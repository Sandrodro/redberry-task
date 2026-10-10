import { useQueryClient } from '@tanstack/react-query'
import { sessionsKeys } from '@/api/queryKeys'

/** Seat maps and seat counts go stale when holds change, so refresh them. */
export function useRefreshSessions() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: sessionsKeys.all })
}
