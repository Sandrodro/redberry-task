import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState, type Key, type ReactNode } from 'react'

type SliderProps<T> = {
  items: T[]
  getKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  className?: string
}

/** Draggable row that scrolls freely. A fade on the right edge shows there is more to scroll. */
export function Slider<T>({ items, getKey, renderItem, className = '' }: SliderProps<T>) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const [canScrollNext, setCanScrollNext] = useState(true)

  const syncCanScrollNext = useCallback(() => {
    if (emblaApi) setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('scroll', syncCanScrollNext).on('reInit', syncCanScrollNext)
    return () => {
      emblaApi.off('scroll', syncCanScrollNext).off('reInit', syncCanScrollNext)
    }
  }, [emblaApi, syncCanScrollNext])

  return (
    <div className={`relative ${className}`}>
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex gap-4.25">
          {items.map((item) => (
            <div key={getKey(item)} className="min-w-0 flex-none">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent transition-opacity ${canScrollNext ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
