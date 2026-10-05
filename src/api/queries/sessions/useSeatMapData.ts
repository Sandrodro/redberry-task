import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { sessionsKeys } from '../../queryKeys'
import type { SeatMap } from '../../types'

export function useSeatMapData(id: number) {
  return useQuery({
    queryKey: sessionsKeys.seats(id).queryKey,
    queryFn: async () =>
      (await api.get<{ data: SeatMap }>(`${Endpoint.Sessions}/${id}/seats`)).data,
  })
}
