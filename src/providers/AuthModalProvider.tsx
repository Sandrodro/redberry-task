import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, type ReactNode } from 'react'
import { authKeys } from '@/api/queryKeys'
import { AuthModalContext, type OpenLoginOptions } from '@/hooks/useAuthModal'
import { useModal } from '@/hooks/useModal'
import { LoginFormModal } from '@/components/LoginFormModal'
import { SignUpModal } from '@/components/SignUpModal'

/** Owns the login and sign up modals, so any component can open them. */
export function AuthModalProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { isOpen: isLoginOpen, open: showLogin, close: closeLogin } = useModal()
  const { isOpen: isSignUpOpen, open: openSignUp, close: closeSignUp } = useModal()
  const pending = useRef<OpenLoginOptions>(undefined)

  const openLogin = useCallback(
    (options?: OpenLoginOptions) => {
      pending.current = options
      showLogin()
    },
    [showLogin],
  )
  const value = useMemo(() => ({ openLogin, openSignUp }), [openLogin, openSignUp])

  /** Runs the callbacks of the last `openLogin`. Sign up is another way through the same flow, so it resolves them too. */
  function resolvePending() {
    const options = pending.current
    pending.current = undefined
    // The login and register mutations store the user before they close their modal.
    if (queryClient.getQueryData(authKeys.me.queryKey)) options?.onSuccess?.()
    else options?.onCancel?.()
  }

  return (
    <AuthModalContext value={value}>
      {children}
      <LoginFormModal
        open={isLoginOpen}
        onClose={() => {
          closeLogin()
          resolvePending()
        }}
        // The callbacks of `openLogin` stay pending until the sign up modal closes.
        onSignUp={() => {
          closeLogin()
          openSignUp()
        }}
      />
      <SignUpModal
        open={isSignUpOpen}
        onClose={() => {
          closeSignUp()
          resolvePending()
        }}
        // `showLogin` and not `openLogin`, so the pending callbacks are kept.
        onLogIn={() => {
          closeSignUp()
          showLogin()
        }}
      />
    </AuthModalContext>
  )
}
