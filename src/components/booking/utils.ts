import type { SeatHold, SeatMap } from '@/api/types'
import type { SelectedSeat } from './types'

/** Width of the left column in `StepLayout` (`w-180`). */
const MAP_WIDTH = 720
const MAX_SEAT_SIZE = 52
const ROW_GAP = 8
const ROW_LABEL_WIDTH = 20
const AISLE_WIDTH = 16

/** One seat size for the whole hall: the largest that fits the widest row, up to the design size. */
export function getSeatSize(map: SeatMap) {
  const sizes = map.sections.flatMap((section) =>
    section.rows.map((row) => {
      const aisles = row.seats.filter((seat) => seat.aisleAfter).length
      const items = row.seats.length + aisles + 1
      const fixedWidth = ROW_LABEL_WIDTH + aisles * AISLE_WIDTH + (items - 1) * ROW_GAP
      return Math.floor((MAP_WIDTH - fixedWidth) / Math.max(row.seats.length, 1))
    }),
  )
  return Math.min(MAX_SEAT_SIZE, ...sizes)
}

/** "2 x Adult, 1 x Child", in the order the types first appear. */
export function formatTickets(seats: { ticketType: { name: string } }[]) {
  const counts = new Map<string, number>()
  seats.forEach(({ ticketType }) =>
    counts.set(ticketType.name, (counts.get(ticketType.name) ?? 0) + 1),
  )
  return [...counts].map(([name, count]) => `${count} x ${name}`).join(', ')
}

/** "4:05" for 245 seconds. */
export function formatTimer(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

/** Rounds to 2 decimals, so 14.399999999999999 shows as 14.4. */
export function roundPrice(value: number) {
  return Math.round(value * 100) / 100
}

/** Child and student prices are the session price times the ratio from `/filter-options`. */
export function getTicketPrice(sessionPrice: number, priceRatio: number) {
  return roundPrice(sessionPrice * priceRatio)
}

/** Where the id of a session's live hold is kept, so the booking can resume after the modal closes or the page reloads. */
export function getHoldStorageKey(sessionId: number) {
  return `hold:${sessionId}`
}

/** The seats of a hold as the user selected them, found on the seat map. A seat the map no longer has is left out. */
export function getSelectedSeats(map: SeatMap, holdSeats: SeatHold['seats']): SelectedSeat[] {
  const seats = map.sections.flatMap((section) =>
    section.rows.flatMap((row) => row.seats.map((seat) => ({ seat, sectionName: section.name }))),
  )
  return holdSeats.flatMap(({ seatId, ticketType }) => {
    const found = seats.find((item) => item.seat.id === seatId)
    return found ? [{ ...found, ticketType: ticketType.slug }] : []
  })
}
