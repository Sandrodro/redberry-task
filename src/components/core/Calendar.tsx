import { useEffect, useRef, type ChangeEvent } from 'react'
import {
  DayPicker,
  type DayButtonProps,
  type DayPickerProps,
  type DropdownProps,
} from 'react-day-picker'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import { cx } from '@/utils/cx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'

/** `DayPicker` styled with the app tokens. Month and year dropdowns by default. */
export function Calendar({ classNames, components, ...props }: DayPickerProps) {
  const navButton =
    'flex size-9 cursor-pointer items-center justify-center rounded-lg select-none hover:bg-elevated aria-disabled:cursor-default aria-disabled:opacity-50 aria-disabled:hover:bg-transparent'

  return (
    <DayPicker
      showOutsideDays
      fixedWeeks
      captionLayout="dropdown"
      className="w-fit text-xs font-semibold"
      classNames={{
        months: 'relative flex flex-col',
        month: 'flex flex-col gap-4',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: navButton,
        button_next: navButton,
        month_caption: 'flex h-9 items-center justify-center px-9',
        dropdowns: 'flex items-center justify-center gap-1.5',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'size-9 flex-1 py-2 text-center text-muted select-none',
        week: 'mt-1 flex',
        day: 'p-0 text-center',
        outside: 'text-muted',
        disabled: 'opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => (
          <ArrowIcon
            className={cx(
              'size-4',
              orientation === 'left' ? 'rotate-90' : orientation === 'right' ? '-rotate-90' : '',
            )}
          />
        ),
        DayButton: CalendarDayButton,
        MonthsDropdown: CalendarDropdown,
        YearsDropdown: CalendarDropdown,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ day: _day, modifiers, className, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  // Moves the focus with the arrow keys.
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const state = modifiers.selected
    ? 'bg-brand text-white'
    : `hover:bg-elevated ${modifiers.today ? 'text-brand' : ''}`

  return (
    <button
      ref={ref}
      className={cx(
        `flex size-9 cursor-pointer items-center justify-center rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-subtle disabled:cursor-default disabled:hover:bg-transparent ${state}`,
        className,
      )}
      {...props}
    />
  )
}

/** Month and year picker. DayPicker reads `event.target.value`, so the change is passed as one. */
function CalendarDropdown({
  options,
  value,
  onChange,
  disabled,
  'aria-label': ariaLabel,
}: DropdownProps) {
  return (
    <Select
      value={String(value)}
      disabled={disabled}
      onValueChange={(next) =>
        onChange?.({ target: { value: next } } as ChangeEvent<HTMLSelectElement>)
      }
    >
      <SelectTrigger
        aria-label={ariaLabel}
        className="relative h-8 rounded-lg pr-1 pl-2 select-none hover:bg-elevated focus-visible:ring-1 focus-visible:ring-subtle"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {options?.map((option) => (
          <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
