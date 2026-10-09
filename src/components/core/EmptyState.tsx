import type { ReactNode } from 'react'
import { Typography } from './Typography'

type EmptyStateProps = {
  title: string
  description?: string
  /** A way out, such as a button or a link. */
  children?: ReactNode
  className?: string
}

/** A list with nothing in it: what is missing, and where to go from here. */
export function EmptyState({ title, description, children, className }: EmptyStateProps) {
  const base = 'flex flex-col items-start gap-3'

  return (
    <div className={className ? `${base} ${className}` : base}>
      <div className="flex flex-col gap-1.5">
        <Typography variant="labelM">{title}</Typography>
        {description && (
          <Typography variant="bodyM" className="text-muted">
            {description}
          </Typography>
        )}
      </div>
      {children}
    </div>
  )
}
