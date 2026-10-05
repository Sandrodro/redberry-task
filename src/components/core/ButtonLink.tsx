import { Link, type LinkComponentProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { buttonStyles, type ButtonStyleProps } from './buttonStyles'
import { Typography } from './Typography'

type ButtonLinkProps = ButtonStyleProps & {
  icon?: ReactNode
  children: ReactNode
} & Omit<LinkComponentProps<'a'>, 'children'>

export function ButtonLink({ variant, size, icon, className, children, ...props }: ButtonLinkProps) {
  const base = `${buttonStyles({ variant, size })} gap-1`

  return (
    <Link className={className ? `${base} ${className}` : base} {...props}>
      {icon}
      <Typography variant="button">{children}</Typography>
    </Link>
  )
}
