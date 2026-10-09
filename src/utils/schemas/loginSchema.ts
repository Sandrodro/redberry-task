import { z } from 'zod'
import { checkoutSchema } from './checkoutSchema'

/** Shortest password the API accepts. */
const MIN_PASSWORD_LENGTH = 3

export const loginSchema = z.object({
  email: checkoutSchema.shape.email,
  password: z
    .string()
    .min(1, 'Password is required')
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
})

export type LoginValues = z.input<typeof loginSchema>
