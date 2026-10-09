import { z } from 'zod'
import type { FilterOptions, SessionsFilters, TimeBand } from '@/api/types'

/** The URL parser turns a value like `123` into a number, so a number is turned back into a string. */
const text = z.coerce.string().optional().catch(undefined)

/** A comma separated list as it appears in the URL, e.g. "galleria,batumi". */
export function parseList(value: string | undefined) {
  return value ? value.split(',') : undefined
}

/** URL search params of the sessions page, e.g. ?venue=galleria,batumi&date=2026-11-14&sort=price_asc&page=2. A bad value falls back to "not set". */
export const sessionsSearchSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .catch(undefined),
  venue: text,
  format: text,
  language: text,
  band: text,
  search: z.coerce.string().max(100).optional().catch(undefined),
  sort: text,
  page: z.number().int().positive().optional().catch(undefined),
})

export type SessionsSearch = z.infer<typeof sessionsSearchSchema>

/** Keeps only the values `/filter-options` knows. `/sessions` rejects the whole request with 422 for an unknown value. */
function keepKnown(value: string | undefined, known: string[]) {
  const list = parseList(value)?.filter((item) => known.includes(item))
  return list?.length ? list : undefined
}

/** Formats offered by the selected venues. All formats when no venue is selected. */
export function getAvailableFormats(options: FilterOptions, venueSlugs: string[] | undefined) {
  if (!venueSlugs?.length) return options.formats
  const offered = new Set(
    options.venues
      .filter((venue) => venueSlugs.includes(venue.slug))
      .flatMap((venue) => venue.formats.map((format) => format.slug)),
  )
  return options.formats.filter((format) => offered.has(format.slug))
}

/** The shape `/sessions` expects: lists are arrays, and every value is one the API knows. */
export function toSessionsFilters(search: SessionsSearch, options: FilterOptions): SessionsFilters {
  const venues = keepKnown(
    search.venue,
    options.venues.map((venue) => venue.slug),
  )
  return {
    date: search.date,
    venues,
    formats: keepKnown(
      search.format,
      getAvailableFormats(options, venues).map((format) => format.slug),
    ),
    languages: keepKnown(
      search.language,
      options.languages.map((language) => language.slug),
    ),
    bands: keepKnown(
      search.band,
      options.timeBands.map((band) => band.id),
    ) as TimeBand[] | undefined,
    search: search.search,
    sort: options.sorts.find((sort) => sort.id === search.sort)?.id,
    page: search.page,
  }
}
