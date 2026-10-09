import type { ProfileInput, User } from '@/api/types'

/** The form fields as the server has them. Empty fields are empty strings, because inputs do not take `null`. */
export function getProfileFormValues(user: User) {
  return {
    fullName: user.fullName ?? '',
    mobileNumber: user.mobileNumber ?? '',
    dateOfBirth: user.dateOfBirth ?? '',
    preferredVenueId: user.preferredVenue?.id ?? null,
  } satisfies ProfileInput
}
