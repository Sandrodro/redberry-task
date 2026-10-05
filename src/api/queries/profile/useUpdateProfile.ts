import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, toFormData } from '../../client'
import { Endpoint } from '../../endpoints'
import { authKeys } from '../../queryKeys'
import type { ProfileInput, User } from '../../types'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: ProfileInput) =>
      (await api.put<{ data: User }>(Endpoint.Profile, toFormData({ ...input }))).data,
    onSuccess: (user) => queryClient.setQueryData(authKeys.me.queryKey, user),
  })
}
