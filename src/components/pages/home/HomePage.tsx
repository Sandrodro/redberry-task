import { useRecentlyViewedMoviesData } from '@/api/queries/movies/useRecentlyViewedMoviesData'
import { Divider } from '@/components/core/Divider'
import { ComingSoonSection } from './ComingSoonSection'
import { FeaturedSection } from './FeaturedSection'
import { NowPlayingSection } from './NowPlayingSection'
import { RecentlyViewed } from './RecentlyViewed'

export function HomePage() {
  const { data: recentlyViewedMovies } = useRecentlyViewedMoviesData()

  return (
    <div className="flex flex-col gap-8">
      <FeaturedSection />
      <div className="flex flex-col gap-10">
        {recentlyViewedMovies.length > 0 && (
          <>
            <RecentlyViewed movies={recentlyViewedMovies} />
            <Divider />
          </>
        )}
        <NowPlayingSection />
        <ComingSoonSection />
      </div>
    </div>
  )
}
