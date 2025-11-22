'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/overlays'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/data-display'

interface Profile {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
}

interface NavigationProps {
  workspaceSlug?: string
  profile?: Profile
}

export function Navigation({ workspaceSlug, profile }: NavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  // Build navigation links based on workspace context
  const navLinks = workspaceSlug
    ? [
      { href: `/w/${workspaceSlug}/dashboard`, label: 'Dashboard' },
      { href: `/w/${workspaceSlug}/chatflows`, label: 'Chatflows' },
      { href: `/w/${workspaceSlug}/analytics`, label: 'Analytics' },
      { href: `/w/${workspaceSlug}/settings`, label: 'Settings' },
    ]
    : [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/preview', label: 'Preview Chat' },
      { href: '/analytics', label: 'Analytics' },
      { href: '/settings', label: 'Settings' },
    ]

  const secondaryLinks = [
    { href: '/feedback', label: 'Feedback' },
    { href: '/changelog', label: 'Changelog' },
    { href: '/help', label: 'Help' },
    { href: '/docs', label: 'Docs' },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Get initials for avatar fallback
  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return email?.slice(0, 2).toUpperCase() || 'U'
  }

  return (
    <nav className="h-16 border-b bg-background border-border">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href={workspaceSlug ? `/w/${workspaceSlug}/dashboard` : '/'}
            className="flex items-center gap-2"
          >
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="30" height="80" rx="4" fill="white" />
              <circle cx="25" cy="50" r="12" fill="black" />
            </svg>
            <span className="text-2xl font-bold text-foreground">iozen</span>
          </Link>
        </div>

        {/* Center: Primary Navigation */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname?.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors rounded-md',
                  'relative',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right: Secondary Links + User Menu */}
        <div className="flex items-center gap-4">
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  suppressHydrationWarning
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors"
                  aria-label="User menu"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={profile.avatarUrl || undefined} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {getInitials(profile.name, profile.email)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">
                    {profile.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={workspaceSlug ? `/w/${workspaceSlug}/settings` : '/settings'}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="User menu"
            >
              <User className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
