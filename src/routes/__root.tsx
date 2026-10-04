import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { DefaultLayout } from '../components/DefaultLayout'
import { AuthModalProvider } from '../providers/AuthModalProvider'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <AuthModalProvider>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </AuthModalProvider>
  ),
})
