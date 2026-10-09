import { useFeaturedMoviesData } from '@/api/queries/movies/useFeaturedMoviesData'
import { Carousel } from '@/components/core/Carousel'
import { ErrorState } from '@/components/core/ErrorState'
import { FeaturedBanner } from './FeaturedBanner'

export function FeaturedSection() {
  const { data: movies, isError, isFetching, refetch } = useFeaturedMoviesData()

  if (movies) {
    return (
      <Carousel
        items={movies}
        getKey={(movie) => movie.id}
        renderSlide={(movie) => <FeaturedBanner movie={movie} />}
        className="-mt-28 h-190"
      />
    )
  }
  if (isError) {
    // The padding at the top keeps the message clear of the navbar, which sits over the banner.
    return (
      <ErrorState
        message="Could not load the featured films."
        onRetry={() => refetch()}
        isRetrying={isFetching}
        className="px-17.5 pt-28"
      />
    )
  }
  return null
}
