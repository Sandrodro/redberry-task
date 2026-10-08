import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { Movie } from '@/api/types'

export function useSearchMoviesData(q: string) {
  return useQuery({
    queryKey: moviesKeys.search(q).queryKey,
    queryFn: async () => (await api.get<{ data: Movie[] }>(Endpoint.Search, { query: { q } })).data,
    enabled: q.trim() !== '',
    placeholderData: keepPreviousData,
  })
}
