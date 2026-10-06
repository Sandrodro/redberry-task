import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { DefaultLayout } from '@/components/DefaultLayout'
import { AuthModalProvider } from '@/providers/AuthModalProvider'
import { BookingModalProvider } from '@/providers/BookingModalProvider'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <AuthModalProvider>
      <BookingModalProvider>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </BookingModalProvider>
    </AuthModalProvider>
  ),
})
