import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import CalendarIcon from '../assets/icons/calendar.svg?react'
import { ApiError } from '../api/client'
import { useUpdateProfile } from '../api/queries/profile'
import { filterOptionsQueryOptions } from '../api/queries/sessions'
import type { ProfileInput, User } from '../api/types'
import { Button } from './core/Button'
import { Input } from './core/Input'
import { Select } from './core/Select'
import { Typography } from './core/Typography'

export function PersonalInformationForm({ user }: { user: User }) {
  const update = useUpdateProfile()
  const error = update.error instanceof ApiError ? update.error : null
  const { data: filterOptions } = useQuery(filterOptionsQueryOptions)

  const form = useForm({
    defaultValues: {
      fullName: user.fullName ?? '',
      mobileNumber: user.mobileNumber ?? '',
      dateOfBirth: user.dateOfBirth ?? '',
      preferredVenueId: user.preferredVenue?.id ?? null,
    } satisfies ProfileInput,
    onSubmit: ({ value }) => update.mutate(value),
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
                error={error?.errors?.fullName?.[0]}
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
                error={error?.errors?.mobileNumber?.[0]}
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
                error={error?.errors?.dateOfBirth?.[0]}
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
      <Button type="submit" disabled={update.isPending} className="self-start">
        Save changes
      </Button>
    </form>
  )
}
