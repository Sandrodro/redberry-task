/** "4 September 2026" */
export function formatFullDate(date: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(new Date(`${date}T00:00`))
  const part = (type: string) => parts.find((item) => item.type === type)?.value
  return `${part('day')} ${part('month')} ${part('year')}`
}
