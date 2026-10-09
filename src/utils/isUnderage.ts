import type { AgeRating, User } from '@/api/types'

/** True when the user is younger than the film's age requirement. A guest or a user without an age is not. */
export function isUnderage(user: User | null | undefined, ageRating: AgeRating) {
  return !!user && user.age !== null && user.age < ageRating.minAge
}
