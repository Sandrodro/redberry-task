import type { ComponentPropsWithoutRef } from 'react'
import { Typography } from './Typography'

const variants = {
  primary: 'bg-brand text-white',
  secondary: 'bg-white text-background',
  tertiary: 'bg-white/10 text-white',
} as const

const sizes = {
  md: 'px-5.5 py-3.25',
  sm: 'px-5.5 py-2.5',
} as const

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
} & ComponentPropsWithoutRef<'button'>

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const base = `flex cursor-pointer items-center justify-center rounded-full ${sizes[size]} disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]}`

  return (
    <button className={className ? `${base} ${className}` : base} {...props}>
      <Typography variant="button">{children}</Typography>
    </button>
  )
}
