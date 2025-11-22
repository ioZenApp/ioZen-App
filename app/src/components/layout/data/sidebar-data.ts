import { LayoutDashboard, MessageSquare, BarChart3, Settings } from 'lucide-react'
import type { NavGroup } from '../types'

export function getSidebarData(workspaceSlug: string) {
  const navGroups: NavGroup[] = [
    {
      title: 'Workspace',
      items: [
        {
          title: 'Dashboard',
          url: `/w/${workspaceSlug}/dashboard`,
          icon: LayoutDashboard,
        },
        {
          title: 'Chatflows',
          url: `/w/${workspaceSlug}/chatflows`,
          icon: MessageSquare,
        },
        {
          title: 'Analytics',
          url: `/w/${workspaceSlug}/analytics`,
          icon: BarChart3,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Workspace Settings',
          url: `/w/${workspaceSlug}/settings`,
          icon: Settings,
        },
      ],
    },
  ]

  return { navGroups }
}

