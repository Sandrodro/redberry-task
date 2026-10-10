import { Spinner } from '@/components/core/Spinner'

/** Stands in for a whole page while its data loads. */
export function PageSpinner() {
  return (
    <div className="flex justify-center py-40">
      <Spinner />
    </div>
  )
}
