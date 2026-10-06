import { useForm } from '@tanstack/react-form'
import CalendarIcon from '@/assets/icons/calendar.svg?react'
import { ApiError } from '@/api/client'
import { useUpdateProfile } from '@/api/queries/profile/useUpdateProfile'
import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import type { AgeRating, ProfileInput, User } from '@/api/types'
import { getFieldError } from '@/utils/getFieldError'
import { getAge, MIN_AGE, profileSchema } from '@/utils/profileSchema'
import { Button } from '@/components/core/Button'
import { Input } from '@/components/core/Input'
import { Select } from '@/components/core/Select'
import { Typography } from '@/components/core/Typography'

function getAgeNote(dateOfBirth: string, ageRatings: AgeRating[] = []) {
  if (!dateOfBirth) return undefined
  const age = getAge(dateOfBirth)
  if (age < MIN_AGE) return undefined
  const blocked = ageRatings.filter((rating) => rating.minAge > age).map((rating) => rating.code)
  if (blocked.length === 0) return undefined
  const list = new Intl.ListFormat('en', { type: 'disjunction' }).format(blocked)
  return `You cannot buy tickets for ${list} titles`
}

export function PersonalInformationForm({ user }: { user: User }) {
  const update = useUpdateProfile()
  const error = update.error instanceof ApiError ? update.error : null
  const { data: filterOptions } = useFilterOptionsData()

  const form = useForm({
    defaultValues: {
      fullName: user.fullName ?? '',
      mobileNumber: user.mobileNumber ?? '',
      dateOfBirth: user.dateOfBirth ?? '',
      preferredVenueId: user.preferredVenue?.id ?? null,
    } satisfies ProfileInput,
    validators: { onMount: profileSchema, onChange: profileSchema },
    onSubmit: ({ value }) => {
      const input = profileSchema.parse(value)
      // The saved values become the new defaults, so the button is disabled until the next edit.
      update.mutate(input, { onSuccess: () => form.reset(input) })
    },
  })

  return (
    <form
      className="flex w-220 max-w-full flex-col gap-9"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4.5">
          <form.Field name="fullName">
            {(field) => (
              <Input
                label="Full name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={getFieldError(field, error?.errors?.fullName?.[0])}
              />
            )}
          </form.Field>
          <Input
            label="Email"
            value={user.email}
            disabled
            hint="Set at registration and cannot be changed"
          />
        </div>
        <div className="flex flex-col gap-5">
          <form.Field name="mobileNumber">
            {(field) => (
              <Input
                label="Mobile number"
                type="tel"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={getFieldError(field, error?.errors?.mobileNumber?.[0])}
              />
            )}
          </form.Field>
          <form.Field name="dateOfBirth">
            {(field) => (
              <Input
                label="Date of birth"
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={getFieldError(field, error?.errors?.dateOfBirth?.[0])}
                hint={getAgeNote(field.state.value, filterOptions?.ageRatings)}
                icon={<CalendarIcon className="pointer-events-none size-4 shrink-0 text-white" />}
                className="[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:size-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
            )}
          </form.Field>
          <form.Field name="preferredVenueId">
            {(field) => (
              <Select
                label="Preferred Venue (Optional)"
                value={field.state.value ?? ''}
                onChange={(e) =>
                  field.handleChange(e.target.value ? Number(e.target.value) : null)
                }
                onBlur={field.handleBlur}
                error={error?.errors?.preferredVenueId?.[0]}
              >
                <option value="">Select venue</option>
                {filterOptions?.venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </Select>
            )}
          </form.Field>
        </div>
        {error && !error.errors && (
          <Typography variant="labelS" className="text-brand">
            {error.message}
          </Typography>
        )}
      </div>
      <form.Subscribe selector={(state) => state.canSubmit && !state.isDefaultValue}>
        {(canSave) => (
          <Button type="submit" disabled={!canSave || update.isPending} className="self-start">
            {update.isPending ? 'Saving...' : 'Save changes'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
