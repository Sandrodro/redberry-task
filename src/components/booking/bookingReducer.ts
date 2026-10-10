import type { Order, Seat, SeatHold, TicketTypeSlug } from '@/api/types'
import { BookingStep, type SelectedSeat } from './types'

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

export const BookingActionType = {
  Resumed: 'resumed',
  HoldResumed: 'holdResumed',
  NoticeChanged: 'noticeChanged',
  SeatToggled: 'seatToggled',
  TicketTypeChanged: 'ticketTypeChanged',
  Held: 'held',
  SeatsLost: 'seatsLost',
  HoldExpired: 'holdExpired',
  BackToSeats: 'backToSeats',
  Paid: 'paid',
} as const

export type BookingAction =
  | { type: typeof BookingActionType.Resumed; isHoldExpired: boolean }
  | { type: typeof BookingActionType.HoldResumed; hold: SeatHold; selected: SelectedSeat[] }
  | { type: typeof BookingActionType.NoticeChanged; notice: string | null }
  | {
      type: typeof BookingActionType.SeatToggled
      seat: Seat
      sectionName: string
      maxSeats: number
    }
  | {
      type: typeof BookingActionType.TicketTypeChanged
      seatId: number
      ticketType: TicketTypeSlug
    }
  | { type: typeof BookingActionType.Held; hold: SeatHold }
  | { type: typeof BookingActionType.SeatsLost; codes: string[] }
  | { type: typeof BookingActionType.HoldExpired }
  | { type: typeof BookingActionType.BackToSeats }
  | { type: typeof BookingActionType.Paid; order: Order }

export function getInitialBookingState(hasSavedHold: boolean): BookingState {
  return {
    step: BookingStep.Seats,
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
    case BookingActionType.Resumed:
      return {
        ...state,
        isResumed: true,
        notice: action.isHoldExpired ? HOLD_EXPIRED_MESSAGE : null,
      }
    case BookingActionType.HoldResumed:
      return {
        ...state,
        isResumed: true,
        hold: action.hold,
        selected: action.selected,
        step: BookingStep.Checkout,
      }
    case BookingActionType.NoticeChanged:
      return { ...state, notice: action.notice }
    case BookingActionType.SeatToggled: {
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
    case BookingActionType.TicketTypeChanged:
      return {
        ...state,
        selected: state.selected.map((item) =>
          item.seat.id === action.seatId ? { ...item, ticketType: action.ticketType } : item,
        ),
      }
    case BookingActionType.Held:
      return { ...state, hold: action.hold, step: BookingStep.Checkout }
    case BookingActionType.SeatsLost:
      // The seats show as sold and leave the selection. The rest of the selection stays.
      return {
        ...state,
        lostCodes: [...new Set([...state.lostCodes, ...action.codes])],
        selected: state.selected.filter((item) => !action.codes.includes(item.seat.code)),
        hold: null,
        step: BookingStep.Seats,
        notice: `Seats ${action.codes.join(', ')} were just taken. Your other seats are still selected.`,
      }
    case BookingActionType.HoldExpired:
      return {
        ...state,
        hold: null,
        selected: [],
        lostCodes: [],
        step: BookingStep.Seats,
        notice: HOLD_EXPIRED_MESSAGE,
      }
    case BookingActionType.BackToSeats:
      return { ...state, step: BookingStep.Seats }
    case BookingActionType.Paid:
      return { ...state, order: action.order }
  }
}
