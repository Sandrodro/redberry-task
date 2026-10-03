import { useForm } from '@tanstack/react-form'
import { ApiError } from '../api/client'
import { useLogin } from '../api/queries/auth'
import type { LoginInput } from '../api/types'
import { Button } from './core/Button'
import { Input } from './core/Input'
import { Modal } from './core/Modal'
import { Typography } from './core/Typography'

type LoginFormModalProps = {
  open: boolean
  onClose: () => void
}

export function LoginFormModal({ open, onClose }: LoginFormModalProps) {
  const login = useLogin()
  const error = login.error instanceof ApiError ? login.error : null

  const form = useForm({
    defaultValues: { email: '', password: '' } satisfies LoginInput,
    onSubmit: ({ value }) => login.mutate(value, { onSuccess: onClose }),
  })

  return (
    <Modal open={open} onClose={onClose}>
      <form
        className="flex w-[400px] max-w-full flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex flex-col gap-2">
          <Typography variant="h2">Log In</Typography>
          <Typography variant="bodyS" className="text-muted">
            Welcome back to Kino XII
          </Typography>
        </div>
        <form.Field name="email">
          {(field) => (
            <Input
              label="Email"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={error?.errors?.email?.[0]}
            />
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <Input
              label="Password"
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={error?.errors?.password?.[0]}
            />
          )}
        </form.Field>
        {error && !error.errors && (
          <Typography variant="labelS" className="text-brand">
            {error.message}
          </Typography>
        )}
        <Button type="submit" disabled={login.isPending} className="mt-2">
          Log In
        </Button>
        <Typography variant="bodyM" className="mt-2 text-center text-muted">
          Don't have an account?{' '}
          <Typography variant="button" className="cursor-pointer text-brand">
            Sign up
          </Typography>
        </Typography>
      </form>
    </Modal>
  )
}
