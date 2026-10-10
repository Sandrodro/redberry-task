import type { ComponentProps } from 'react'
import { useFieldContext } from '@/hooks/formContext'
import { getFieldError } from '@/utils/form/getFieldError'
import { Input } from './core/Input'

type FormInputProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'onBlur' | 'error'>

/** An `Input` connected to the form field. A field with a value and no errors gets the success check, unless `success` is passed. */
export function FormInput({ success, ...props }: FormInputProps) {
  const field = useFieldContext<string>()

  return (
    <Input
      {...props}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={getFieldError(field)}
      success={success ?? (field.state.value !== '' && field.state.meta.errors.length === 0)}
    />
  )
}
