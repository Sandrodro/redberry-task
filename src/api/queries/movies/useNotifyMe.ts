import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'

export function useNotifyMe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) =>
      (
        await api.post<{ data: { movieId: number; subscribed: boolean } }>(
          `${Endpoint.Movies}/${encodeURIComponent(slug)}/notify`,
        )
      ).data,
    // `isNotified` is part of the movie lists.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: moviesKeys.all }),
  })
}
