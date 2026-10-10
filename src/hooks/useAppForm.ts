import { createFormHook } from '@tanstack/react-form'
import { FormInput } from '@/components/FormInput'
import { FormSubmitButton } from '@/components/FormSubmitButton'
import { fieldContext, formContext } from './formContext'

/**
 * `useForm` with components bound to the form: `<form.AppField name="email">{(field) => <field.Input label="Email" />}</form.AppField>`.
 * Form components such as `SubmitButton` go inside `<form.AppForm>`.
 */
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { Input: FormInput },
  formComponents: { SubmitButton: FormSubmitButton },
})
