import type { ReactNode } from 'react'
import AlertIcon from '../../assets/icons/alert.svg?react'
import CheckIcon from '../../assets/icons/check.svg?react'
import { Typography } from './Typography'

export type FieldProps = {
  id: string
  label: string
  error?: string
  success?: boolean
  hint?: string
  /** Trailing icon, shown when there is no error or success state. */
  icon?: ReactNode
}

/** Label, field box and messages around a form control. */
export function Field({
  id,
  label,
  error,
  success,
  hint,
  icon,
  children,
}: FieldProps & { children: ReactNode }) {
  const fieldState = error
    ? 'ring-brand'
    : 'ring-transparent hover:ring-subtle hover:not-focus-within:bg-elevated focus-within:ring-subtle'

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2.5">
        <label htmlFor={id}>
          <Typography variant="labelS" className={error ? 'text-brand' : undefined}>
            {label}
          </Typography>
        </label>
        <div
          className={`relative flex h-10 items-center gap-2 rounded-xl bg-card px-4 ring-1 ring-inset ${fieldState}`}
        >
          {children}
          {error ? (
            <span className="flex size-4 shrink-0 items-center justify-center text-brand">
              <AlertIcon className="size-3" />
            </span>
          ) : success ? (
            <CheckIcon className="size-4 shrink-0 text-success" />
          ) : (
            icon
          )}
        </div>
      </div>
      {error ? (
        <Typography variant="labelS" className="text-brand">
          {error}
        </Typography>
      ) : (
        hint && (
          <Typography variant="labelS" className="text-muted">
            {hint}
          </Typography>
        )
      )}
    </div>
  )
}
