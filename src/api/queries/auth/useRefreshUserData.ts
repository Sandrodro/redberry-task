import { useQueryClient } from '@tanstack/react-query'
import { authKeys, filterOptionsKeys } from '@/api/queryKeys'

/** Queries that are the same for every user, so a login or logout does not change them. */
const USER_INDEPENDENT_KEYS: string[] = [authKeys._def[0], filterOptionsKeys._def[0]]

/** Fields like `isNotified` and `isMine` depend on who is logged in, so refetch everything except auth and filter options after a login or logout. */
export function useRefreshUserData() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({
      predicate: (query) => !USER_INDEPENDENT_KEYS.includes(query.queryKey[0] as string),
    })
}
