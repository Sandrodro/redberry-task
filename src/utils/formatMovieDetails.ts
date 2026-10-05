import type { Movie } from '../api/types'

/** "Horror · 95 min". Shows the first genre only. */
export function formatMovieDetails(movie: Movie) {
  return [movie.genres[0]?.name, `${movie.runtimeMinutes} min`].filter(Boolean).join(' · ')
}
