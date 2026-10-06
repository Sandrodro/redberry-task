import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { sessionsKeys } from '@/api/queryKeys'
import type { SeatMap } from '@/api/types'

export const seatMapQueryOptions = (id: number) =>
  queryOptions({
    queryKey: sessionsKeys.seats(id).queryKey,
    queryFn: async () =>
      (await api.get<{ data: SeatMap }>(`${Endpoint.Sessions}/${id}/seats`)).data,
  })

export function useSeatMapData(id: number) {
  return useQuery(seatMapQueryOptions(id))
}
