/** A pulsing block that stands in for content that is loading. Size and shape come from `className`. */
export function Skeleton({ className }: { className?: string }) {
  const base = 'animate-pulse rounded-lg bg-card'

  return <div aria-hidden className={className ? `${base} ${className}` : base} />
}
