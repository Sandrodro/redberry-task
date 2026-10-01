import { queryOptions, useMutation } from '@tanstack/react-query'
import { apiData } from '../client'
import { Endpoint } from '../endpoints'
import { moviesKeys } from '../queryKeys'
import type { Movie, MovieDetail, VenueSessions } from '../types'

export const searchQueryOptions = (q: string) =>
  queryOptions({
    queryKey: moviesKeys.search(q).queryKey,
    queryFn: () => apiData<Movie[]>(Endpoint.Search, { query: { q } }),
    enabled: q.trim() !== '',
  })

export const nowPlayingQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: moviesKeys.nowPlaying(limit).queryKey,
    queryFn: () => apiData<Movie[]>(Endpoint.NowPlaying, { query: { limit } }),
  })

export const comingSoonQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: moviesKeys.comingSoon(limit).queryKey,
    queryFn: () => apiData<Movie[]>(Endpoint.ComingSoon, { query: { limit } }),
  })

export const featuredQueryOptions = queryOptions({
  queryKey: moviesKeys.featured.queryKey,
  queryFn: () => apiData<Movie[]>(Endpoint.Featured),
})

export const movieQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: moviesKeys.detail(slug).queryKey,
    queryFn: () => apiData<MovieDetail>(`${Endpoint.Movies}/${encodeURIComponent(slug)}`),
  })

export const movieSessionsQueryOptions = (slug: string, date?: string) =>
  queryOptions({
    queryKey: moviesKeys.sessions(slug, date).queryKey,
    queryFn: () =>
      apiData<VenueSessions[]>(`${Endpoint.Movies}/${encodeURIComponent(slug)}/sessions`, {
        query: { date },
      }),
  })

export function useNotifyMe() {
  return useMutation({
    mutationFn: (slug: string) =>
      apiData<{ movieId: number; subscribed: boolean }>(
        `${Endpoint.Movies}/${encodeURIComponent(slug)}/notify`,
        { method: 'POST' },
      ),
  })
}
