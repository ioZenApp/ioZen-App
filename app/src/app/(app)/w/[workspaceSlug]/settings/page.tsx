import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/db'
import { ContentSection } from '@/components/features/settings/content-section'
import { ProfileForm } from '@/components/features/settings/profile-form'

interface PageProps {
  params: Promise<{ workspaceSlug: string }>
}

export default async function SettingsProfilePage({ params }: PageProps) {
  const { } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
  })

  if (!profile) {
    redirect('/login')
  }

  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm profile={profile} />
    </ContentSection>
  )
}

