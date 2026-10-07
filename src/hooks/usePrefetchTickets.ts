import { noop, useQueryClient } from '@tanstack/react-query'
import { ticketsQueryOptions } from '@/api/queries/tickets/useTicketsData'

/** Tickets loaded on hover are reused for this long, so moving over the target again does not fetch again. */
const PREFETCH_STALE_MS = 30_000

/** Returns a function that loads both ticket tabs into the cache. Call it on hover of a link to My Tickets. */
export function usePrefetchTickets() {
  const queryClient = useQueryClient()

  return () => {
    for (const filter of ['upcoming', 'past'] as const) {
      void queryClient.query({ ...ticketsQueryOptions(filter), staleTime: PREFETCH_STALE_MS }).catch(noop)
    }
  }
}
