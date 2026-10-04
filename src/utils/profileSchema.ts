import { z } from 'zod'

/** Youngest age that can have an account. */
export const MIN_AGE = 12

/** Age in full years on `today`. A negative age means the date is in the future. */
export function getAge(dateOfBirth: string, today = new Date()) {
  const [year, month, day] = dateOfBirth.split('-').map(Number)
  const birthdayPassed =
    today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day)
  return today.getFullYear() - year - (birthdayPassed ? 0 : 1)
}

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  // Spaces are allowed while typing ("555 123 456") and removed from the result.
  mobileNumber: z
    .string()
    .transform((value) => value.replace(/\s/g, ''))
    .pipe(
      z
        .string()
        .min(1, 'Mobile number is required')
        .refine((value) => value.startsWith('5'), 'Georgian mobile numbers must start with 5')
        .refine((value) => value.length === 9, 'Mobile number must be exactly 9 digits')
        .refine(
          (value) => /^\d+$/.test(value),
          'Please enter a valid Georgian mobile number (9 digits starting with 5)',
        ),
    ),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .superRefine((value, context) => {
      if (!value) return
      const age = getAge(value)
      if (age < 0) {
        context.addIssue({ code: 'custom', message: 'Please enter a valid date of birth' })
      } else if (age < MIN_AGE) {
        context.addIssue({
          code: 'custom',
          message: `You must be at least ${MIN_AGE} years old to create an account`,
        })
      }
    }),
  preferredVenueId: z.number().nullable(),
})
