import { createFormHook } from '@tanstack/react-form'
import { FormInput } from '@/components/FormInput'
import { fieldContext, formContext } from './formContext'

/** `useForm` with field components bound to the form: `<form.AppField name="email">{(field) => <field.Input label="Email" />}</form.AppField>`. */
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { Input: FormInput },
  formComponents: {},
})
