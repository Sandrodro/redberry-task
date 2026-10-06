import { Typography } from '../../../core/Typography'

export type BookingStep = 'seats' | 'checkout'

type StepIndicatorProps = {
  step: BookingStep
  /** Going back keeps the hold, the seats are still the user's. */
  onSeatsClick: () => void
}

const base = 'flex flex-1 items-center justify-center rounded-full px-4 py-2.5'

export function StepIndicator({ step, onSeatsClick }: StepIndicatorProps) {
  return (
    <div className="flex gap-2 rounded-full bg-card">
      <button
        type="button"
        disabled={step === 'seats'}
        onClick={onSeatsClick}
        className={`${base} enabled:cursor-pointer ${step === 'seats' ? 'bg-brand' : ''}`}
      >
        <Typography variant="labelS">SEATS</Typography>
      </button>
      <span className={`${base} ${step === 'checkout' ? 'bg-brand' : ''}`}>
        <Typography variant="labelS">CHECKOUT</Typography>
      </span>
    </div>
  )
}
