import { z } from 'zod'
import { profileSchema } from './profileSchema'

/** True when the `MM/YY` card expiry is this month or later. A card is valid through the end of its month. */
function isExpiryInFuture(expiry: string, today = new Date()) {
  const [month, year] = expiry.split('/').map(Number)
  const expiryYear = 2000 + year
  return (
    expiryYear > today.getFullYear() ||
    (expiryYear === today.getFullYear() && month >= today.getMonth() + 1)
  )
}

export const checkoutSchema = z.object({
  fullName: profileSchema.shape.fullName,
  email: z.string().trim().min(1, 'Email is required').pipe(z.email('Please enter a valid email')),
  mobileNumber: profileSchema.shape.mobileNumber,
  // Spaces are allowed while typing ("4242 4242 4242 4242") and removed from the result.
  cardNumber: z
    .string()
    .transform((value) => value.replace(/\s/g, ''))
    .pipe(
      z
        .string()
        .min(1, 'Card number is required')
        .regex(/^\d{16}$/, 'Card number must be exactly 16 digits'),
    ),
  expiry: z
    .string()
    .min(1, 'Expiry is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use the MM/YY format')
    .refine((value) => isExpiryInFuture(value), 'Card has expired'),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(/^\d{3}$/, 'CVV must be exactly 3 digits'),
})

export type CheckoutValues = z.input<typeof checkoutSchema>
