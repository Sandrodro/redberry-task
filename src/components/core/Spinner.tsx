import { cx } from '@/utils/cx'

export function Spinner({ className }: { className?: string }) {
  const base = 'block size-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand'

  return <span role="status" aria-label="Loading" className={cx(base, className)} />
}
