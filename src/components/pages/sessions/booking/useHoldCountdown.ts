import { useEffect, useRef, useState } from 'react'

/** Whole seconds left until `expiresAt`, or null without a hold. Calls `onExpire` once when it reaches 0. */
export function useHoldCountdown(expiresAt: string | null, onExpire: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  })

  useEffect(() => {
    if (!expiresAt) return
    // Tick against the absolute time, so a background tab does not drift.
    const end = new Date(expiresAt).getTime()

    function tick() {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setSecondsLeft(left)
      if (left === 0) {
        clearInterval(timer)
        onExpireRef.current()
      }
    }

    const timer = setInterval(tick, 1000)
    tick()
    return () => clearInterval(timer)
  }, [expiresAt])

  return expiresAt ? secondsLeft : null
}
