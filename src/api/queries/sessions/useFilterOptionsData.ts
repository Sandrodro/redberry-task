import { queryOptions, useQuery } from '@tanstack/react-query'
import { api } from '../../client'
import { Endpoint } from '../../endpoints'
import { filterOptionsKeys } from '../../queryKeys'
import type { FilterOptions } from '../../types'

export const filterOptionsQueryOptions = () =>
  queryOptions({
    queryKey: filterOptionsKeys.all.queryKey,
    queryFn: async () => (await api.get<{ data: FilterOptions }>(Endpoint.FilterOptions)).data,
    staleTime: Infinity,
  })

export function useFilterOptionsData() {
  return useQuery(filterOptionsQueryOptions())
}
