import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { sessionsKeys } from '../../queryKeys'
import type { Session } from '../../types'

export function useSessionData(id: number) {
  return useQuery({
    queryKey: sessionsKeys.detail(id).queryKey,
    queryFn: async () => (await api.get<{ data: Session }>(`${Endpoint.Sessions}/${id}`)).data,
  })
}
