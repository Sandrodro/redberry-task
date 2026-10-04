import type { ComponentPropsWithoutRef } from 'react'
import { Typography } from './Typography'

type TabProps = { active?: boolean } & ComponentPropsWithoutRef<'button'>

export function Tab({ active, children, ...props }: TabProps) {
  return (
    <button
      type="button"
      className={`flex cursor-pointer flex-col gap-3.5 ${active ? 'text-white' : 'text-muted'}`}
      {...props}
    >
      <span className="px-0.5">
        <Typography variant="labelM">{children}</Typography>
      </span>
      <span className={`h-0.5 w-full rounded-t-xs ${active ? 'bg-brand' : ''}`} />
    </button>
  )
}
