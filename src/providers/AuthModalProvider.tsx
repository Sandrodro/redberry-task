import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { setUnauthorizedHandler, TOKEN_KEY } from '@/api/client'
import { AuthModalContext, type OpenLoginOptions } from '@/hooks/useAuthModal'
import { useModal } from '@/hooks/useModal'
import { LoginFormModal } from '@/components/auth/LoginFormModal'
import { SignUpModal } from '@/components/auth/SignUpModal'
import { storage } from '@/utils/storage'

/** Owns the login and sign up modals, so any component can open them. A 401 from the API opens the login modal too. */
export function AuthModalProvider({ children }: { children: ReactNode }) {
  const { isOpen: isLoginOpen, open: showLogin, close: closeLogin } = useModal()
  const { isOpen: isSignUpOpen, open: openSignUp, close: closeSignUp } = useModal()
  // Everyone who asked for a login while the modal was closed. They all get the same answer.
  const pending = useRef<OpenLoginOptions[]>([])
  const tokenWhenOpened = useRef<string | null>(null)

  const openLogin = useCallback(
    (options?: OpenLoginOptions) => {
      if (pending.current.length === 0) tokenWhenOpened.current = storage.get(TOKEN_KEY)
      if (options) pending.current.push(options)
      showLogin()
    },
    [showLogin],
  )
  const value = useMemo(() => ({ openLogin, openSignUp }), [openLogin, openSignUp])

  useEffect(() => {
    setUnauthorizedHandler(
      () =>
        new Promise((resolve) =>
          openLogin({ onSuccess: () => resolve(true), onCancel: () => resolve(false) }),
        ),
    )
    return () => setUnauthorizedHandler(undefined)
  }, [openLogin])

  /** Runs the callbacks of every `openLogin`. Sign up is another way through the same flow, so it resolves them too. */
  function resolvePending() {
    const callbacks = pending.current
    pending.current = []
    // A login or a sign up stores a new token before it closes its modal. An expired token stays the same when the user cancels.
    const token = storage.get(TOKEN_KEY)
    const loggedIn = token !== null && token !== tokenWhenOpened.current
    callbacks.forEach((options) => (loggedIn ? options.onSuccess?.() : options.onCancel?.()))
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
