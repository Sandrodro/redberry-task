import type { AgeRating } from '@/api/types'
import { isUnderage } from '@/utils/isUnderage'
import { useAuth } from './useAuth'

/** True when the logged in user is younger than the film's age requirement. */
export function useIsUnderage(ageRating: AgeRating) {
  const { user } = useAuth()
  return isUnderage(user, ageRating)
}
