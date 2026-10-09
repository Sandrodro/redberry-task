import type { Session } from '@/api/types'

const MS_PER_MINUTE = 60_000

/** True when the session start plus the film length is in the past. `date` and `time` are the venue's wall clock, read as local time like the other dates in the app. */
export function hasSessionEnded({ date, time, movie }: Pick<Session, 'date' | 'time' | 'movie'>) {
  const start = new Date(`${date}T${time}`)
  return start.getTime() + movie.runtimeMinutes * MS_PER_MINUTE < Date.now()
}
