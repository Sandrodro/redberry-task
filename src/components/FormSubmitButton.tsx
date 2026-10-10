import type { ComponentProps } from 'react'
import { useFormContext } from '@/hooks/formContext'
import { Button } from './core/Button'

type FormSubmitButtonProps = {
  isPending: boolean
  /** The label while the request runs. */
  pendingLabel: string
  /** Also disables the button until a field differs from its default value. */
  requireChange?: boolean
} & Omit<ComponentProps<typeof Button>, 'type'>

/** A submit button connected to the form. It is disabled while the form is invalid or the request runs. */
export function FormSubmitButton({
  isPending,
  pendingLabel,
  requireChange,
  disabled,
  children,
  ...props
}: FormSubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => state.canSubmit && (!requireChange || !state.isDefaultValue)}
    >
      {(canSubmit) => (
        <Button type="submit" disabled={!canSubmit || isPending || disabled} {...props}>
          {isPending ? pendingLabel : children}
        </Button>
      )}
    </form.Subscribe>
  )
}
