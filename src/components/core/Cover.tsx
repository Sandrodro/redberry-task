import { cx } from '@/utils/cx'

type CoverProps = {
  src?: string | null
  /** Size, shape and position. Both the image and the empty block get it. */
  className?: string
}

/** A poster or backdrop image. A film without one gets an empty block of the same size. */
export function Cover({ src, className }: CoverProps) {
  if (!src) return <div className={cx('bg-elevated', className)} />

  return <img src={src} alt="" draggable={false} className={cx('object-cover', className)} />
}
