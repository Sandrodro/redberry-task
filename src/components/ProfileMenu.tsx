import { useState } from 'react'
import ArrowIcon from '../assets/icons/arrow.svg?react'
import type { User } from '../api/types'
import { Avatar } from './Avatar'
import { ProfileDropdown } from './ProfileDropdown'
import { Typography } from './core/Typography'

/** Initials are the first letters of the first and last name. Falls back to the username. */
function getInitials({ fullName, username }: User) {
  const words = fullName?.trim().split(/\s+/).filter(Boolean) ?? []
  if (words.length === 0) return username.slice(0, 2).toUpperCase()
  const last = words.length > 1 ? words[words.length - 1] : ''
  return (words[0][0] + (last[0] ?? '')).toUpperCase()
}

export function ProfileMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const initials = getInitials(user)
  const firstName = user.fullName?.trim().split(/\s+/)[0] || user.username

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-6"
      >
        <span className="flex items-center gap-3">
          <Avatar
            src={user.avatar}
            initials={initials}
            dot={user.profileComplete ? 'success' : 'warning'}
          />
          <Typography variant="labelM">{firstName}</Typography>
        </span>
        <ArrowIcon className="size-4 text-white" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-2">
          <ProfileDropdown
            user={user}
            initials={initials}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
