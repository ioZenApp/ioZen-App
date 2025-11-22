'use client'

import { useState, type JSX } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/button'
import { ScrollArea, ScrollBar } from '@/ui/layout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/forms'

type SidebarNavProps = React.HTMLAttributes<HTMLElement> & {
  items: {
    href: string
    title: string
    icon: JSX.Element
  }[]
}

export function SettingsSidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [val, setVal] = useState(pathname ?? items[0]?.href)

  return (
    <>
      <div className='p-1 md:hidden'>
        <Select value={val} onValueChange={setVal}>
          <SelectTrigger className='h-12 sm:w-48'>
            <SelectValue placeholder='Select page' />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href} asChild>
                <Link href={item.href}>
                  <div className='flex gap-x-4 px-2 py-1'>
                    <span className='scale-125'>{item.icon}</span>
                    <span className='text-md'>{item.title}</span>
                  </div>
                </Link>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        type='always'
        className='bg-background hidden w-full min-w-40 px-1 py-2 md:block'
      >
        <nav
          className={cn(
            'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-accent'
                  : 'hover:bg-accent hover:underline',
                'justify-start'
              )}
            >
              <span className='me-2'>{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </>
  )
}

