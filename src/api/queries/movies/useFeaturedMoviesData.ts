import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { FeaturedMovie } from '@/api/types'

export const featuredMoviesQueryOptions = () =>
  queryOptions({
    queryKey: moviesKeys.featured.queryKey,
    queryFn: async () => (await api.get<{ data: FeaturedMovie[] }>(Endpoint.Featured)).data,
  })

export function useFeaturedMoviesData() {
  return useQuery(featuredMoviesQueryOptions())
}
