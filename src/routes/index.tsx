import { noop } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { featuredMoviesQueryOptions } from '@/api/queries/movies/useFeaturedMoviesData'
import { HomePage } from '@/components/pages/home/HomePage'

export const Route = createFileRoute('/')({
  // The hero banner is awaited (cached after the first load), so the page never opens without it.
  // The other sections load after the page shows. A failed request is left to the page.
  loader: async ({ context: { queryClient } }) => {
    await queryClient.query({ ...featuredMoviesQueryOptions(), staleTime: 'static' }).catch(noop)
  },
  component: HomePage,
})
