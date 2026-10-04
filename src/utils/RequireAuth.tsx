import { useNavigate } from '@tanstack/react-router'
import { useEffect, type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useAuthModal } from '../hooks/useAuthModal'

/** Shows `children` to logged in users. A guest gets the login modal, and goes home if they close it. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()
  const { openLogin } = useAuthModal()
  const navigate = useNavigate()

  useEffect(() => {
    if (user || isLoading) return
    openLogin({ onCancel: () => navigate({ to: '/' }) })
  }, [user, isLoading, openLogin, navigate])

  return user ? children : null
}
