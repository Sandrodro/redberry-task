import { useNowPlayingMoviesData } from '@/api/queries/movies/useNowPlayingMoviesData'
import { EmptyState } from '@/components/core/EmptyState'
import { ErrorState } from '@/components/core/ErrorState'
import { Slider } from '@/components/core/Slider'
import { HomeSection } from './HomeSection'
import { MovieCard } from './MovieCard'

export function NowPlayingSection() {
  const { data: movies, isError, isFetching, refetch } = useNowPlayingMoviesData()

  if (!movies && !isError) return null

  return (
    <HomeSection title="Now playing">
      {!movies ? (
        <ErrorState
          message="Could not load the films."
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      ) : movies.length === 0 ? (
        <EmptyState
          title="No films are playing right now"
          description="Check back soon, new films are added every week."
        />
      ) : (
        <Slider
          items={movies}
          getKey={(movie) => movie.id}
          renderItem={(movie) => <MovieCard movie={movie} />}
        />
      )}
    </HomeSection>
  )
}
