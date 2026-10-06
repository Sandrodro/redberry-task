import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { VenueSessions } from '@/api/types'

export function useMovieSessionsData(slug: string, date?: string) {
  return useQuery({
    queryKey: moviesKeys.sessions(slug, date).queryKey,
    queryFn: async () =>
      (
        await api.get<{ data: VenueSessions[] }>(
          `${Endpoint.Movies}/${encodeURIComponent(slug)}/sessions`,
          { query: { date } },
        )
      ).data,
  })
}
