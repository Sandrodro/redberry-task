import { useState } from 'react'
import { useRegister } from '@/api/queries/auth/useRegister'
import { useAppForm } from '@/hooks/useAppForm'
import { getFieldError } from '@/utils/form/getFieldError'
import { getServerErrors } from '@/utils/form/getServerErrors'
import { setServerErrors } from '@/utils/form/setServerErrors'
import { signUpSchema, type SignUpValues } from '@/utils/schemas/signUpSchema'
import { AvatarUpload } from './AvatarUpload'
import { ErrorMessage } from '@/components/core/ErrorMessage'
import { Modal } from '@/components/core/Modal'
import { Typography } from '@/components/core/Typography'

const DEFAULT_VALUES: SignUpValues = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
}

type SignUpModalProps = {
  open: boolean
  onClose: () => void
  /** Closes this modal and opens the login modal. */
  onLogIn: () => void
}

export function SignUpModal({ open, onClose, onLogIn }: SignUpModalProps) {
  const register = useRegister()
  const [resetKey, setResetKey] = useState(0)
  const { message } = getServerErrors(register.error)

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onMount: signUpSchema, onChange: signUpSchema },
    onSubmit: ({ value }) =>
      register.mutate(signUpSchema.parse(value), {
        onSuccess: handleClose,
        onError: (error) => setServerErrors(form, error),
      }),
  })

  function reset() {
    form.reset()
    // A reset clears the errors from the mount check, so the empty form must be checked again.
    form.validateSync('mount')
    register.reset()
    setResetKey((key) => key + 1)
  }

  function handleClose() {
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} className="w-118.75">
      <form
        className="flex w-full flex-col gap-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex flex-col gap-2">
          <Typography variant="h2">Sign up</Typography>
          <Typography variant="bodyS" className="text-muted">
            Welcome to Kino XII
          </Typography>
        </div>
        <div className="flex flex-col gap-8">
          <form.Field name="avatar">
            {(field) => (
              <AvatarUpload
                key={resetKey}
                onChange={field.handleChange}
                error={getFieldError(field)}
              />
            )}
          </form.Field>
          <div className="flex flex-col gap-6">
            <form.AppField name="username">
              {(field) => <field.Input label="Username" placeholder="User" />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => (
                <field.Input label="Email" type="email" placeholder="example@gmail.com" />
              )}
            </form.AppField>
            <div className="grid grid-cols-2 gap-3">
              <form.AppField name="password">
                {(field) => <field.Input label="Password" type="password" placeholder="••••••••" />}
              </form.AppField>
              <form.AppField name="password_confirmation">
                {(field) => (
                  <field.Input label="Confirm password" type="password" placeholder="••••••••" />
                )}
              </form.AppField>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ErrorMessage message={message} />
            <form.AppForm>
              <form.SubmitButton isPending={register.isPending} pendingLabel="Signing up...">
                Sign up
              </form.SubmitButton>
            </form.AppForm>
            <Typography
              variant="bodyM"
              className="flex items-center justify-center gap-1.25 text-muted"
            >
              Already have an account?
              <button
                type="button"
                onClick={() => {
                  reset()
                  onLogIn()
                }}
                className="cursor-pointer text-brand"
              >
                <Typography variant="button">Log in</Typography>
              </button>
            </Typography>
          </div>
        </div>
      </form>
    </Modal>
  )
}
