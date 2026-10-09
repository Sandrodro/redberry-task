import { z } from 'zod'
import { loginSchema } from './loginSchema'

/** Shortest username the API accepts. */
const MIN_USERNAME_LENGTH = 3

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .min(MIN_USERNAME_LENGTH, `Username must be at least ${MIN_USERNAME_LENGTH} characters`),
    email: loginSchema.shape.email,
    password: loginSchema.shape.password,
    password_confirmation: z.string().min(1, 'Please confirm your password'),
    // `AvatarUpload` rejects a file with a wrong type or size, so only a valid file gets here.
    avatar: z.instanceof(File).optional(),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

export type SignUpValues = z.input<typeof signUpSchema>
