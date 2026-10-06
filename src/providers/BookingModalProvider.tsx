import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@/api/types'
import { authKeys } from '@/api/queryKeys'
import { BookingModal } from '@/components/pages/sessions/booking/BookingModal'
import { useAuthModal } from '@/hooks/useAuthModal'
import { BookingModalContext } from '@/hooks/useBookingModal'

/** Owns the booking modal, so any session card can open it. Mount it inside `AuthModalProvider`. */
export function BookingModalProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { openLogin } = useAuthModal()
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)

  const openBooking = useCallback(
    function open(target: Session) {
      // Read the cache, not a hook value, so the replay after login sees the new user.
      const user = queryClient.getQueryData<User | null>(authKeys.me.queryKey)
      if (!user) openLogin({ onSuccess: () => open(target) })
      else if (!user.profileComplete) navigate({ to: '/profile' })
      // Too young for this film. The movie page shows its sessions disabled with the reason.
      else if (user.age !== null && user.age < target.movie.ageRating.minAge) return
      else setSession(target)
    },
    [queryClient, openLogin, navigate],
  )
  const value = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingModalContext value={value}>
      {children}
      {session && <BookingModal key={session.id} session={session} onClose={() => setSession(null)} />}
    </BookingModalContext>
  )
}
