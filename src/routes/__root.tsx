import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <>
      <nav className="flex gap-4 p-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </nav>
      <Outlet />
    </>
  ),
})
