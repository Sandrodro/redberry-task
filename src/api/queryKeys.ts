import type { SessionsFilters, TicketFilter } from './types'

export const authKeys = {
  all: ['auth'] as const,
  me: ['auth', 'me'] as const,
}

export const filterOptionsKeys = {
  all: ['filterOptions'] as const,
}

export const moviesKeys = {
  all: ['movies'] as const,
  search: (q: string) => [...moviesKeys.all, 'search', q] as const,
  nowPlaying: (limit?: number) => [...moviesKeys.all, 'nowPlaying', { limit }] as const,
  comingSoon: (limit?: number) => [...moviesKeys.all, 'comingSoon', { limit }] as const,
  featured: ['movies', 'featured'] as const,
  detail: (slug: string) => [...moviesKeys.all, 'detail', slug] as const,
  sessions: (slug: string, date?: string) =>
    [...moviesKeys.all, 'sessions', slug, { date }] as const,
}

export const sessionsKeys = {
  all: ['sessions'] as const,
  list: (filters: SessionsFilters) => [...sessionsKeys.all, 'list', filters] as const,
  seats: (id: number) => [...sessionsKeys.all, 'seats', id] as const,
}

export const holdsKeys = {
  all: ['holds'] as const,
  detail: (id: string) => [...holdsKeys.all, 'detail', id] as const,
}

export const ticketsKeys = {
  all: ['tickets'] as const,
  list: (filter?: TicketFilter) => [...ticketsKeys.all, 'list', { filter }] as const,
}
