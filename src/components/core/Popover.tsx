import { Popover as PopoverPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cx } from '@/utils/cx'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export function PopoverContent({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  const base =
    'z-50 rounded-xl bg-card p-3 text-white shadow-[0_2px_8px_var(--shadow)] ring-1 ring-subtle outline-none'

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align="start"
        sideOffset={8}
        className={cx(base, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
