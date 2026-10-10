import type { AnyFieldApi } from '@tanstack/react-form'

/** Shows the client error once the field was blurred. Falls back to the server error set by `setServerErrors`. */
export function getFieldError(field: AnyFieldApi): string | undefined {
  const { isBlurred, errors, errorMap } = field.state.meta
  const issue = isBlurred ? errors.find((error) => typeof error !== 'string') : undefined
  return issue?.message ?? errorMap.onSubmit
}
