import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/core/ButtonLink'
import { Typography } from '@/components/core/Typography'

type SearchEmptyStateProps = {
  icon: ReactNode
  title: string
  description: string
  onBrowse: () => void
}

export function SearchEmptyState({ icon, title, description, onBrowse }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-6 pb-7 pt-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>
      <Typography variant="labelM" as="p" className="mt-2 max-w-full truncate">
        {title}
      </Typography>
      <Typography variant="bodyM" className="w-95 text-center text-muted">
        {description}
      </Typography>
      <ButtonLink to="/sessions" variant="tertiary" className="mt-2.5" onClick={onBrowse}>
        Browse all sessions
      </ButtonLink>
    </div>
  )
}
