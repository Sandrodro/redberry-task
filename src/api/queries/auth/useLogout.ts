import { useMutation, useQueryClient } from '@tanstack/react-query'
import { storage } from '@/utils/storage'
import { api, TOKEN_KEY } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { authKeys, ticketsKeys } from '@/api/queryKeys'
import { useRefreshUserData } from './useRefreshUserData'

export function useLogout() {
  const queryClient = useQueryClient()
  const refreshUserData = useRefreshUserData()
  return useMutation({
    mutationFn: () => api.post<void>(Endpoint.Logout),
    // Clear the token whether or not the request succeeded.
    onSettled: () => {
      storage.remove(TOKEN_KEY)
      queryClient.setQueryData(authKeys.me.queryKey, null)
      queryClient.removeQueries({ queryKey: ticketsKeys._def })
      refreshUserData()
    },
  })
}
