import { getUpcomingDates } from '../../../utils/getUpcomingDates'
import { Typography } from '../../core/Typography'

const DAY_COUNT = 7

type DateStripProps = {
  /** Selected date as "YYYY-MM-DD". Defaults to today. */
  value?: string
  onChange: (date: string) => void
}

export function DateStrip({ value, onChange }: DateStripProps) {
  const dates = getUpcomingDates(DAY_COUNT)
  const selected = value ?? dates[0].value

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2 [scrollbar-color:var(--color-subtle)_transparent] [scrollbar-width:thin]">
      {dates.map((date) => (
        <button
          key={date.value}
          type="button"
          aria-pressed={date.value === selected}
          onClick={() => onChange(date.value)}
          className={`flex h-13.5 w-9.25 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg px-1.5 py-2.5 shadow-[0_1px_2px_var(--shadow)] ${date.value === selected ? 'bg-brand' : 'bg-elevated'}`}
        >
          <Typography variant="labelS">{date.weekday}</Typography>
          <Typography variant="labelS">{date.day}</Typography>
        </button>
      ))}
    </div>
  )
}
