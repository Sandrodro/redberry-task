import { getUpcomingDates, UPCOMING_DAY_COUNT } from '@/utils/getUpcomingDates'
import { Typography } from '@/components/core/Typography'

const sizes = {
  sm: {
    strip: 'gap-1.5 pb-2',
    button: 'h-13.5 w-9.25 gap-1.5 rounded-lg px-1.5 py-2.5 shadow-[0_1px_2px_var(--shadow)]',
    idle: 'bg-elevated',
    day: 'labelS',
  },
  lg: {
    strip: 'gap-1.75',
    button: 'size-20 gap-1.5 rounded-2xl p-2.5',
    idle: 'bg-card',
    day: 'h3',
  },
} as const

type DateStripProps = {
  /** Selected date as "YYYY-MM-DD". Defaults to today. */
  value?: string
  onChange: (date: string) => void
  /** Called when the pointer enters a date, so the caller can load its data before the click. */
  onHover?: (date: string) => void
  size?: keyof typeof sizes
  /** When given, dates not in this list ("YYYY-MM-DD") are disabled. */
  availableDates?: string[]
}

export function DateStrip({ value, onChange, onHover, size = 'sm', availableDates }: DateStripProps) {
  const dates = getUpcomingDates(UPCOMING_DAY_COUNT)
  const selected = value ?? dates[0].value
  const style = sizes[size]

  return (
    <div
      className={`flex overflow-x-auto [scrollbar-color:var(--color-subtle)_transparent] [scrollbar-width:thin] ${style.strip}`}
    >
      {dates.map((date) => (
        <button
          key={date.value}
          type="button"
          aria-pressed={date.value === selected}
          disabled={availableDates ? !availableDates.includes(date.value) : false}
          onClick={() => onChange(date.value)}
          onPointerEnter={() => onHover?.(date.value)}
          className={`flex shrink-0 cursor-pointer flex-col items-center justify-center disabled:cursor-not-allowed disabled:opacity-40 ${style.button} ${date.value === selected ? 'bg-brand' : style.idle}`}
        >
          <Typography variant="labelS">{date.weekday}</Typography>
          <Typography variant={style.day} as="span">
            {date.day}
          </Typography>
        </button>
      ))}
    </div>
  )
}
