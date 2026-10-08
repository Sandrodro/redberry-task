import type { ComponentPropsWithoutRef } from 'react'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import { Typography } from './Typography'

/** First and last page, the current page and its neighbours. "gap" stands for the pages left out. */
function getPageItems(page: number, lastPage: number) {
  const pages = [...new Set([1, page - 1, page, page + 1, lastPage])]
    .filter((item) => item >= 1 && item <= lastPage)
    .sort((a, b) => a - b)

  const items: (number | 'gap')[] = []
  pages.forEach((item, index) => {
    const previous = pages[index - 1]
    if (previous !== undefined && item - previous === 2) items.push(previous + 1)
    else if (previous !== undefined && item - previous > 2) items.push('gap')
    items.push(item)
  })
  return items
}

function PageButton({ className = '', ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      className={`flex size-10 cursor-pointer items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    />
  )
}

type PaginationProps = {
  page: number
  lastPage: number
  onChange: (page: number) => void
}

export function Pagination({ page, lastPage, onChange }: PaginationProps) {
  if (lastPage <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <PageButton
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="bg-card"
        >
          <ArrowIcon className="size-4 rotate-90" />
        </PageButton>
        {getPageItems(page, lastPage).map((item, index) =>
          item === 'gap' ? (
            <span
              key={`gap-${index}`}
              className="flex size-10 items-center justify-center text-muted"
            >
              <Typography variant="labelM" as="span">
                ...
              </Typography>
            </span>
          ) : (
            <PageButton
              key={item}
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onChange(item)}
              className={item === page ? 'bg-brand' : 'text-muted'}
            >
              <Typography variant="labelM" as="span">
                {item}
              </Typography>
            </PageButton>
          ),
        )}
        <PageButton
          aria-label="Next page"
          disabled={page >= lastPage}
          onClick={() => onChange(page + 1)}
          className="bg-card"
        >
          <ArrowIcon className="size-4 -rotate-90" />
        </PageButton>
      </div>
      <Typography variant="bodyS" className="text-muted">
        Page {page} of {lastPage}
      </Typography>
    </nav>
  )
}
