import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cx } from '@/utils/cx'

/** Not modal, so opening the menu does not lock the page scroll. */
export function DropdownMenu(props: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root modal={false} {...props} />
}

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export function DropdownMenuContent({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const base = 'z-10 outline-none'

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={8}
        className={cx(base, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  const base =
    'flex w-full cursor-pointer items-center gap-2 py-2.5 pl-5 text-left outline-none data-highlighted:bg-card'

  return <DropdownMenuPrimitive.Item className={cx(base, className)} {...props} />
}

export function DropdownMenuSeparator() {
  return <DropdownMenuPrimitive.Separator className="h-px w-full bg-white/10" />
}
