import { useUpdateProfile } from '@/api/queries/profile/useUpdateProfile'
import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import type { User } from '@/api/types'
import { useAppForm } from '@/hooks/useAppForm'
import { getFieldError } from '@/utils/form/getFieldError'
import { getServerErrors } from '@/utils/form/getServerErrors'
import { setServerErrors } from '@/utils/form/setServerErrors'
import { profileSchema } from '@/utils/schemas/profileSchema'
import { DatePicker } from '@/components/core/DatePicker'
import { ErrorMessage } from '@/components/core/ErrorMessage'
import { Input } from '@/components/core/Input'
import { Select } from '@/components/core/Select'
import { getAgeNote, getProfileFormValues } from './utils'

export function PersonalInformationForm({ user }: { user: User }) {
  const update = useUpdateProfile()
  const { message } = getServerErrors(update.error)
  const { data: filterOptions } = useFilterOptionsData()

  const form = useAppForm({
    defaultValues: getProfileFormValues(user),
    validators: { onMount: profileSchema, onChange: profileSchema },
    onSubmit: ({ value }) => {
      const input = profileSchema.parse(value)
      // The values the server returned become the new defaults, so the button is disabled until the next edit.
      update.mutate(input, {
        onSuccess: (saved) => form.reset(getProfileFormValues(saved)),
        onError: (error) => setServerErrors(form, error),
      })
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
            {(field) => <field.Input label="Full name" success={false} />}
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
            {(field) => <field.Input label="Mobile number" type="tel" success={false} />}
          </form.AppField>
          <form.Field name="dateOfBirth">
            {(field) => (
              <DatePicker
                label="Date of birth"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={getFieldError(field)}
                hint={getAgeNote(field.state.value, filterOptions?.ageRatings)}
              />
            )}
          </form.Field>
          <form.Field name="preferredVenueId">
            {(field) => (
              <Select
                label="Preferred Venue (Optional)"
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value ? Number(e.target.value) : null)}
                onBlur={field.handleBlur}
                error={getFieldError(field)}
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
