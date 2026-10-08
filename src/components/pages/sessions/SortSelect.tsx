import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import type { SessionSort } from '@/api/types'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import { useSessionsFilters } from './useSessionsFilters'
import { Typography } from '@/components/core/Typography'

export function SortSelect() {
  const { data: options } = useFilterOptionsData()
  const { filters, setSort } = useSessionsFilters()

  if (!options) return null

  return (
    <label className="flex items-center gap-2">
      <Typography variant="bodyM" as="span" className="text-muted">
        Sort:
      </Typography>
      <span className="relative flex items-center">
        <select
          value={filters.sort ?? options.sorts[0].id}
          onChange={(event) => setSort(event.target.value as SessionSort)}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-xs font-semibold outline-none [color-scheme:dark]"
        >
          {options.sorts.map((sort) => (
            <option key={sort.id} value={sort.id}>
              {sort.label}
            </option>
          ))}
        </select>
        <ArrowIcon className="pointer-events-none absolute right-0 size-4" />
      </span>
    </label>
  )
}
