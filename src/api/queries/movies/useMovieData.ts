import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { MovieDetail } from '@/api/types'

export function useMovieData(slug: string) {
  return useQuery({
    queryKey: moviesKeys.detail(slug).queryKey,
    queryFn: async () =>
      (await api.get<{ data: MovieDetail }>(`${Endpoint.Movies}/${encodeURIComponent(slug)}`)).data,
  })
}
