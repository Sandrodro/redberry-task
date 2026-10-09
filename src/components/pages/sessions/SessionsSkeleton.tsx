import { Fragment } from 'react'
import { Skeleton } from '@/components/core/Skeleton'

const ROW_COUNT = 3
const CARDS_PER_ROW = 4

/** Stands in for the list of `MovieSessionsRow` while the first page of sessions loads. */
export function SessionsSkeleton() {
  return (
    <div role="status" aria-label="Loading sessions" className="flex flex-col gap-8">
      {Array.from({ length: ROW_COUNT }, (_, row) => (
        <Fragment key={row}>
          {row > 0 && <hr className="h-px border-0 bg-elevated" />}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-14 shrink-0" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-5 w-56" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: CARDS_PER_ROW }, (_, card) => (
                <Skeleton key={card} className="h-26 w-63 shrink-0 rounded-2xl" />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
