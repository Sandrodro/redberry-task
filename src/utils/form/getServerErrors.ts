import { ApiError } from '@/api/client'

/** Splits a failed request into field messages (a 422 with `errors`) and a form message (any other error). */
export function getServerErrors(error: unknown) {
  if (!(error instanceof ApiError)) {
    return { fieldErrors: {} as Record<string, string | undefined>, message: undefined }
  }

  const fieldErrors: Record<string, string | undefined> = Object.fromEntries(
    Object.entries(error.errors ?? {}).map(([field, messages]) => [field, messages[0]]),
  )
  return { fieldErrors, message: error.errors ? undefined : error.message }
}
