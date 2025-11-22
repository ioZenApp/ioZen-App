import { Monitor, Bell, Palette, UserCog } from 'lucide-react'
import { Separator } from '@/ui/layout'
import { SettingsSidebarNav } from '@/components/features/settings/sidebar-nav'

export default async function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ workspaceSlug: string }>
}) {
  const { workspaceSlug } = await params

  const sidebarNavItems = [
    {
      title: 'Profile',
      href: `/w/${workspaceSlug}/settings`,
      icon: <UserCog size={18} />,
    },
    {
      title: 'Appearance',
      href: `/w/${workspaceSlug}/settings/appearance`,
      icon: <Palette size={18} />,
    },
    {
      title: 'Notifications',
      href: `/w/${workspaceSlug}/settings/notifications`,
      icon: <Bell size={18} />,
    },
    {
      title: 'Display',
      href: `/w/${workspaceSlug}/settings/display`,
      icon: <Monitor size={18} />,
    },
  ]

  return (
    <div className='space-y-0.5'>
      <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
        Settings
      </h1>
      <p className='text-muted-foreground'>
        Manage your account settings and preferences.
      </p>
      <Separator className='my-4 lg:my-6' />
      <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          <SettingsSidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex w-full overflow-y-hidden p-1'>
          {children}
        </div>
      </div>
    </div>
  )
}

