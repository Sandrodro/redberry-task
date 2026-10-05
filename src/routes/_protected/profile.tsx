import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '../../components/pages/profile/ProfilePage'

export const Route = createFileRoute('/_protected/profile')({
  component: ProfilePage,
})
