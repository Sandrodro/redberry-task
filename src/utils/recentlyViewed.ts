import { z } from 'zod'
import { storage } from './storage'

const RECENTLY_VIEWED_KEY = 'recentlyViewed'

/** How many films the list keeps. The home page shows all of them. */
export const MAX_RECENTLY_VIEWED = 5

const slugsSchema = z.array(z.string())

/** Slugs of the films the user opened, newest first. A missing or broken value gives an empty list. */
export function getRecentlyViewed() {
  try {
    return slugsSchema.parse(JSON.parse(storage.get(RECENTLY_VIEWED_KEY) ?? '[]'))
  } catch {
    return []
  }
}

/** Puts `slug` first. A film that is already in the list moves to the front, and the oldest ones drop off. */
export function addRecentlyViewed(slug: string) {
  const slugs = [slug, ...getRecentlyViewed().filter((item) => item !== slug)]
  storage.set(RECENTLY_VIEWED_KEY, JSON.stringify(slugs.slice(0, MAX_RECENTLY_VIEWED)))
}
