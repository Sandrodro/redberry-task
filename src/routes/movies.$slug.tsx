import { noop } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { movieQueryOptions } from '@/api/queries/movies/useMovieData'
import { movieSessionsQueryOptions } from '@/api/queries/movies/useMovieSessionsData'
import { MoviePage } from '@/components/pages/movie/MoviePage'
import { getFirstAvailableDate } from '@/utils/getUpcomingDates'
import { preloadImage } from '@/utils/preloadImage'

export const Route = createFileRoute('/movies/$slug')({
  // The movie, its images and its first day of sessions are awaited, so the page opens with all
  // of them loaded.
  // A failed request is left to the page, which shows the error text.
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    const movie = await queryClient
      .query({ ...movieQueryOptions(slug), staleTime: 'static' })
      .catch(() => null)
    if (movie) {
      await Promise.all([
        queryClient
          .query(movieSessionsQueryOptions(slug, getFirstAvailableDate(movie.availableDates)))
          .catch(noop),
        preloadImage(movie.backdropUrl),
        preloadImage(movie.posterUrl),
      ])
    }
  },
  component: MoviePage,
})
