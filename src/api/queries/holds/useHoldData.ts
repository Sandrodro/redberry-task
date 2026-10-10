import { skipToken, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { holdsKeys } from '@/api/queryKeys'
import type { SeatHold } from '@/api/types'

/** A hold by id. An expired hold still loads, with `isLive: false`. A hold that never existed is a 404. */
export function useHoldData(holdId: string | null) {
  return useQuery({
    queryKey: holdsKeys.detail(holdId ?? ''),
    queryFn: holdId
      ? async () => (await api.get<{ data: SeatHold }>(`${Endpoint.Holds}/${holdId}`)).data
      : skipToken,
    // Seconds left change every second, so a cached copy is never reused. A 404 is the answer, not a reason to retry.
    gcTime: 0,
    retry: false,
  })
}
