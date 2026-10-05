/** "15 Sep", or "15 September" with `month: 'long'` */
export function formatDayMonth(date: string, month: 'short' | 'long' = 'short') {
  const parts = new Intl.DateTimeFormat('en-US', { day: 'numeric', month }).formatToParts(
    new Date(`${date}T00:00`),
  )
  const part = (type: string) => parts.find((item) => item.type === type)?.value
  return `${part('day')} ${part('month')}`
}
