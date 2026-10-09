import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'
import { getRecentlyViewed } from '@/utils/recentlyViewed'
import { movieQueryOptions } from './useMovieData'

/** The films the user opened, newest first. A film that fails to load is left out. */
export function useRecentlyViewedMoviesData() {
  // Read once: the list only changes on the movie page, and the home page mounts again after that.
  const [slugs] = useState(getRecentlyViewed)

  return useQueries({
    queries: slugs.map(movieQueryOptions),
    combine: (results) => ({ data: results.flatMap(({ data }) => (data ? [data] : [])) }),
  })
}
