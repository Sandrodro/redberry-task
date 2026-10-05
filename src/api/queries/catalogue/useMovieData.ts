import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { moviesKeys } from '../../queryKeys'
import type { MovieDetail } from '../../types'

export function useMovieData(slug: string) {
  return useQuery({
    queryKey: moviesKeys.detail(slug).queryKey,
    queryFn: async () =>
      (await api.get<{ data: MovieDetail }>(`${Endpoint.Movies}/${encodeURIComponent(slug)}`)).data,
  })
}
