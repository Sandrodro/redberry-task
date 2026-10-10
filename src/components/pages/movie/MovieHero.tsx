import type { MovieDetail } from '@/api/types'
import TimerIcon from '@/assets/icons/timer.svg?react'
import { Badge } from '@/components/core/Badge'
import { Cover } from '@/components/core/Cover'
import { Typography } from '@/components/core/Typography'

export function MovieHero({ movie }: { movie: MovieDetail }) {
  return (
    <section className="relative -mt-28 h-141.75 overflow-hidden">
      <Cover src={movie.backdropUrl} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[5px]" />
      <div className="absolute left-15 top-38 flex items-end gap-8.5">
        <Cover
          src={movie.posterUrl}
          className="h-93.5 w-72.25 rounded-[14px] shadow-[0_4px_64px_var(--shadow)]"
        />
        <div className="flex w-145 flex-col items-start gap-3.75 py-2.25">
          <Badge tone="brand" className="px-2.5! uppercase">
            {movie.isComingSoon ? 'Coming soon' : 'Now playing'}
          </Badge>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.75">
              <Typography variant="display" className="uppercase">
                {movie.title}
              </Typography>
              <Typography variant="bodyM" className="w-140">
                {movie.synopsis}
              </Typography>
            </div>
            <div className="flex gap-1.75">
              <Badge tone="brand" className="px-2.5!">
                {movie.ageRating.code}
              </Badge>
              <Badge className="px-2.5!" icon={<TimerIcon className="size-3.5" />}>
                {movie.runtimeMinutes} Min
              </Badge>
              {movie.genres.map((genre) => (
                <Badge key={genre.id} className="px-2.5! uppercase">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
