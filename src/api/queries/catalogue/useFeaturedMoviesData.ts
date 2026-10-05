import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { moviesKeys } from '../../queryKeys'
import type { FeaturedMovie } from '../../types'

export function useFeaturedMoviesData() {
  return useQuery({
    queryKey: moviesKeys.featured.queryKey,
    queryFn: async () => (await api.get<{ data: FeaturedMovie[] }>(Endpoint.Featured)).data,
  })
}
