import { useNavigate, useSearch } from '@tanstack/react-router'
import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import type { SessionSort, SessionsFilters } from '@/api/types'
import {
  getAvailableFormats,
  parseList,
  toSessionsFilters,
  type SessionsSearch,
} from '@/utils/sessionsSearchSchema'

type ListKey = 'venue' | 'format' | 'language' | 'band'

/** Sessions filters, stored in the URL search params of `/sessions`. Each change is a history entry. Any change but the page goes back to page 1. */
export function useSessionsFilters() {
  const search = useSearch({ from: '/sessions' })
  const navigate = useNavigate({ from: '/sessions' })
  // The route loader loads the options before the page renders.
  const { data: options } = useFilterOptionsData()

  const filters: SessionsFilters = options ? toSessionsFilters(search, options) : {}

  /** `patch` gets the latest search, so quick clicks in a row do not overwrite each other. */
  function update(patch: (previous: SessionsSearch) => Partial<SessionsSearch>) {
    navigate({
      search: (previous) => ({ ...previous, ...patch(previous), page: undefined }),
      resetScroll: false,
    })
  }

  /** Removes the formats the selected venues do not offer, so a hidden format does not stay in the URL. */
  function dropHiddenFormats(previous: SessionsSearch, venues: string[]) {
    if (!options) return {}
    const offered = getAvailableFormats(options, venues).map((format) => format.slug)
    const kept = parseList(previous.format)?.filter((slug) => offered.includes(slug))
    return { format: kept?.join(',') || undefined }
  }

  function toggle(key: ListKey, value: string) {
    update((previous) => {
      const current = parseList(previous[key]) ?? []
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return {
        [key]: next.join(',') || undefined,
        ...(key === 'venue' && dropHiddenFormats(previous, next)),
      }
    })
  }

  function setDate(date: string) {
    update(() => ({ date }))
  }

  function setSort(sort: SessionSort) {
    update(() => ({ sort }))
  }

  function setPage(page: number) {
    navigate({ search: (previous) => ({ ...previous, page: page > 1 ? page : undefined }) })
  }

  /** Clears every filter but the date. */
  function clear() {
    update(() => ({ venue: undefined, format: undefined, language: undefined, band: undefined }))
  }

  const activeCount =
    (filters.venues?.length ?? 0) +
    (filters.formats?.length ?? 0) +
    (filters.languages?.length ?? 0) +
    (filters.bands?.length ?? 0)

  return { filters, toggle, setDate, setSort, setPage, clear, activeCount }
}
