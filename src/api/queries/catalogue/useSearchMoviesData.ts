import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { moviesKeys } from '../../queryKeys'
import type { Movie } from '../../types'

export function useSearchMoviesData(q: string) {
  return useQuery({
    queryKey: moviesKeys.search(q).queryKey,
    queryFn: async () => (await api.get<{ data: Movie[] }>(Endpoint.Search, { query: { q } })).data,
    enabled: q.trim() !== '',
  })
}
