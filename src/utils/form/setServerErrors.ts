import type { AnyFormApi } from '@tanstack/react-form'
import { getServerErrors } from './getServerErrors'

/** Puts the field messages of a failed request into the form. A field clears its message when the user enters a valid value. */
export function setServerErrors(form: AnyFormApi, error: unknown) {
  form.setErrorMap({ onSubmit: { fields: getServerErrors(error).fieldErrors } })
}
