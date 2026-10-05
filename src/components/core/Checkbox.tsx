import type { ComponentPropsWithoutRef } from 'react'
import CheckboxCheckedIcon from '../../assets/icons/checkbox-checked.svg?react'
import { Typography } from './Typography'

type CheckboxProps = {
  label: string
  /** Muted text after the label, e.g. a city. */
  hint?: string
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'className'>

export function Checkbox({ label, hint, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="size-4.5 shrink-0 rounded-[5px] border-[1.5px] border-subtle peer-checked:hidden peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white" />
      <span className="hidden shrink-0 rounded-[5px] peer-checked:block peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
        <CheckboxCheckedIcon />
      </span>
      <span className="flex items-center gap-1.25">
        <Typography variant="labelM">{label}</Typography>
        {hint && (
          <Typography variant="bodyS" className="text-muted">
            · {hint}
          </Typography>
        )}
      </span>
    </label>
  )
}
