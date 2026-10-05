import { ApiError } from '../../../api/client'
import { useNotifyMe } from '../../../api/queries/catalogue/useNotifyMe'
import BellIcon from '../../../assets/icons/bell.svg?react'
import CheckIcon from '../../../assets/icons/check.svg?react'
import { useAuthModal } from '../../../hooks/useAuthModal'
import { Typography } from '../../core/Typography'

type NotifyMeButtonProps = {
  slug: string
  notified: boolean
}

export function NotifyMeButton({ slug, notified }: NotifyMeButtonProps) {
  const notify = useNotifyMe()
  const { openLogin } = useAuthModal()
  const done = notified || notify.isSuccess

  function handleClick() {
    notify.mutate(slug, {
      onError: (error) => {
        // A guest gets the login modal, then the action runs again.
        if (error instanceof ApiError && error.status === 401) openLogin({ onSuccess: handleClick })
      },
    })
  }

  return (
    <button
      type="button"
      disabled={done || notify.isPending}
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1 rounded-full border border-muted px-3 py-1.5 disabled:cursor-default"
    >
      {done ? <CheckIcon className="size-4" /> : <BellIcon className="size-4" />}
      <Typography variant="labelS">{done ? 'Notified' : 'Notify Me'}</Typography>
    </button>
  )
}
