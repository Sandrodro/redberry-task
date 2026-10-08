import { useId, type ComponentPropsWithoutRef } from 'react'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import { Field, type FieldProps } from './Field'

type SelectProps = Omit<FieldProps, 'id' | 'icon' | 'success'> & ComponentPropsWithoutRef<'select'>

export function Select({ label, error, hint, className, children, ...props }: SelectProps) {
  const id = useId()
  const empty = props.value === ''

  return (
    <Field
      id={id}
      label={label}
      error={error}
      hint={hint}
      icon={<ArrowIcon className="pointer-events-none size-4 shrink-0 text-white" />}
    >
      <select
        id={id}
        aria-invalid={!!error}
        className={`min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-xs font-semibold outline-none [color-scheme:dark] ${error ? 'text-brand' : empty ? 'text-muted' : 'text-white'} ${className ?? ''}`}
        {...props}
      >
        {children}
      </select>
    </Field>
  )
}
