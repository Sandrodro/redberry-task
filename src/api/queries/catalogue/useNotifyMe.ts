import { useMutation } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'

export function useNotifyMe() {
  return useMutation({
    mutationFn: async (slug: string) =>
      (
        await api.post<{ data: { movieId: number; subscribed: boolean } }>(
          `${Endpoint.Movies}/${encodeURIComponent(slug)}/notify`,
        )
      ).data,
  })
}
