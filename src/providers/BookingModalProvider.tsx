import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { lazy, Suspense, useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@/api/types'
import { authKeys } from '@/api/queryKeys'
import { useAuthModal } from '@/hooks/useAuthModal'
import { BookingModalContext } from '@/hooks/useBookingModal'
import { isUnderage } from '@/utils/isUnderage'

// Loaded on first open: the seat map and checkout are not needed until a session is picked.
const BookingModal = lazy(() =>
  import('@/components/booking/BookingModal').then((module) => ({
    default: module.BookingModal,
  })),
)

/** Owns the booking modal, so any session card can open it. Mount it inside `AuthModalProvider`. */
export function BookingModalProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { openLogin } = useAuthModal()
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)

  const openBooking = useCallback(
    function open(target: Session) {
      // Read the cache, not a hook value, so the replay after login sees the new user.
      const user = queryClient.getQueryData<User | null>(authKeys.me)
      if (!user) openLogin({ onSuccess: () => open(target) })
      else if (!user.profileComplete) navigate({ to: '/profile' })
      // Too young for this film. The movie page shows its sessions disabled with the reason.
      else if (isUnderage(user, target.movie.ageRating)) return
      else setSession(target)
    },
    [queryClient, openLogin, navigate],
  )
  const value = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingModalContext value={value}>
      {children}
      {session && (
        <Suspense fallback={null}>
          <BookingModal key={session.id} session={session} onClose={() => setSession(null)} />
        </Suspense>
      )}
    </BookingModalContext>
  )
}
