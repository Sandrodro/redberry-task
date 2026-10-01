import { useMutation, useQueryClient } from '@tanstack/react-query'
import { meQueryOptions } from './auth'
import { apiData } from '../client'
import { Endpoint } from '../endpoints'
import type { ProfileInput, User } from '../types'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ProfileInput) =>
      apiData<User>(Endpoint.Profile, { method: 'PUT', form: { ...input } }),
    onSuccess: (user) => queryClient.setQueryData(meQueryOptions.queryKey, user),
  })
}
