import type { AgeRating, ProfileInput, User } from '@/api/types'
import { getAge, MIN_AGE } from '@/utils/schemas/profileSchema'

/** The form fields as the server has them. Empty fields are empty strings, because inputs do not take `null`. */
export function getProfileFormValues(user: User) {
  return {
    fullName: user.fullName ?? '',
    mobileNumber: user.mobileNumber ?? '',
    dateOfBirth: user.dateOfBirth ?? '',
    preferredVenueId: user.preferredVenue?.id ?? null,
  } satisfies ProfileInput
}

export function getAgeNote(dateOfBirth: string, ageRatings: AgeRating[] = []) {
  if (!dateOfBirth) return undefined
  const age = getAge(dateOfBirth)
  if (age < MIN_AGE) return undefined
  const blocked = ageRatings.filter((rating) => rating.minAge > age).map((rating) => rating.code)
  if (blocked.length === 0) return undefined
  const list = new Intl.ListFormat('en', { type: 'disjunction' }).format(blocked)
  return `You cannot buy tickets for ${list} titles`
}
