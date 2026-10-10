import { useMe } from '@/api/queries/auth/useMe'
import { ApiError } from '@/api/client'

export function useAuth() {
  const { data: user, isLoading, isFetching, error, refetch } = useMe()

  return {
    user: user ?? null,
    isLoggedIn: !!user,
    /** True while a stored token is being checked against the API. */
    isLoading,
    isFetching,
    /** True when the check failed for a reason other than a stale token. A 401 makes the user a guest. */
    isError: !!error && !(error instanceof ApiError && error.status === 401),
    refetch,
  }
}
