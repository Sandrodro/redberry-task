import { useNotifyMe } from '@/api/queries/movies/useNotifyMe'
import BellIcon from '@/assets/icons/bell.svg?react'
import CheckIcon from '@/assets/icons/check.svg?react'
import { Typography } from '@/components/core/Typography'

type NotifyMeButtonProps = {
  slug: string
  notified: boolean
}

export function NotifyMeButton({ slug, notified }: NotifyMeButtonProps) {
  const notify = useNotifyMe()

  return (
    <button
      type="button"
      // `notified` comes from the server. The mutation stays pending until the lists are loaded again.
      disabled={notified || notify.isPending}
      onClick={() => notify.mutate(slug)}
      className="flex cursor-pointer items-center gap-1 rounded-full border border-muted px-3 py-1.5 disabled:cursor-default"
    >
      {notified ? <CheckIcon className="size-4" /> : <BellIcon className="size-4" />}
      <Typography variant="labelS">
        {notified ? 'Notified' : notify.isError ? 'Try again' : 'Notify Me'}
      </Typography>
    </button>
  )
}
