import type { Order, Seat, SeatHold, TicketTypeSlug } from '@/api/types'
import type { BookingStep } from './StepIndicator'
import type { SelectedSeat } from './types'

const HOLD_EXPIRED_MESSAGE = 'Your hold time expired. Please re-select your seats.'

export type BookingState = {
  step: BookingStep
  selected: SelectedSeat[]
  hold: SeatHold | null
  order: Order | null
  notice: string | null
  /** Codes of seats that another buyer took. They show as sold. */
  lostCodes: string[]
  /** False until a hold saved from an earlier opening is either restored or ruled out. */
  isResumed: boolean
}

export type BookingAction =
  | { type: 'resumed'; isHoldExpired: boolean }
  | { type: 'holdResumed'; hold: SeatHold; selected: SelectedSeat[] }
  | { type: 'noticeChanged'; notice: string | null }
  | { type: 'seatToggled'; seat: Seat; sectionName: string; maxSeats: number }
  | { type: 'ticketTypeChanged'; seatId: number; ticketType: TicketTypeSlug }
  | { type: 'held'; hold: SeatHold }
  | { type: 'seatsLost'; codes: string[] }
  | { type: 'holdExpired' }
  | { type: 'backToSeats' }
  | { type: 'paid'; order: Order }

export function getInitialBookingState(hasSavedHold: boolean): BookingState {
  return {
    step: 'seats',
    selected: [],
    hold: null,
    order: null,
    notice: null,
    lostCodes: [],
    isResumed: !hasSavedHold,
  }
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'resumed':
      return {
        ...state,
        isResumed: true,
        notice: action.isHoldExpired ? HOLD_EXPIRED_MESSAGE : null,
      }
    case 'holdResumed':
      return {
        ...state,
        isResumed: true,
        hold: action.hold,
        selected: action.selected,
        step: 'checkout',
      }
    case 'noticeChanged':
      return { ...state, notice: action.notice }
    case 'seatToggled': {
      const { seat, sectionName, maxSeats } = action
      if (state.selected.some((item) => item.seat.id === seat.id)) {
        return {
          ...state,
          notice: null,
          selected: state.selected.filter((item) => item.seat.id !== seat.id),
        }
      }
      if (state.selected.length >= maxSeats) {
        return { ...state, notice: `You can select up to ${maxSeats} seats per order.` }
      }
      return {
        ...state,
        notice: null,
        selected: [...state.selected, { seat, sectionName, ticketType: 'adult' }],
      }
    }
    case 'ticketTypeChanged':
      return {
        ...state,
        selected: state.selected.map((item) =>
          item.seat.id === action.seatId ? { ...item, ticketType: action.ticketType } : item,
        ),
      }
    case 'held':
      return { ...state, hold: action.hold, step: 'checkout' }
    case 'seatsLost':
      // The seats show as sold and leave the selection. The rest of the selection stays.
      return {
        ...state,
        lostCodes: [...new Set([...state.lostCodes, ...action.codes])],
        selected: state.selected.filter((item) => !action.codes.includes(item.seat.code)),
        hold: null,
        step: 'seats',
        notice: `Seats ${action.codes.join(', ')} were just taken. Your other seats are still selected.`,
      }
    case 'holdExpired':
      return {
        ...state,
        hold: null,
        selected: [],
        lostCodes: [],
        step: 'seats',
        notice: HOLD_EXPIRED_MESSAGE,
      }
    case 'backToSeats':
      return { ...state, step: 'seats' }
    case 'paid':
      return { ...state, order: action.order }
  }
}
