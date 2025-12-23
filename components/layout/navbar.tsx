'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslation } from '@/hooks/use-translation'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        <Link href='/' className='text-xl font-bold'>
          Felipe Alfaya
        </Link>
        <div className='flex items-center gap-6'>
          <Link
            href='/'
            className={cn(
              'transition-colors',
              pathname === '/'
                ? 'text-blue-600 dark:text-blue-400 text-glow-blue'
                : 'text-foreground hover:text-blue-600 dark:hover:text-blue-400'
            )}
          >
            {t.nav.home}
          </Link>
          <Link
            href='/projects'
            className={cn(
              'transition-colors',
              pathname === '/projects'
                ? 'text-blue-600 dark:text-blue-400 text-glow-blue'
                : 'text-foreground hover:text-blue-600 dark:hover:text-blue-400'
            )}
          >
            {t.nav.projects}
          </Link>
          <LanguageSwitcher />
          <Link href='/contact'>
            <Button
              variant='outline'
              size='sm'
              className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
            >
              {t.nav.contact}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
