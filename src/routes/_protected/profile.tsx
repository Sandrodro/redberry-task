import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/components/pages/profile/ProfilePage'
import { profileSearchSchema } from '@/utils/profileSearchSchema'

export const Route = createFileRoute('/_protected/profile')({
  validateSearch: profileSearchSchema,
  component: ProfilePage,
})
