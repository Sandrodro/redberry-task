import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Typography } from './Typography'

const tones = {
  brand: 'bg-brand/10 text-brand',
  neutral: 'bg-white/10 text-white',
} as const

type BadgeProps = {
  tone?: keyof typeof tones
  icon?: ReactNode
} & ComponentPropsWithoutRef<'span'>

export function Badge({ tone = 'neutral', icon, className, children, ...props }: BadgeProps) {
  const base = `flex items-center gap-1 rounded-full px-3 py-1.5 ${tones[tone]}`

  return (
    <span className={className ? `${base} ${className}` : base} {...props}>
      {icon}
      <Typography variant="labelS">{children}</Typography>
    </span>
  )
}
