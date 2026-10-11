import { Select as SelectPrimitive } from 'radix-ui'
import { useId, type ComponentProps, type ReactNode } from 'react'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import { cx } from '@/utils/cx'
import { Field, type FieldProps } from './Field'
import { Typography } from './Typography'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

export function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  const base = 'flex cursor-pointer items-center gap-1 outline-none'

  return (
    <SelectPrimitive.Trigger className={cx(base, className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ArrowIcon className="size-4 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  const base =
    'z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-y-auto rounded-2xl border border-elevated bg-background py-2.5 text-white outline-none'

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={8}
        className={cx(base, className)}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  const base =
    'cursor-pointer px-5 py-2.5 outline-none data-highlighted:bg-card data-[state=checked]:text-brand data-disabled:cursor-default data-disabled:opacity-50'

  return (
    <SelectPrimitive.Item className={cx(base, className)} {...props}>
      <SelectPrimitive.ItemText>
        <Typography variant="labelS" as="span">
          {children}
        </Typography>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

type SelectFieldProps = Omit<FieldProps, 'id' | 'icon' | 'success'> & {
  /** The selected item value, or an empty string to show the placeholder. */
  value: string
  onValueChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  children: ReactNode
}

/** A form field with a label that opens a list of `SelectItem`s. */
export function SelectField({
  label,
  error,
  hint,
  value,
  onValueChange,
  onBlur,
  placeholder,
  children,
}: SelectFieldProps) {
  const id = useId()

  return (
    <Field
      id={id}
      label={label}
      error={error}
      hint={hint}
      icon={<ArrowIcon className="pointer-events-none size-4 shrink-0 text-white" />}
    >
      <Select
        value={value}
        onValueChange={onValueChange}
        onOpenChange={(open) => {
          if (!open) onBlur?.()
        }}
      >
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={!!error}
          className={`min-w-0 flex-1 cursor-pointer self-stretch bg-transparent text-left text-xs font-semibold outline-none ${error ? 'text-brand' : value ? 'text-white' : 'text-muted'}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectPrimitive.Trigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </Field>
  )
}
