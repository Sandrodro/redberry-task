import { useLogin } from '@/api/queries/auth/useLogin'
import { useAppForm } from '@/hooks/useAppForm'
import { getServerErrors } from '@/utils/form/getServerErrors'
import { loginSchema, type LoginValues } from '@/utils/schemas/loginSchema'
import { ErrorMessage } from '@/components/core/ErrorMessage'
import { Modal } from '@/components/core/Modal'
import { Typography } from '@/components/core/Typography'

type LoginFormModalProps = {
  open: boolean
  onClose: () => void
  /** Closes this modal and opens the sign up modal. */
  onSignUp: () => void
}

export function LoginFormModal({ open, onClose, onSignUp }: LoginFormModalProps) {
  const login = useLogin()
  const { fieldErrors, message } = getServerErrors(login.error)

  const form = useAppForm({
    defaultValues: { email: '', password: '' } satisfies LoginValues,
    validators: { onMount: loginSchema, onChange: loginSchema },
    onSubmit: ({ value }) => login.mutate(loginSchema.parse(value), { onSuccess: onClose }),
  })

  return (
    <Modal open={open} onClose={onClose} className="w-100.75">
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex flex-col gap-2">
          <Typography variant="h2">Log in</Typography>
          <Typography variant="bodyS" className="text-muted">
            Welcome back to Kino XII
          </Typography>
        </div>
        <form.AppField name="email">
          {(field) => (
            <field.Input
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              serverError={fieldErrors.email}
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.Input
              label="Password"
              type="password"
              placeholder="••••••••"
              serverError={fieldErrors.password}
            />
          )}
        </form.AppField>
        <ErrorMessage message={message} />
        <form.AppForm>
          <form.SubmitButton
            isPending={login.isPending}
            pendingLabel="Logging in..."
            className="mt-2"
          >
            Log in
          </form.SubmitButton>
        </form.AppForm>
        <Typography
          variant="bodyM"
          className="flex items-center justify-center gap-1.25 text-muted"
        >
          Don't have an account?
          <button type="button" onClick={onSignUp} className="cursor-pointer text-brand">
            <Typography variant="button">Sign up</Typography>
          </button>
        </Typography>
      </form>
    </Modal>
  )
}
