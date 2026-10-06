import { useParams } from '@tanstack/react-router'
import { useMovieData } from '@/api/queries/movies/useMovieData'
import { Spinner } from '@/components/core/Spinner'
import { TooltipProvider } from '@/components/core/Tooltip'
import { Typography } from '@/components/core/Typography'
import { MovieDetails } from './MovieDetails'
import { MovieHero } from './MovieHero'
import { MovieSessions } from './MovieSessions'

export function MoviePage() {
  const { slug } = useParams({ from: '/movies/$slug' })
  const { data: movie, isPending, isError } = useMovieData(slug)

  if (isPending) {
    return (
      <div className="flex justify-center py-40">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <Typography variant="bodyM" className="px-12.75 py-40 text-muted">
        This film could not be loaded.
      </Typography>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-8.5 pb-16">
        <MovieHero movie={movie} />
        <div className="flex gap-2.5 px-12.75">
          <MovieSessions movie={movie} />
          <MovieDetails movie={movie} />
        </div>
      </div>
    </TooltipProvider>
  )
}
