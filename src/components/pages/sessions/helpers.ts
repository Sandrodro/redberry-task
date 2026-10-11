/** "Morning (before 12:00)" becomes the label "Morning" and the hint "before 12:00". */
export function splitTimeBandLabel(label: string) {
  const match = label.match(/^(.*?)\s*\((.*)\)$/)
  return match ? { label: match[1], hint: match[2] } : { label, hint: undefined }
}

export function formatCount(total: number) {
  if (total === 0) return 'No sessions found'
  return `Showing ${total} ${total === 1 ? 'session' : 'sessions'}`
}
