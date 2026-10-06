import { createContext, useContext } from 'react'
import type { Session } from '@/api/types'

type BookingModalContextValue = {
  /** Opens the booking modal for a session. A guest logs in first, a user with an incomplete profile goes to the profile page. */
  openBooking: (session: Session) => void
}

export const BookingModalContext = createContext<BookingModalContextValue | null>(null)

export function useBookingModal() {
  const context = useContext(BookingModalContext)
  if (!context) throw new Error('useBookingModal must be used inside BookingModalProvider')
  return context
}
