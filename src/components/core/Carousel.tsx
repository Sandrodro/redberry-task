import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState, type Key, type ReactNode } from 'react'
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?react'

const AUTOPLAY_DELAY_MS = 6000

function ArrowButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
      className="flex size-13.5 cursor-pointer items-center justify-center rounded-full bg-background/20 text-white transition-[background-color,box-shadow] hover:bg-background hover:shadow-[0_2px_8px_var(--shadow)]"
    >
      <ArrowLeftIcon className={direction === 'next' ? 'rotate-180' : ''} />
    </button>
  )
}

type CarouselProps<T> = {
  items: T[]
  getKey: (item: T) => Key
  renderSlide: (item: T) => ReactNode
  autoplayDelay?: number
  className?: string
}

/** Full width fading slider with autoplay, a progress bar and arrow buttons. */
export function Carousel<T>({
  items,
  getKey,
  renderSlide,
  autoplayDelay = AUTOPLAY_DELAY_MS,
  className = '',
}: CarouselProps<T>) {
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const syncSelectedIndex = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', syncSelectedIndex).on('reInit', syncSelectedIndex)
    return () => {
      emblaApi.off('select', syncSelectedIndex).off('reInit', syncSelectedIndex)
    }
  }, [emblaApi, syncSelectedIndex])

  return (
    <section
      aria-roledescription="carousel"
      className={`relative overflow-hidden ${className}`}
    >
      <div ref={viewportRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {items.map((item, index) => (
            <div
              key={getKey(item)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
              className="h-full min-w-0 flex-[0_0_100%]"
            >
              {renderSlide(item)}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-16.75 bottom-10.5 flex items-center gap-5">
        <div className="flex flex-1 items-center gap-1.75">
          {items.map((item, index) => (
            <button
              key={getKey(item)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className="flex-1 cursor-pointer py-2"
            >
              <span
                className={`block h-0.75 rounded-full ${index === selectedIndex ? 'bg-brand' : 'bg-white'}`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <ArrowButton direction="prev" onClick={() => emblaApi?.scrollPrev()} />
          <ArrowButton direction="next" onClick={() => emblaApi?.scrollNext()} />
        </div>
      </div>
    </section>
  )
}
