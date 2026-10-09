import type { Movie } from '@/api/types'
import { Slider } from '@/components/core/Slider'
import { Typography } from '@/components/core/Typography'
import { RecentlyViewedCard } from './RecentlyViewedCard'

export function RecentlyViewed({ movies }: { movies: Movie[] }) {
  return (
    <section className="flex flex-col gap-5 px-17.5 pt-2.25">
      <Typography variant="h1" as="h2">
        Recently viewed
      </Typography>
      <Slider
        items={movies}
        getKey={(movie) => movie.id}
        renderItem={(movie) => <RecentlyViewedCard movie={movie} />}
        gapClassName="gap-5"
      />
    </section>
  )
}
