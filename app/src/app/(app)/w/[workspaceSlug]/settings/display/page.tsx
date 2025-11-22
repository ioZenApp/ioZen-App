import { ContentSection } from '@/components/features/settings/content-section'
import { DisplayForm } from '@/components/features/settings/display-form'

export default function SettingsDisplayPage() {
  return (
    <ContentSection
      title='Display'
      desc='Turn items on or off to control what is displayed in the app.'
    >
      <DisplayForm />
    </ContentSection>
  )
}

