import { useQuery } from '@tanstack/react-query'
import { storage } from '@/utils/storage'
import { ApiError, api, TOKEN_KEY } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { authKeys } from '@/api/queryKeys'
import type { User } from '@/api/types'

/** The signed in user. Does not fetch when no token is stored. */
export function useMe() {
  return useQuery({
    queryKey: authKeys.me,
    // `null` marks a guest, set on logout. Setting data notifies mounted observers, removing the query does not.
    queryFn: async (): Promise<User | null> => {
      try {
        return (await api.get<{ data: User }>(Endpoint.Me)).data
      } catch (error) {
        // A 401 means the stored token is stale. Drop it and act as a guest.
        if (error instanceof ApiError && error.status === 401) storage.remove(TOKEN_KEY)
        throw error
      }
    },
    enabled: !!storage.get(TOKEN_KEY),
  })
}
