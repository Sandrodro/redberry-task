import AlertIcon from '@/assets/icons/alert.svg?react'
import { PersonalInformationForm } from './PersonalInformationForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/Tabs'
import { Typography } from '@/components/core/Typography'
import { useAuth } from '@/hooks/useAuth'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <Tabs asChild defaultValue="personal">
      <main className="px-12.75 pt-1.5">
        <div className="flex flex-col gap-7 border-b border-card">
          <Typography variant="h1">My Profile</Typography>
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          </TabsList>
        </div>
        {/* Kept mounted, so unsaved edits survive a switch to the other tab. */}
        <TabsContent value="personal" forceMount>
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
        </TabsContent>
        <TabsContent value="tickets" />
      </main>
    </Tabs>
  )
}
