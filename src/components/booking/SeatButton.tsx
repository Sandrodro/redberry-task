import stripes from '@/assets/icons/seat-held-stripes.svg'
import { Typography } from '@/components/core/Typography'

export type SeatButtonState = 'available' | 'selected' | 'sold' | 'held' | 'unavailable'

type SeatButtonProps = {
  label: string
  state: SeatButtonState
  onClick?: () => void
}

/** `--seat-size` is set by `SeatMap`, so every seat in a hall has the same size. */
const base =
  'relative flex size-(--seat-size) shrink-0 items-center justify-center overflow-hidden rounded-[10px]'

export function SeatButton({ label, state, onClick }: SeatButtonProps) {
  if (state === 'sold') {
    return (
      <span className={`${base} bg-card text-subtle`}>
        <Typography variant="h3" as="span">
          {label}
        </Typography>
      </span>
    )
  }

  if (state === 'unavailable') {
    return (
      <span className={`${base} border border-dashed border-subtle text-subtle`}>
        <Typography variant="h3" as="span">
          {label}
        </Typography>
      </span>
    )
  }

  if (state === 'held') {
    return (
      <span className={`${base} bg-card text-muted`}>
        <img
          src={stripes}
          alt=""
          className="absolute size-[83.649px] max-w-none -rotate-[37.44deg]"
        />
        <Typography variant="h3" as="span" className="relative">
          {label}
        </Typography>
      </span>
    )
  }

  const styles =
    state === 'selected'
      ? 'border border-background bg-brand'
      : 'border border-subtle bg-card shadow-[0px_1px_2px_0px_var(--shadow)]'

  return (
    <button
      type="button"
      aria-pressed={state === 'selected'}
      onClick={onClick}
      className={`${base} ${styles} cursor-pointer text-white`}
    >
      <Typography variant="h3" as="span">
        {label}
      </Typography>
    </button>
  )
}
