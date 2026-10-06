import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { holdsKeys } from '@/api/queryKeys'
import type { SeatHold } from '@/api/types'

export function useHoldData(holdId: string) {
  return useQuery({
    queryKey: holdsKeys.detail(holdId).queryKey,
    queryFn: async () => (await api.get<{ data: SeatHold }>(`${Endpoint.Holds}/${holdId}`)).data,
  })
}
