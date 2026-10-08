import { Tooltip as TooltipPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { Typography } from './Typography'

/** Mount it above the tooltips, once per page that uses them. */
export function TooltipProvider(props: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={200} {...props} />
}

export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  const base =
    'z-50 max-w-70 rounded-lg bg-elevated px-3 py-1.5 text-white shadow-[0_2px_8px_var(--shadow)]'

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={6}
        className={className ? `${base} ${className}` : base}
        {...props}
      >
        <Typography variant="bodyS">{children}</Typography>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
