import { useMe } from '../api/queries/auth/useMe'

export function useAuth() {
  const { data: user, isLoading } = useMe()

  return {
    user: user ?? null,
    isLoggedIn: !!user,
    /** True while a stored token is being checked against the API. */
    isLoading,
  }
}
