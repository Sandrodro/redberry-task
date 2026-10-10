import { SeatState, type Seat, type TicketTypeSlug } from '@/api/types'

export const BookingStep = { Seats: 'seats', Checkout: 'checkout' } as const
export type BookingStep = (typeof BookingStep)[keyof typeof BookingStep]

export const SeatButtonState = { ...SeatState, Selected: 'selected' } as const
export type SeatButtonState = (typeof SeatButtonState)[keyof typeof SeatButtonState]

export type SelectedSeat = {
  seat: Seat
  /** Section name from the seat map ("Stalls"), shown as the seat type. */
  sectionName: string
  ticketType: TicketTypeSlug
}
