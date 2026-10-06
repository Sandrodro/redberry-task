import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Typography } from '@/components/core/Typography'

type HomeSectionProps = {
  title: string
  children: ReactNode
}

export function HomeSection({ title, children }: HomeSectionProps) {
  return (
    <section className="flex flex-col gap-6 px-17.5">
      <div className="flex items-end justify-between">
        <Typography variant="h1" as="h2" className="uppercase">
          {title}
        </Typography>
        <Link to="/sessions">
          <Typography variant="labelM" className="text-brand">
            See all
          </Typography>
        </Link>
      </div>
      {children}
    </section>
  )
}
