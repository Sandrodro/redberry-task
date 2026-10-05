import { useFeaturedMoviesData } from '../../../api/queries/catalogue/useFeaturedMoviesData'
import { useNowPlayingMoviesData } from '../../../api/queries/catalogue/useNowPlayingMoviesData'
import { Carousel } from '../../core/Carousel'
import { Slider } from '../../core/Slider'
import { FeaturedBanner } from './FeaturedBanner'
import { HomeSection } from './HomeSection'
import { MovieCard } from './MovieCard'

export function HomePage() {
  const { data: featuredMoviesData } = useFeaturedMoviesData()
  const { data: nowPlayingMoviesData } = useNowPlayingMoviesData()

  return (
    <div className="flex flex-col gap-8">
      {featuredMoviesData && (
        <Carousel
          items={featuredMoviesData}
          getKey={(movie) => movie.id}
          renderSlide={(movie) => <FeaturedBanner movie={movie} />}
          className="-mt-28 h-190"
        />
      )}
      {nowPlayingMoviesData && (
        <HomeSection title="Now playing">
          <Slider
            items={nowPlayingMoviesData}
            getKey={(movie) => movie.id}
            renderItem={(movie) => <MovieCard movie={movie} />}
          />
        </HomeSection>
      )}
    </div>
  )
}
