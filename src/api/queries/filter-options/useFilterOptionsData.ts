import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Endpoint } from '@/api/endpoints'
import { filterOptionsKeys } from '@/api/queryKeys'
import type { FilterOptions } from '@/api/types'

export const filterOptionsQueryOptions = () =>
  queryOptions({
    queryKey: filterOptionsKeys.all.queryKey,
    queryFn: async () => (await api.get<{ data: FilterOptions }>(Endpoint.FilterOptions)).data,
    staleTime: Infinity,
  })

export function useFilterOptionsData() {
  return useQuery(filterOptionsQueryOptions())
}
