import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <>
      <nav className="flex gap-4 p-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/sessions" className="[&.active]:font-bold">
          Sessions
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </nav>
      <Outlet />
    </>
  ),
})
