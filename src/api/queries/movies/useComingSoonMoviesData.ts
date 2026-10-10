import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { Movie } from '@/api/types'

export function useComingSoonMoviesData(limit?: number) {
  return useQuery({
    queryKey: moviesKeys.comingSoon(limit),
    queryFn: async () =>
      (await api.get<{ data: Movie[] }>(Endpoint.ComingSoon, { query: { limit } })).data,
  })
}
