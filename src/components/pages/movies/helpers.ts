import type { Session } from '@/api/types'

/** Groups a venue's sessions by hall, in the order the halls first appear. */
export function groupByHall(sessions: Session[]) {
  const halls = new Map<number, { id: number; name: string; sessions: Session[] }>()
  for (const session of sessions) {
    const hall = halls.get(session.hall.id) ?? {
      id: session.hall.id,
      name: session.hall.name,
      sessions: [],
    }
    hall.sessions.push(session)
    halls.set(hall.id, hall)
  }
  return Array.from(halls.values())
}
