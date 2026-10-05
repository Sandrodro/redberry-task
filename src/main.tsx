import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, defaultStringifySearch, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApiError } from './api/client'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Client errors (4xx) will not change on retry.
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status < 500) && failureCount < 3,
    },
  },
})

const router = createRouter({
  routeTree,
  context: { queryClient },
  // Keep commas readable in the URL: ?venue=galleria,batumi
  stringifySearch: (search) => defaultStringifySearch(search).replace(/%2C/g, ','),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
