import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { moviesKeys } from '@/api/queryKeys'
import type { VenueSessions } from '@/api/types'

export const movieSessionsQueryOptions = (slug: string, date?: string) =>
  queryOptions({
    queryKey: moviesKeys.sessions(slug, date).queryKey,
    queryFn: async () =>
      (
        await api.get<{ data: VenueSessions[] }>(
          `${Endpoint.Movies}/${encodeURIComponent(slug)}/sessions`,
          { query: { date } },
        )
      ).data,
  })

export function useMovieSessionsData(slug: string, date?: string) {
  return useQuery({ ...movieSessionsQueryOptions(slug, date), placeholderData: keepPreviousData })
}
