import { useId, useState } from 'react'
import CalendarIcon from '@/assets/icons/calendar.svg?react'
import { formatFullDate, fromDateString, toDateString } from '@/utils/formatters/formatDate'
import { Calendar } from './Calendar'
import { Field, type FieldProps } from './Field'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

type DatePickerProps = Omit<FieldProps, 'id' | 'icon' | 'success'> & {
  /** "YYYY-MM-DD", or an empty string when no date is picked. */
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  /** Earliest year the dropdown offers. */
  startYear?: number
}

/** A date field that opens a calendar. Only past dates and today can be picked. */
export function DatePicker({
  label,
  error,
  hint,
  value,
  onChange,
  onBlur,
  placeholder = 'Select date',
  startYear = 1900,
}: DatePickerProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [today] = useState(() => new Date())
  const selected = value ? fromDateString(value) : undefined

  return (
    <Field
      id={id}
      label={label}
      error={error}
      hint={hint}
      icon={<CalendarIcon className="pointer-events-none size-4 shrink-0 text-white" />}
    >
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) onBlur?.()
        }}
      >
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            aria-invalid={!!error}
            className={`min-w-0 flex-1 cursor-pointer self-stretch bg-transparent text-left text-xs font-semibold outline-none ${error ? 'text-brand' : selected ? 'text-white' : 'text-muted'}`}
          >
            {selected ? formatFullDate(value) : placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={selected}
            defaultMonth={selected}
            startMonth={new Date(startYear, 0)}
            endMonth={today}
            disabled={{ after: today }}
            onSelect={(date) => {
              if (!date) return
              onChange(toDateString(date))
              setOpen(false)
              onBlur?.()
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
