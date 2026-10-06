import { Tabs as TabsPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { Typography } from './Typography'

export const Tabs = TabsPrimitive.Root
export const TabsContent = TabsPrimitive.Content

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  const base = 'flex gap-8'

  return <TabsPrimitive.List className={className ? `${base} ${className}` : base} {...props} />
}

export function TabsTrigger({ className, children, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  const base = 'group flex cursor-pointer flex-col gap-3.5 text-muted data-[state=active]:text-white'

  return (
    <TabsPrimitive.Trigger className={className ? `${base} ${className}` : base} {...props}>
      <span className="px-0.5">
        <Typography variant="labelM">{children}</Typography>
      </span>
      <span className="h-0.5 w-full rounded-t-xs group-data-[state=active]:bg-brand" />
    </TabsPrimitive.Trigger>
  )
}
