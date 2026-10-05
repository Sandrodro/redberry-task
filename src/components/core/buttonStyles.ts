const variants = {
  primary: 'bg-brand text-white',
  secondary: 'bg-white text-background',
  tertiary: 'bg-white/10 text-white',
} as const

const sizes = {
  md: 'px-5.5 py-3.25',
  sm: 'px-5.5 py-2.5',
} as const

export type ButtonStyleProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function buttonStyles({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) {
  return `flex cursor-pointer items-center justify-center rounded-full ${sizes[size]} disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]}`
}
