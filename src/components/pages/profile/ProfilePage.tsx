import AlertIcon from '@/assets/icons/alert.svg?react'
import { PersonalInformationForm } from './PersonalInformationForm'
import { Tab } from '@/components/core/Tab'
import { Typography } from '@/components/core/Typography'
import { useAuth } from '@/hooks/useAuth'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <main className="px-12.75 pt-1.5">
      <div className="flex flex-col gap-7 border-b border-card">
        <Typography variant="h1">My Profile</Typography>
        <div className="flex gap-8">
          <Tab active>Personal Information</Tab>
          <Tab>My Tickets</Tab>
        </div>
      </div>
      {user && !user.profileComplete && (
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-warning/10 px-4 py-3 text-warning">
          <AlertIcon className="size-4 shrink-0" />
          <Typography variant="labelS">Complete your profile to book tickets.</Typography>
        </div>
      )}
      {user && (
        <div className="mt-11">
          <PersonalInformationForm user={user} />
        </div>
      )}
    </main>
  )
}
