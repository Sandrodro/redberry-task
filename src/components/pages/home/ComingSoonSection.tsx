import { useComingSoonMoviesData } from '@/api/queries/movies/useComingSoonMoviesData'
import { EmptyState } from '@/components/core/EmptyState'
import { ErrorState } from '@/components/core/ErrorState'
import { Slider } from '@/components/core/Slider'
import { ComingSoonCard } from './ComingSoonCard'
import { HomeSection } from './HomeSection'

export function ComingSoonSection() {
  const { data: movies, isError, isFetching, refetch } = useComingSoonMoviesData()

  if (!movies && !isError) return null

  return (
    <>
      <hr className="h-px border-0 bg-elevated" />
      <HomeSection title="Coming soon...">
        {!movies ? (
          <ErrorState
            message="Could not load the upcoming films."
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : movies.length === 0 ? (
          <EmptyState
            title="No upcoming releases yet"
            description="New releases will show up here as soon as they are announced."
          />
        ) : (
          <Slider
            items={movies}
            getKey={(movie) => movie.id}
            renderItem={(movie) => <ComingSoonCard movie={movie} />}
            gapClassName="gap-5"
          />
        )}
      </HomeSection>
    </>
  )
}
