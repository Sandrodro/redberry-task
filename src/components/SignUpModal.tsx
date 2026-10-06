import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { ApiError } from '@/api/client'
import { useRegister } from '@/api/queries/auth/useRegister'
import type { RegisterInput } from '@/api/types'
import { AvatarUpload } from './AvatarUpload'
import { Button } from './core/Button'
import { Input } from './core/Input'
import { Modal } from './core/Modal'
import { Typography } from './core/Typography'

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

type SignUpModalProps = {
  open: boolean
  onClose: () => void
}

export function SignUpModal({ open, onClose }: SignUpModalProps) {
  const register = useRegister()
  const [resetKey, setResetKey] = useState(0)
  const error = register.error instanceof ApiError ? register.error : null

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      avatar: undefined as File | undefined,
    } satisfies RegisterInput,
    onSubmit: ({ value }) => register.mutate(value, { onSuccess: handleClose }),
  })

  function handleClose() {
    form.reset()
    register.reset()
    setResetKey((key) => key + 1)
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} className="w-118.75">
      <form
        className="flex w-full flex-col gap-6"
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
                error={error?.errors?.avatar?.[0]}
              />
            )}
          </form.Field>
          <div className="flex flex-col gap-6">
            <form.Field name="username">
              {(field) => (
                <Input
                  label="Username"
                  placeholder="User"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={error?.errors?.username?.[0]}
                  success={field.state.value.length >= 3}
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <Input
                  label="Email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={error?.errors?.email?.[0]}
                  success={EMAIL_PATTERN.test(field.state.value)}
                />
              )}
            </form.Field>
            <div className="grid grid-cols-2 gap-3">
              <form.Field name="password">
                {(field) => (
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={error?.errors?.password?.[0]}
                  />
                )}
              </form.Field>
              <form.Field name="password_confirmation">
                {(field) => (
                  <Input
                    label="Confirm password"
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={error?.errors?.password_confirmation?.[0]}
                  />
                )}
              </form.Field>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {error && !error.errors && (
              <Typography variant="labelS" className="text-brand">
                {error.message}
              </Typography>
            )}
            <Button type="submit" disabled={register.isPending}>
              Sign up
            </Button>
            <Typography
              variant="bodyM"
              className="flex items-center justify-center gap-1.25 text-muted"
            >
              Already have an account?
              <button type="button" className="cursor-pointer text-brand">
                <Typography variant="button">Log in</Typography>
              </button>
            </Typography>
          </div>
        </div>
      </form>
    </Modal>
  )
}
