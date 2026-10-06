import type { AnyFieldApi } from '@tanstack/react-form'

/** Shows the client error once the field was blurred. Falls back to the server error. */
export function getFieldError(field: AnyFieldApi, serverError?: string) {
  const issue = field.state.meta.isBlurred ? field.state.meta.errors[0] : undefined
  return issue?.message ?? serverError
}
