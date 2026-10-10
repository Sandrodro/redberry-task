import stripes from '@/assets/icons/seat-held-stripes.svg'
import { Typography } from '@/components/core/Typography'
import { SeatButtonState } from './types'

type SeatButtonProps = {
  label: string
  state: SeatButtonState
  onClick?: () => void
}

/** `--seat-size` is set by `SeatMap`, so every seat in a hall has the same size. */
const base =
  'relative flex size-(--seat-size) shrink-0 items-center justify-center overflow-hidden rounded-[10px]'

export function SeatButton({ label, state, onClick }: SeatButtonProps) {
  if (state === SeatButtonState.Sold) {
    return (
      <span className={`${base} bg-card text-subtle`}>
        <Typography variant="h3" as="span">
          {label}
        </Typography>
      </span>
    )
  }

  if (state === SeatButtonState.Unavailable) {
    return (
      <span className={`${base} border border-dashed border-subtle text-subtle`}>
        <Typography variant="h3" as="span">
          {label}
        </Typography>
      </span>
    )
  }

  if (state === SeatButtonState.Held) {
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
    state === SeatButtonState.Selected
      ? 'border border-background bg-brand'
      : 'border border-subtle bg-card shadow-[0px_1px_2px_0px_var(--shadow)]'

  return (
    <button
      type="button"
      aria-pressed={state === SeatButtonState.Selected}
      onClick={onClick}
      className={`${base} ${styles} cursor-pointer text-white`}
    >
      <Typography variant="h3" as="span">
        {label}
      </Typography>
    </button>
  )
}
