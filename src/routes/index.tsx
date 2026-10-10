import { createFileRoute } from '@tanstack/react-router'
import { featuredMoviesQueryOptions } from '@/api/queries/movies/useFeaturedMoviesData'
import { HomePage } from '@/components/pages/home/HomePage'
import { preloadImage } from '@/utils/preloadImage'

export const Route = createFileRoute('/')({
  // The hero banner and its first image are awaited (cached after the first load), so the page
  // never opens without them.
  // The other sections load after the page shows. A failed request is left to the page.
  loader: async ({ context: { queryClient } }) => {
    const movies = await queryClient
      .query({ ...featuredMoviesQueryOptions(), staleTime: 'static' })
      .catch(() => null)
    if (movies?.[0]) await preloadImage(movies[0].backdropUrl)
  },
  component: HomePage,
})
