/** "Tue 15 Sep" */
export function formatShortDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).formatToParts(date)
  const part = (type: string) => parts.find((item) => item.type === type)?.value
  return `${part('weekday')} ${part('day')} ${part('month')}`
}
