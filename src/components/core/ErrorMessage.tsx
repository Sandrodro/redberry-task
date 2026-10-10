import { Typography } from './Typography'

/** A message under a field or a form. Nothing is shown when there is no message. */
export function ErrorMessage({ message }: { message?: string | null }) {
  if (!message) return null

  return (
    <Typography variant="labelS" className="text-brand">
      {message}
    </Typography>
  )
}
