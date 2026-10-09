import { Button } from './Button'
import { Typography } from './Typography'

type ErrorStateProps = {
  message: string
  onRetry: () => void
  /** Disables the button while the retry runs. */
  isRetrying?: boolean
  className?: string
}

/** A failed request: what went wrong, and a button that sends it again. */
export function ErrorState({ message, onRetry, isRetrying, className }: ErrorStateProps) {
  const base = 'flex flex-col items-start gap-3'

  return (
    <div role="alert" className={className ? `${base} ${className}` : base}>
      <Typography variant="bodyM" className="text-muted">
        {message}
      </Typography>
      <Button variant="tertiary" size="sm" onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? 'Trying again...' : 'Try again'}
      </Button>
    </div>
  )
}
