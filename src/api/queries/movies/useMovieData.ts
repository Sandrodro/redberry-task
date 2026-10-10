import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { MovieDetail } from '@/api/types'

export const movieQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: moviesKeys.detail(slug),
    queryFn: async () =>
      (await api.get<{ data: MovieDetail }>(`${Endpoint.Movies}/${encodeURIComponent(slug)}`)).data,
  })

export function useMovieData(slug: string) {
  return useQuery(movieQueryOptions(slug))
}
