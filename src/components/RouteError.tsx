import { useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { ErrorState } from '@/components/core/ErrorState'

/** Shown in place of a page when its route loader or its render throws. Retry loads the route again. */
export function RouteError({ reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <ErrorState
      message="Something went wrong while loading this page."
      onRetry={() => {
        reset()
        router.invalidate()
      }}
      className="px-12.75 py-40"
    />
  )
}
