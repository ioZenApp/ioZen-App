'use client'

import { GalleryVerticalEnd } from 'lucide-react'
import { useLayout } from '@/lib/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { getSidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

interface AppSidebarProps {
  workspace: {
    name: string
    slug: string
  }
  profile: {
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export function AppSidebar({ workspace, profile }: AppSidebarProps) {
  const { collapsible, variant } = useLayout()
  
  // Get sidebar data based on workspace
  const { navGroups } = getSidebarData(workspace.slug)
  
  // Construct user object
  const user = {
    name: profile.name || 'User',
    email: profile.email,
    avatar: profile.avatarUrl || '',
  }
  
  // Construct teams object (single workspace for now)
  const teams = [
    {
      name: workspace.name,
      logo: GalleryVerticalEnd,
      plan: 'Pro', // Placeholder
    }
  ]

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

