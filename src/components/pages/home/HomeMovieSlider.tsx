import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import type { Movie } from '@/api/types'
import { EmptyState } from '@/components/core/EmptyState'
import { ErrorState } from '@/components/core/ErrorState'
import { Slider } from '@/components/core/Slider'
import { Spinner } from '@/components/core/Spinner'

type HomeMovieSliderProps = {
  query: UseQueryResult<Movie[]>
  errorMessage: string
  emptyTitle: string
  emptyDescription: string
  renderItem: (movie: Movie) => ReactNode
  /** Tailwind gap class for the space between cards. */
  gapClassName?: string
}

/** A row of films with its loading, error and empty states. */
export function HomeMovieSlider({
  query: { data: movies, isPending, isFetching, refetch },
  errorMessage,
  emptyTitle,
  emptyDescription,
  renderItem,
  gapClassName,
}: HomeMovieSliderProps) {
  if (isPending) return <Spinner className="mx-auto my-10" />
  if (!movies) {
    return <ErrorState message={errorMessage} onRetry={() => refetch()} isRetrying={isFetching} />
  }
  if (movies.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }
  return (
    <Slider
      items={movies}
      getKey={(movie) => movie.id}
      renderItem={renderItem}
      gapClassName={gapClassName}
    />
  )
}
