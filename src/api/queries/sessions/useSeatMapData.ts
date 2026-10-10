import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { sessionsKeys } from '@/api/queryKeys'
import type { SeatMap } from '@/api/types'

export function useSeatMapData(id: number) {
  return useQuery({
    queryKey: sessionsKeys.seats(id),
    queryFn: async () =>
      (await api.get<{ data: SeatMap }>(`${Endpoint.Sessions}/${id}/seats`)).data,
  })
}
