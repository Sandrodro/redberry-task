import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { holdsKeys } from '../../queryKeys'
import type { SeatHold } from '../../types'

export function useHoldData(holdId: string) {
  return useQuery({
    queryKey: holdsKeys.detail(holdId).queryKey,
    queryFn: async () => (await api.get<{ data: SeatHold }>(`${Endpoint.Holds}/${holdId}`)).data,
  })
}
