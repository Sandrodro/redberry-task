import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { moviesKeys } from '../../queryKeys'
import type { Movie } from '../../types'

export function useComingSoonMoviesData(limit?: number) {
  return useQuery({
    queryKey: moviesKeys.comingSoon(limit).queryKey,
    queryFn: async () =>
      (await api.get<{ data: Movie[] }>(Endpoint.ComingSoon, { query: { limit } })).data,
  })
}
