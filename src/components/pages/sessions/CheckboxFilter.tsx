import { Checkbox } from '../../core/Checkbox'
import { Typography } from '../../core/Typography'

type CheckboxFilterProps = {
  title: string
  options: { value: string; label: string; hint?: string }[]
  selected?: string[]
  onToggle: (value: string) => void
}

export function CheckboxFilter({ title, options, selected = [], onToggle }: CheckboxFilterProps) {
  return (
    <section className="flex flex-col gap-3">
      <Typography variant="overline" as="h3" className="text-muted">
        {title}
      </Typography>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          hint={option.hint}
          checked={selected.includes(option.value)}
          onChange={() => onToggle(option.value)}
        />
      ))}
    </section>
  )
}
