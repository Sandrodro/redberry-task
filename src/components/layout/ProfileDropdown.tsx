import { Link } from '@tanstack/react-router'
import CheckIcon from '@/assets/icons/check.svg?react'
import LogOutIcon from '@/assets/icons/log-out.svg?react'
import TicketIcon from '@/assets/icons/ticket.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import type { User } from '@/api/types'
import { useLogout } from '@/api/queries/auth/useLogout'
import { usePrefetchTickets } from '@/hooks/usePrefetchTickets'
import { Avatar } from './Avatar'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/core/DropdownMenu'
import { Typography } from '@/components/core/Typography'

type ProfileDropdownProps = {
  user: User
  initials: string
}

export function ProfileDropdown({ user, initials }: ProfileDropdownProps) {
  const logout = useLogout()
  const prefetchTickets = usePrefetchTickets()

  return (
    <DropdownMenuContent className="flex w-75.5 flex-col gap-1 rounded-2xl bg-background pb-2.5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5 pl-5 pt-5">
          <Avatar
            src={user.avatar}
            initials={initials}
            dot={user.profileComplete ? 'success' : 'warning'}
            className="size-10.5"
          />
          <div className="flex w-47.5 flex-col gap-0.5">
            <Typography variant="labelM" className="w-full truncate">
              {user.fullName || user.username}
            </Typography>
            <Typography variant="bodyS" className="w-full truncate text-muted">
              {user.email}
            </Typography>
          </div>
        </div>
        <div className="px-5">
          {user.profileComplete ? (
            <div className="flex w-65.5 items-center gap-1.5 rounded-[10px] bg-success/10 px-3 py-2.5">
              <Typography variant="labelM" className="text-success">
                Profile Complete
              </Typography>
              <CheckIcon className="size-4 shrink-0 text-success" />
            </div>
          ) : (
            <div className="flex w-65.5 flex-col gap-0.5 rounded-[10px] bg-warning/10 px-3 py-2.5">
              <Typography variant="labelM" className="text-warning">
                Profile incomplete
              </Typography>
              <Typography variant="bodyS" className="text-muted">
                Please complete your profile to enable booking
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-0.5 pt-1">
          <DropdownMenuItem asChild className="h-10">
            <Link to="/profile">
              <UserIcon className="size-4 shrink-0" />
              <Typography variant="labelM">My Profile</Typography>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="h-10">
            <Link to="/profile" search={{ tab: 'tickets' }} onMouseEnter={prefetchTickets}>
              <TicketIcon className="size-4 shrink-0" />
              <Typography variant="labelM">My Tickets</Typography>
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-brand" onSelect={() => logout.mutate()}>
          <LogOutIcon className="size-4 shrink-0" />
          <Typography variant="labelM">Log out</Typography>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  )
}
