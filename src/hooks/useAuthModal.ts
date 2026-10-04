import { createContext, useContext } from 'react'

export type OpenLoginOptions = {
  /** Runs after a successful login. Use it to resume what the user was doing. */
  onSuccess?: () => void
  /** Runs when the modal closes without a login. */
  onCancel?: () => void
}

type AuthModalContextValue = {
  openLogin: (options?: OpenLoginOptions) => void
  openSignUp: () => void
}

export const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function useAuthModal() {
  const context = useContext(AuthModalContext)
  if (!context) throw new Error('useAuthModal must be used inside AuthModalProvider')
  return context
}
