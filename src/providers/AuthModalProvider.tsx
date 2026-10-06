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
  const loginModal = useModal()
  const signUpModal = useModal()
  const pending = useRef<OpenLoginOptions>(undefined)

  const { open: showLogin } = loginModal
  const { open: openSignUp } = signUpModal

  const openLogin = useCallback(
    (options?: OpenLoginOptions) => {
      pending.current = options
      showLogin()
    },
    [showLogin],
  )
  const value = useMemo(() => ({ openLogin, openSignUp }), [openLogin, openSignUp])

  function closeLogin() {
    loginModal.close()
    const options = pending.current
    pending.current = undefined
    // The login mutation stores the user before it closes the modal.
    if (queryClient.getQueryData(authKeys.me.queryKey)) options?.onSuccess?.()
    else options?.onCancel?.()
  }

  return (
    <AuthModalContext value={value}>
      {children}
      <LoginFormModal open={loginModal.isOpen} onClose={closeLogin} />
      <SignUpModal open={signUpModal.isOpen} onClose={signUpModal.close} />
    </AuthModalContext>
  )
}
