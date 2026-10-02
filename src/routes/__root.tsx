import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { DefaultLayout } from '../components/DefaultLayout'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ),
})
