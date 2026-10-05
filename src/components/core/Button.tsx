import type { ComponentPropsWithoutRef } from 'react'
import { buttonStyles, type ButtonStyleProps } from './buttonStyles'
import { Typography } from './Typography'

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<'button'>

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  const base = buttonStyles({ variant, size })

  return (
    <button className={className ? `${base} ${className}` : base} {...props}>
      <Typography variant="button">{children}</Typography>
    </button>
  )
}
