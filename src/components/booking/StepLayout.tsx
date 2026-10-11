import type { ReactNode } from 'react'
import { StepIndicator } from './StepIndicator'
import type { BookingStep } from './types'

type StepLayoutProps = {
  step: BookingStep
  onSeatsClick: () => void
  main: ReactNode
  aside: ReactNode
}

/** Step indicator and scrollable main content on the left, summary panel on the right. */
export function StepLayout({ step, onSeatsClick, main, aside }: StepLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 gap-5">
      <div className="flex min-h-0 w-180 shrink-0 flex-col gap-8">
        <StepIndicator step={step} onSeatsClick={onSeatsClick} />
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">{main}</div>
      </div>
      <div className="w-px self-stretch rounded-full bg-card" />
      <aside className="flex w-80.25 shrink-0 flex-col gap-3">{aside}</aside>
    </div>
  )
}
