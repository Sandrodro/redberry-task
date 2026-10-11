/** Formats a date and joins the parts in a fixed order, so the output does not depend on the locale's punctuation. */
function formatParts(
  date: Date,
  options: Intl.DateTimeFormatOptions,
  order: Intl.DateTimeFormatPartTypes[],
) {
  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date)
  return order.map((type) => parts.find((item) => item.type === type)?.value).join(' ')
}

/** A "YYYY-MM-DD" string as a local date. */
export function fromDateString(date: string) {
  return new Date(`${date}T00:00`)
}

/** A local date as a "YYYY-MM-DD" string. */
export function toDateString(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** "15 Sep", or "15 September" with `month: 'long'` */
export function formatDayMonth(date: string, month: 'short' | 'long' = 'short') {
  return formatParts(fromDateString(date), { day: 'numeric', month }, ['day', 'month'])
}

/** "4 September 2026" */
export function formatFullDate(date: string) {
  return formatParts(fromDateString(date), { day: 'numeric', month: 'long', year: 'numeric' }, [
    'day',
    'month',
    'year',
  ])
}

/** "Tuesday 15 September" */
export function formatLongDate(date: Date) {
  return formatParts(date, { weekday: 'long', day: 'numeric', month: 'long' }, [
    'weekday',
    'day',
    'month',
  ])
}

/** "Tue 15 Sep" */
export function formatShortDate(date: Date) {
  return formatParts(date, { weekday: 'short', day: 'numeric', month: 'short' }, [
    'weekday',
    'day',
    'month',
  ])
}
