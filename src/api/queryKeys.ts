import { createQueryKeys } from '@lukemorales/query-key-factory'
import type { SessionsFilters, TicketFilter } from './types'

export const authKeys = createQueryKeys('auth', {
  me: null,
})

export const filterOptionsKeys = createQueryKeys('filterOptions', {
  all: null,
})

export const moviesKeys = createQueryKeys('movies', {
  search: (q: string) => [q],
  nowPlaying: (limit?: number) => [{ limit }],
  comingSoon: (limit?: number) => [{ limit }],
  featured: null,
  detail: (slug: string) => [slug],
  sessions: (slug: string, date?: string) => [slug, { date }],
})

export const sessionsKeys = createQueryKeys('sessions', {
  list: (filters: SessionsFilters) => [filters],
  seats: (id: number) => [id],
})

export const holdsKeys = createQueryKeys('holds', {
  detail: (id: string) => [id],
})

export const ticketsKeys = createQueryKeys('tickets', {
  list: (filter?: TicketFilter) => [{ filter }],
})
