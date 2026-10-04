import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RequireAuth } from '../utils/RequireAuth'

// Pathless layout. Every route file inside `routes/_protected/` needs a logged in user.
export const Route = createFileRoute('/_protected')({
  component: () => (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  ),
})
