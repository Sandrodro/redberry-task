import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import type { SessionSort } from '@/api/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/core/Select'
import { Typography } from '@/components/core/Typography'
import { useSessionsFilters } from './useSessionsFilters'

export function SortSelect() {
  const { data: options } = useFilterOptionsData()
  const { filters, setSort } = useSessionsFilters()

  if (!options) return null

  return (
    <div className="flex items-center gap-2">
      <Typography variant="bodyM" as="span" className="text-muted">
        Sort:
      </Typography>
      <Select
        value={filters.sort ?? options.sorts[0].id}
        onValueChange={(value) => setSort(value as SessionSort)}
      >
        <SelectTrigger aria-label="Sort">
          <Typography variant="labelS" as="span">
            <SelectValue />
          </Typography>
        </SelectTrigger>
        <SelectContent align="end">
          {options.sorts.map((sort) => (
            <SelectItem key={sort.id} value={sort.id}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
