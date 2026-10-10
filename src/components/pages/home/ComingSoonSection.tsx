import { useComingSoonMoviesData } from '@/api/queries/movies/useComingSoonMoviesData'
import { Divider } from '@/components/core/Divider'
import { ComingSoonCard } from './ComingSoonCard'
import { HomeMovieSlider } from './HomeMovieSlider'
import { HomeSection } from './HomeSection'

export function ComingSoonSection() {
  const query = useComingSoonMoviesData()

  return (
    <>
      <Divider />
      <HomeSection title="Coming soon...">
        <HomeMovieSlider
          query={query}
          errorMessage="Could not load the upcoming films."
          emptyTitle="No upcoming releases yet"
          emptyDescription="New releases will show up here as soon as they are announced."
          renderItem={(movie) => <ComingSoonCard movie={movie} />}
          gapClassName="gap-5"
        />
      </HomeSection>
    </>
  )
}
