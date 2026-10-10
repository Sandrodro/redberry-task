import type { ComponentPropsWithoutRef } from 'react'
import { cx } from '@/utils/cx'
import { buttonStyles, type ButtonStyleProps } from './buttonStyles'
import { Typography } from './Typography'

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<'button'>

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cx(buttonStyles({ variant, size }), className)} {...props}>
      <Typography variant="button">{children}</Typography>
    </button>
  )
}
