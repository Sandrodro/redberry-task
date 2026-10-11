import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { Typography } from './Typography'

const tones = {
  brand: 'bg-brand/10 text-brand',
  neutral: 'bg-white/10 text-white',
  elevated: 'bg-elevated text-white',
} as const

const sizes = {
  md: { box: 'px-3 py-1.5', label: 'labelS' },
  sm: { box: 'px-1.75 py-1', label: 'labelS' },
  xs: { box: 'px-3 py-1.5', label: 'labelXS' },
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
  const base = `flex items-center gap-1 rounded-full ${sizes[size].box} ${tones[tone]}`

  return (
    <span className={cx(base, className)} {...props}>
      {icon}
      <Typography variant={sizes[size].label}>{children}</Typography>
    </span>
  )
}
