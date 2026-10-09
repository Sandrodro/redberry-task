import type { ReactNode } from 'react'
import type { MovieDetail } from '@/api/types'
import { formatFullDate } from '@/utils/formatDate'
import { Typography } from '@/components/core/Typography'
import { WarningNote } from '@/components/WarningNote'

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.75">
      <Typography variant="labelS" className="uppercase text-muted">
        {label}
      </Typography>
      <Typography variant="labelM">{children}</Typography>
    </div>
  )
}

export function MovieDetails({ movie }: { movie: MovieDetail }) {
  return (
    <aside className="flex w-110.25 shrink-0 flex-col gap-4.25 px-6.5">
      <Typography variant="h2">Details</Typography>
      {movie.director && <DetailRow label="Director">{movie.director}</DetailRow>}
      {movie.cast && <DetailRow label="Main cast">{movie.cast}</DetailRow>}
      <DetailRow label="Duration">{movie.runtimeMinutes} minutes</DetailRow>
      <DetailRow label="Release date">{formatFullDate(movie.releaseDate)}</DetailRow>
      <DetailRow label="Formats">{movie.formats.map((format) => format.name).join(', ')}</DetailRow>
      <DetailRow label="From">₾{movie.fromPrice}</DetailRow>
      <WarningNote title="Rating note">
        <div className="flex gap-1.75">
          <Typography variant="labelS" as="span">
            {movie.ageRating.code}
          </Typography>
          <Typography variant="bodyS" className="min-w-0 flex-1">
            {movie.ageRating.description}
          </Typography>
        </div>
      </WarningNote>
    </aside>
  )
}
