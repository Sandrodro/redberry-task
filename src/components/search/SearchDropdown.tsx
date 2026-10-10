import PopcornIcon from '@/assets/icons/popcorn.svg?react'
import SearchIcon from '@/assets/icons/magnifying-glass.svg?react'
import { useSearchMoviesData } from '@/api/queries/search/useSearchMoviesData'
import { ErrorState } from '@/components/core/ErrorState'
import { Spinner } from '@/components/core/Spinner'
import { Typography } from '@/components/core/Typography'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { SearchEmptyState } from './SearchEmptyState'
import { SearchResult } from './SearchResult'

type SearchDropdownProps = {
  /** The trimmed text in the input. */
  query: string
  onSelectMovie: () => void
  onBrowse: () => void
}

export function SearchDropdown(props: SearchDropdownProps) {
  return (
    <div
      tabIndex={-1}
      className="absolute right-0 top-full z-20 mt-2 w-120 rounded-2xl border border-elevated bg-background p-2 shadow-[0_2px_3px_var(--shadow),0_20px_24px_var(--shadow)] outline-none"
    >
      <SearchDropdownContent {...props} />
    </div>
  )
}

function SearchDropdownContent({ query, onSelectMovie, onBrowse }: SearchDropdownProps) {
  const term = useDebouncedValue(query)
  const { data, isPending, isLoadingError, isFetching, isPlaceholderData, refetch } =
    useSearchMoviesData(term)

  if (query === '') {
    return (
      <SearchEmptyState
        icon={<PopcornIcon className="size-6" />}
        title="What do you want to watch?"
        description="Search by title, director or cast"
        onBrowse={onBrowse}
      />
    )
  }
  // Waiting for the debounce, or for the first answer.
  if (term === '' || isPending) {
    return <Spinner className="mx-auto my-10" />
  }
  if (isLoadingError) {
    return (
      <ErrorState
        message="Could not load results."
        onRetry={() => refetch()}
        isRetrying={isFetching}
        className="px-6 py-8"
      />
    )
  }
  if (data.length === 0) {
    return (
      <SearchEmptyState
        icon={<SearchIcon className="size-5" />}
        title={`No results for “${term}”`}
        description="Check the spelling or try another film or live event."
        onBrowse={onBrowse}
      />
    )
  }
  return (
    <div className={`transition-opacity ${isPlaceholderData ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between px-2.5 pb-1.5 pt-2 text-muted">
        <Typography variant="overline">Films & Events</Typography>
        <Typography variant="bodyS">
          {data.length} {data.length === 1 ? 'result' : 'results'}
        </Typography>
      </div>
      <div className="flex flex-col gap-0.5">
        {data.map((movie) => (
          <SearchResult key={movie.id} movie={movie} query={term} onSelect={onSelectMovie} />
        ))}
      </div>
    </div>
  )
}
