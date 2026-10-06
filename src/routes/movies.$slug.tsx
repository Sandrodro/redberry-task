import { noop } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { movieQueryOptions } from '@/api/queries/movies/useMovieData'
import { movieSessionsQueryOptions } from '@/api/queries/movies/useMovieSessionsData'
import { MoviePage } from '@/components/pages/movie/MoviePage'
import { getFirstAvailableDate } from '@/utils/getUpcomingDates'

export const Route = createFileRoute('/movies/$slug')({
  // The movie and its first day of sessions are awaited, so the page opens with both loaded.
  // A failed request is left to the page, which shows the error text.
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    const movie = await queryClient.query({ ...movieQueryOptions(slug), staleTime: 'static' }).catch(() => null)
    if (movie) {
      await queryClient
        .query(movieSessionsQueryOptions(slug, getFirstAvailableDate(movie.availableDates)))
        .catch(noop)
    }
  },
  component: MoviePage,
})
