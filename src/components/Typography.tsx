import type { ComponentPropsWithoutRef, ElementType } from 'react'

const variants = {
  display: { tag: 'h1', className: 'text-display font-extrabold leading-[normal]' },
  h1: { tag: 'h1', className: 'text-h1 font-extrabold leading-[normal]' },
  h2: { tag: 'h2', className: 'text-h2 font-extrabold leading-[normal]' },
  h3: { tag: 'h3', className: 'text-h3 font-extrabold leading-[normal]' },
  button: { tag: 'span', className: 'text-sm font-extrabold leading-[normal]' },
  labelM: { tag: 'span', className: 'text-sm font-semibold leading-[normal]' },
  labelS: { tag: 'span', className: 'text-xs font-semibold leading-[normal]' },
  overline: {
    tag: 'span',
    className: 'text-xs font-semibold uppercase leading-[normal] tracking-[0.06em]',
  },
  bodyL: { tag: 'p', className: 'text-base font-normal leading-[1.3]' },
  bodyM: { tag: 'p', className: 'text-sm font-normal leading-[1.3]' },
  bodyS: { tag: 'p', className: 'text-xs font-normal leading-[1.3]' },
} as const

export type TypographyVariant = keyof typeof variants

type TypographyProps = {
  variant: TypographyVariant
  as?: ElementType
} & ComponentPropsWithoutRef<'p'>

export function Typography({ variant, as, className, ...props }: TypographyProps) {
  const { tag, className: variantClassName } = variants[variant]
  const Component = as ?? tag

  return <Component className={className ? `${variantClassName} ${className}` : variantClassName} {...props} />
}
