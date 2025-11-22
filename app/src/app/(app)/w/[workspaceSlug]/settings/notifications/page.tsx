import { ContentSection } from '@/components/features/settings/content-section'
import { NotificationsForm } from '@/components/features/settings/notifications-form'

export default function SettingsNotificationsPage() {
  return (
    <ContentSection
      title='Notifications'
      desc='Configure how you receive notifications.'
    >
      <NotificationsForm />
    </ContentSection>
  )
}

