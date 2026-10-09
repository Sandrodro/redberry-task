import type { AgeRating } from '@/api/types'
import { useAuth } from './useAuth'

/** True when the logged in user is younger than the film's age requirement. A guest or a user without an age is not. */
export function useIsUnderage(ageRating: AgeRating) {
  const { user } = useAuth()
  return !!user && user.age !== null && user.age < ageRating.minAge
}
