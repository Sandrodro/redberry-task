/** How many days the date pickers offer. */
export const UPCOMING_DAY_COUNT = 7

export type DateOption = { value: string; weekday: string; day: number }

const weekdayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' })

function pad(number: number) {
  return String(number).padStart(2, '0')
}

/** Today and the days after it. `value` is "YYYY-MM-DD" in local time, the format `/sessions` expects. */
export function getUpcomingDates(count: number): DateOption[] {
  const today = new Date()
  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    return {
      value: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      weekday: weekdayFormat.format(date),
      day: date.getDate(),
    }
  })
}

/** The first upcoming day that has sessions, or today when none has. */
export function getFirstAvailableDate(availableDates: string[]) {
  const dates = getUpcomingDates(UPCOMING_DAY_COUNT)
  return (dates.find((date) => availableDates.includes(date.value)) ?? dates[0]).value
}
