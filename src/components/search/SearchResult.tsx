import { Link } from '@tanstack/react-router'
import type { Movie } from '@/api/types'
import { Cover } from '@/components/core/Cover'
import { Typography } from '@/components/core/Typography'

/** Shows the part of the title that matches the query in white. */
function HighlightedTitle({ title, query }: { title: string; query: string }) {
  const start = title.toLowerCase().indexOf(query.toLowerCase())
  if (start === -1) return <span className="text-white">{title}</span>

  const end = start + query.length
  return (
    <>
      {title.slice(0, start)}
      <span className="text-white">{title.slice(start, end)}</span>
      {title.slice(end)}
    </>
  )
}

type SearchResultProps = {
  movie: Movie
  query: string
  onSelect: () => void
}

export function SearchResult({ movie, query, onSelect }: SearchResultProps) {
  return (
    <Link
      to="/movies/$slug"
      params={{ slug: movie.slug }}
      onClick={onSelect}
      className="flex h-18 items-center gap-3.5 rounded-[10px] py-2 pl-2.5 pr-5 hover:bg-white/10"
    >
      <Cover src={movie.posterUrl} className="h-14 w-10 shrink-0 rounded-md" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.75">
        <Typography variant="labelM" as="p" className="truncate text-muted">
          <HighlightedTitle title={movie.title} query={query} />
        </Typography>
        <Typography variant="bodyS" className="capitalize text-muted">
          {movie.kind} · {movie.ageRating.code} · {movie.runtimeMinutes} min
        </Typography>
      </div>
      <Typography
        variant="labelM"
        className={`shrink-0 whitespace-nowrap ${movie.isComingSoon ? 'text-warning' : ''}`}
      >
        {movie.isComingSoon ? 'Coming Soon' : `from ₾${movie.fromPrice}`}
      </Typography>
    </Link>
  )
}
