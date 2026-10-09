import { useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useMovieData } from '@/api/queries/movies/useMovieData'
import { ErrorState } from '@/components/core/ErrorState'
import { Spinner } from '@/components/core/Spinner'
import { TooltipProvider } from '@/components/core/Tooltip'
import { addRecentlyViewed } from '@/utils/recentlyViewed'
import { MovieDetails } from './MovieDetails'
import { MovieHero } from './MovieHero'
import { MovieSessions } from './MovieSessions'

export function MoviePage() {
  const { slug } = useParams({ from: '/movies/$slug' })
  const { data: movie, isPending, isLoadingError, isFetching, refetch } = useMovieData(slug)

  // Only a film that loaded is stored, so a wrong URL never reaches the home page.
  useEffect(() => {
    if (movie) addRecentlyViewed(movie.slug)
  }, [movie])

  if (isPending) {
    return (
      <div className="flex justify-center py-40">
        <Spinner />
      </div>
    )
  }

  if (isLoadingError) {
    return (
      <ErrorState
        message="This film could not be loaded."
        onRetry={() => refetch()}
        isRetrying={isFetching}
        className="px-12.75 py-40"
      />
    )
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-8.5 pb-16">
        <MovieHero movie={movie} />
        <div className="flex gap-2.5 px-12.75">
          <MovieSessions movie={movie} />
          <MovieDetails movie={movie} />
        </div>
      </div>
    </TooltipProvider>
  )
}
