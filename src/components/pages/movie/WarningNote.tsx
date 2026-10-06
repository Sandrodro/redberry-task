import type { ReactNode } from 'react'
import { Typography } from '@/components/core/Typography'

type WarningNoteProps = {
  title?: string
  children: ReactNode
}

export function WarningNote({ title, children }: WarningNoteProps) {
  return (
    <div className="flex flex-col gap-1.75 rounded-xl bg-warning/10 px-3.25 py-2.25 text-warning">
      {title && (
        <Typography variant="labelS" className="uppercase">
          {title}
        </Typography>
      )}
      {children}
    </div>
  )
}
