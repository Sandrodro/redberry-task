import { useNowPlayingMoviesData } from '@/api/queries/movies/useNowPlayingMoviesData'
import { HomeMovieSlider } from './HomeMovieSlider'
import { HomeSection } from './HomeSection'
import { MovieCard } from './MovieCard'

export function NowPlayingSection() {
  const query = useNowPlayingMoviesData()

  return (
    <HomeSection title="Now playing">
      <HomeMovieSlider
        query={query}
        errorMessage="Could not load the films."
        emptyTitle="No films are playing right now"
        emptyDescription="Check back soon, new films are added every week."
        renderItem={(movie) => <MovieCard movie={movie} />}
      />
    </HomeSection>
  )
}
