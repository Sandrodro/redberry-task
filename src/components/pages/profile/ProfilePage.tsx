import { PersonalInformationForm } from './PersonalInformationForm'
import { Tab } from '../../core/Tab'
import { Typography } from '../../core/Typography'
import { useAuth } from '../../../hooks/useAuth'

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
      {user && (
        <div className="mt-11">
          <PersonalInformationForm user={user} />
        </div>
      )}
    </main>
  )
}
