import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, toFormData } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { authKeys } from '@/api/queryKeys'
import type { ProfileInput, User } from '@/api/types'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: ProfileInput) =>
      (await api.put<{ data: User }>(Endpoint.Profile, toFormData({ ...input }))).data,
    onSuccess: (user) => queryClient.setQueryData(authKeys.me, user),
  })
}
