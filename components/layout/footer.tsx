'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className='border-t border-border py-8 px-6 bg-background/80 backdrop-blur-sm'>
      <div className='max-w-6xl mx-auto flex items-center justify-between'>
        <p className='text-muted-foreground'>{t.footer.copyright}</p>
        <div className='flex items-center gap-4'>
          <Link
            href='https://github.com/felipealfaya'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <Github className='w-5 h-5' />
          </Link>
          <Link
            href='https://www.linkedin.com/in/felipealfaya/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <Linkedin className='w-5 h-5' />
          </Link>
          <Link
            href='mailto:alfayadev@gmail.com'
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <Mail className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </footer>
  )
}
