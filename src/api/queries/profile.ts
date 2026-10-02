import { useMutation, useQueryClient } from '@tanstack/react-query'
import { meQueryOptions } from './auth'
import { api, toFormData } from '../client'
import { Endpoint } from '../endpoints'
import type { ProfileInput, User } from '../types'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: ProfileInput) =>
      (await api.put<{ data: User }>(Endpoint.Profile, toFormData({ ...input }))).data,
    onSuccess: (user) => queryClient.setQueryData(meQueryOptions.queryKey, user),
  })
}
