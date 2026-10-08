import { useId, type ComponentPropsWithoutRef } from 'react'
import { Field, type FieldProps } from './Field'

type InputProps = Omit<FieldProps, 'id'> & ComponentPropsWithoutRef<'input'>

export function Input({ label, error, success, hint, icon, className, ...props }: InputProps) {
  const id = useId()

  return (
    <Field id={id} label={label} error={error} success={success} hint={hint} icon={icon}>
      <input
        id={id}
        aria-invalid={!!error}
        className={`min-w-0 flex-1 bg-transparent text-xs font-semibold outline-none placeholder:text-muted disabled:text-muted ${error ? 'text-brand' : 'text-white'} ${className ?? ''}`}
        {...props}
      />
    </Field>
  )
}
