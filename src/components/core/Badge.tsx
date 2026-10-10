import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { Typography } from './Typography'

const tones = {
  brand: 'bg-brand/10 text-brand',
  neutral: 'bg-white/10 text-white',
  elevated: 'bg-elevated text-white',
} as const

const sizes = {
  md: 'px-3 py-1.5',
  sm: 'px-1.75 py-1',
} as const

type BadgeProps = {
  tone?: keyof typeof tones
  size?: keyof typeof sizes
  icon?: ReactNode
} & ComponentPropsWithoutRef<'span'>

export function Badge({
  tone = 'neutral',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const base = `flex items-center gap-1 rounded-full ${sizes[size]} ${tones[tone]}`

  return (
    <span className={cx(base, className)} {...props}>
      {icon}
      <Typography variant="labelS">{children}</Typography>
    </span>
  )
}
