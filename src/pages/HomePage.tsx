import { useFeaturedMoviesData } from '../api/queries/catalogue/useFeaturedMoviesData'
import { Carousel } from '../components/core/Carousel'
import { FeaturedBanner } from '../components/FeaturedBanner'

export function HomePage() {
  const { data: featuredMoviesData } = useFeaturedMoviesData()

  return (
    <div>
      {featuredMoviesData && (
        <Carousel
          items={featuredMoviesData}
          getKey={(movie) => movie.id}
          renderSlide={(movie) => <FeaturedBanner movie={movie} />}
          className="-mt-28 h-190"
        />
      )}
    </div>
  )
}
