import type { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/core/Tooltip'

/** Wraps a disabled session card, because a disabled button does not show a tooltip by itself. */
export function EndedSessionTooltip({ ended, children }: { ended: boolean; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="block">{children}</span>
      </TooltipTrigger>
      {ended && <TooltipContent>The screening has already ended</TooltipContent>}
    </Tooltip>
  )
}
