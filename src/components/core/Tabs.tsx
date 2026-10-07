import { Tabs as TabsPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { Typography } from './Typography'

type TabsVariant = 'underline' | 'pill'

export const Tabs = TabsPrimitive.Root
export const TabsContent = TabsPrimitive.Content

const listStyles = {
  underline: 'flex gap-8',
  pill: 'flex w-fit rounded-xl bg-card p-1.25',
} as const

const triggerStyles = {
  underline: 'group flex cursor-pointer flex-col gap-3.5 text-muted data-[state=active]:text-white',
  pill: 'group flex cursor-pointer items-center gap-2 rounded-[10px] px-3.5 py-1.75 text-muted data-[state=active]:bg-elevated data-[state=active]:text-white',
} as const

export function TabsList({
  variant = 'underline',
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List> & { variant?: TabsVariant }) {
  const base = listStyles[variant]

  return <TabsPrimitive.List className={className ? `${base} ${className}` : base} {...props} />
}

export function TabsTrigger({
  variant = 'underline',
  count,
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger> & { variant?: TabsVariant; count?: number }) {
  const base = triggerStyles[variant]

  return (
    <TabsPrimitive.Trigger className={className ? `${base} ${className}` : base} {...props}>
      {variant === 'pill' ? (
        <>
          <Typography variant="labelM">{children}</Typography>
          {count !== undefined && (
            <Typography variant="labelS" className="text-subtle group-data-[state=active]:text-white">
              {count}
            </Typography>
          )}
        </>
      ) : (
        <>
          <span className="px-0.5">
            <Typography variant="labelM">{children}</Typography>
          </span>
          <span className="h-0.5 w-full rounded-t-xs group-data-[state=active]:bg-brand" />
        </>
      )}
    </TabsPrimitive.Trigger>
  )
}
