import { useNavigate, useSearch } from '@tanstack/react-router'
import AlertIcon from '@/assets/icons/alert.svg?react'
import { MyTickets } from './MyTickets'
import { PersonalInformationForm } from './PersonalInformationForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/Tabs'
import { Typography } from '@/components/core/Typography'
import { useAuth } from '@/hooks/useAuth'
import { usePrefetchTickets } from '@/hooks/usePrefetchTickets'

export function ProfilePage() {
  const { user } = useAuth()
  const { tab = 'personal' } = useSearch({ from: '/_protected/profile' })
  const navigate = useNavigate({ from: '/profile' })
  const prefetchTickets = usePrefetchTickets()

  return (
    <Tabs
      asChild
      value={tab}
      onValueChange={(value) =>
        navigate({ search: { tab: value as 'personal' | 'tickets' }, replace: true })
      }
    >
      <main className="px-12.75 pt-1.5">
        <div className="flex flex-col gap-7 border-b border-card">
          <Typography variant="h1">My Profile</Typography>
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="tickets" onMouseEnter={prefetchTickets}>
              My Tickets
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Kept mounted, so unsaved edits survive a switch to the other tab. */}
        <TabsContent value="personal" forceMount className="data-[state=inactive]:hidden">
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
        <TabsContent value="tickets" className="mt-9">
          <MyTickets />
        </TabsContent>
      </main>
    </Tabs>
  )
}
