import type { Seat, TicketTypeSlug } from '../../../../api/types'

export type SelectedSeat = {
  seat: Seat
  /** Section name from the seat map ("Stalls"), shown as the seat type. */
  sectionName: string
  ticketType: TicketTypeSlug
}
