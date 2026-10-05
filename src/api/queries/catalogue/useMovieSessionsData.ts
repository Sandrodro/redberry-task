import { useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { moviesKeys } from '../../queryKeys'
import type { VenueSessions } from '../../types'

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
