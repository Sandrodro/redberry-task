import { Typography } from './core/Typography'

const dotColors = { warning: 'bg-warning', success: 'bg-success' } as const

type AvatarProps = {
  src?: string | null
  initials: string
  dot?: keyof typeof dotColors
  className?: string
}

export function Avatar({ src, initials, dot, className = 'size-10' }: AvatarProps) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-lg bg-card ${className}`}
    >
      {src ? (
        <img src={src} alt="" className="absolute inset-0 size-full rounded-lg object-cover" />
      ) : (
        <Typography variant="labelS">{initials}</Typography>
      )}
      {dot && (
        <span
          className={`absolute bottom-0 right-0 size-2 rounded-full ring-1 ring-background ${dotColors[dot]}`}
        />
      )}
    </span>
  )
}
