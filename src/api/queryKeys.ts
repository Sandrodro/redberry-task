import { createQueryKeys } from '@lukemorales/query-key-factory'
import type { SessionsFilters } from './types'

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
  detail: (id: number) => [id],
  seats: (id: number) => [id],
})

export const holdsKeys = createQueryKeys('holds', {
  detail: (holdId: string) => [holdId],
})

export const ticketsKeys = createQueryKeys('tickets', {
  list: (filter?: 'upcoming' | 'past') => [{ filter }],
})
