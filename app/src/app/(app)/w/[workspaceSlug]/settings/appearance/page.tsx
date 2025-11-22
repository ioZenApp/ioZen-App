import { ContentSection } from '@/components/features/settings/content-section'
import { AppearanceForm } from '@/components/features/settings/appearance-form'

export default function SettingsAppearancePage() {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}

