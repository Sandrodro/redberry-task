import { cx } from '@/utils/cx'

/** A pulsing block that stands in for content that is loading. Size and shape come from `className`. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx('animate-pulse rounded-lg bg-card', className)} />
}
