import { useNavigate } from '@tanstack/react-router'
import { useEffect, type ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/hooks/useAuthModal'
import { ErrorState } from '@/components/core/ErrorState'
import { PageSpinner } from '@/components/PageSpinner'

/** Shows `children` to logged in users. A guest gets the login modal, and goes home if they close it. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isLoading, isFetching, isError, refetch } = useAuth()
  const { openLogin } = useAuthModal()
  const navigate = useNavigate()

  useEffect(() => {
    if (user || isLoading || isError) return
    openLogin({ onCancel: () => navigate({ to: '/' }) })
  }, [user, isLoading, isError, openLogin, navigate])

  if (user) return children
  if (isLoading) return <PageSpinner />
  if (isError) {
    return (
      <ErrorState
        message="Could not load your account."
        onRetry={() => refetch()}
        isRetrying={isFetching}
        className="px-12.75 py-40"
      />
    )
  }
  return null
}
