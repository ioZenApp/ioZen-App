'use client'

import { useEffect } from 'react'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/lib/layout-provider'
import { useSearch } from '@/lib/search-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/layout/skip-to-main'
import { CommandMenu } from '@/components/layout/command-menu'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/layout/search'
import { ThemeSwitch } from '@/components/layout/theme-switch'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
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

export function AuthenticatedLayout({ children, workspace, profile }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  const { setOpen } = useSearch()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setOpen])

  return (
    <LayoutProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar workspace={workspace} profile={profile} />
        <SidebarInset
          className={cn(
            '@container/content',
            'has-data-[layout=fixed]:h-svh',
            'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
          )}
        >
          <Header>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeSwitch />
            </div>
          </Header>
          <Main>
            {children}
          </Main>
        </SidebarInset>
        <CommandMenu workspaceSlug={workspace.slug} />
      </SidebarProvider>
    </LayoutProvider>
  )
}
