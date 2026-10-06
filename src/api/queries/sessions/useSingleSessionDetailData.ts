import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { sessionsKeys } from '@/api/queryKeys'
import type { Session } from '@/api/types'

export function useSingleSessionDetailData(id: number) {
  return useQuery({
    queryKey: sessionsKeys.detail(id).queryKey,
    queryFn: async () => (await api.get<{ data: Session }>(`${Endpoint.Sessions}/${id}`)).data,
  })
}
