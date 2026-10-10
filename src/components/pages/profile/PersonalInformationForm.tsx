import CalendarIcon from '@/assets/icons/calendar.svg?react'
import { useUpdateProfile } from '@/api/queries/profile/useUpdateProfile'
import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import type { AgeRating, User } from '@/api/types'
import { useAppForm } from '@/hooks/useAppForm'
import { getServerErrors } from '@/utils/form/getServerErrors'
import { getAge, MIN_AGE, profileSchema } from '@/utils/schemas/profileSchema'
import { ErrorMessage } from '@/components/core/ErrorMessage'
import { Input } from '@/components/core/Input'
import { Select } from '@/components/core/Select'
import { getProfileFormValues } from './utils'

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
  const { fieldErrors, message } = getServerErrors(update.error)
  const { data: filterOptions } = useFilterOptionsData()

  const form = useAppForm({
    defaultValues: getProfileFormValues(user),
    validators: { onMount: profileSchema, onChange: profileSchema },
    onSubmit: ({ value }) => {
      const input = profileSchema.parse(value)
      // The values the server returned become the new defaults, so the button is disabled until the next edit.
      update.mutate(input, { onSuccess: (saved) => form.reset(getProfileFormValues(saved)) })
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
          <form.AppField name="fullName">
            {(field) => (
              <field.Input label="Full name" success={false} serverError={fieldErrors.fullName} />
            )}
          </form.AppField>
          <Input
            label="Email"
            value={user.email}
            disabled
            hint="Set at registration and cannot be changed"
          />
        </div>
        <div className="flex flex-col gap-5">
          <form.AppField name="mobileNumber">
            {(field) => (
              <field.Input
                label="Mobile number"
                type="tel"
                success={false}
                serverError={fieldErrors.mobileNumber}
              />
            )}
          </form.AppField>
          <form.AppField name="dateOfBirth">
            {(field) => (
              <field.Input
                label="Date of birth"
                type="date"
                success={false}
                serverError={fieldErrors.dateOfBirth}
                hint={getAgeNote(field.state.value, filterOptions?.ageRatings)}
                icon={<CalendarIcon className="pointer-events-none size-4 shrink-0 text-white" />}
                className="[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:size-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
            )}
          </form.AppField>
          <form.Field name="preferredVenueId">
            {(field) => (
              <Select
                label="Preferred Venue (Optional)"
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value ? Number(e.target.value) : null)}
                onBlur={field.handleBlur}
                error={fieldErrors.preferredVenueId}
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
        <ErrorMessage message={message} />
      </div>
      <form.AppForm>
        <form.SubmitButton
          isPending={update.isPending}
          pendingLabel="Saving..."
          requireChange
          className="self-start"
        >
          Save changes
        </form.SubmitButton>
      </form.AppForm>
    </form>
  )
}
