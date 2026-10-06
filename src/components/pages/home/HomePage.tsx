import { useComingSoonMoviesData } from '@/api/queries/catalogue/useComingSoonMoviesData'
import { useFeaturedMoviesData } from '@/api/queries/catalogue/useFeaturedMoviesData'
import { useNowPlayingMoviesData } from '@/api/queries/catalogue/useNowPlayingMoviesData'
import { Carousel } from '@/components/core/Carousel'
import { Slider } from '@/components/core/Slider'
import { ComingSoonCard } from './ComingSoonCard'
import { FeaturedBanner } from './FeaturedBanner'
import { HomeSection } from './HomeSection'
import { MovieCard } from './MovieCard'

export function HomePage() {
  const { data: featuredMoviesData } = useFeaturedMoviesData()
  const { data: nowPlayingMoviesData } = useNowPlayingMoviesData()
  const { data: comingSoonMoviesData } = useComingSoonMoviesData()

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
      <div className="flex flex-col gap-10">
        {nowPlayingMoviesData && (
          <HomeSection title="Now playing">
            <Slider
              items={nowPlayingMoviesData}
              getKey={(movie) => movie.id}
              renderItem={(movie) => <MovieCard movie={movie} />}
            />
          </HomeSection>
        )}
        {comingSoonMoviesData && (
          <>
            <hr className="h-px border-0 bg-elevated" />
            <HomeSection title="Coming soon...">
              <Slider
                items={comingSoonMoviesData}
                getKey={(movie) => movie.id}
                renderItem={(movie) => <ComingSoonCard movie={movie} />}
                gapClassName="gap-5"
              />
            </HomeSection>
          </>
        )}
      </div>
    </div>
  )
}
