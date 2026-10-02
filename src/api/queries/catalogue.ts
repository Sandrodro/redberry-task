import { queryOptions, useMutation } from '@tanstack/react-query'
import { api } from '../client'
import { Endpoint } from '../endpoints'
import { moviesKeys } from '../queryKeys'
import type { Movie, MovieDetail, VenueSessions } from '../types'

export const searchQueryOptions = (q: string) =>
  queryOptions({
    queryKey: moviesKeys.search(q).queryKey,
    queryFn: async () => (await api.get<{ data: Movie[] }>(Endpoint.Search, { query: { q } })).data,
    enabled: q.trim() !== '',
  })

export const nowPlayingQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: moviesKeys.nowPlaying(limit).queryKey,
    queryFn: async () =>
      (await api.get<{ data: Movie[] }>(Endpoint.NowPlaying, { query: { limit } })).data,
  })

export const comingSoonQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: moviesKeys.comingSoon(limit).queryKey,
    queryFn: async () =>
      (await api.get<{ data: Movie[] }>(Endpoint.ComingSoon, { query: { limit } })).data,
  })

export const featuredQueryOptions = queryOptions({
  queryKey: moviesKeys.featured.queryKey,
  queryFn: async () => (await api.get<{ data: Movie[] }>(Endpoint.Featured)).data,
})

export const movieQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: moviesKeys.detail(slug).queryKey,
    queryFn: async () =>
      (await api.get<{ data: MovieDetail }>(`${Endpoint.Movies}/${encodeURIComponent(slug)}`)).data,
  })

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

export function useNotifyMe() {
  return useMutation({
    mutationFn: async (slug: string) =>
      (
        await api.post<{ data: { movieId: number; subscribed: boolean } }>(
          `${Endpoint.Movies}/${encodeURIComponent(slug)}/notify`,
        )
      ).data,
  })
}
