/** "Tuesday 15 September" */
export function formatLongDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).formatToParts(date)
  const part = (type: string) => parts.find((item) => item.type === type)?.value
  return `${part('weekday')} ${part('day')} ${part('month')}`
}
