'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export function Footer() {
  const { t } = useTranslation()

  const links = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.projects, href: '/projects' },
    { label: t.nav.contact, href: '/contact' },
  ]

  const socials = [
    {
      icon: <Github className='w-4 h-4' />,
      href: 'https://github.com/felipealfaya',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className='w-4 h-4' />,
      href: 'https://www.linkedin.com/in/felipealfaya/',
      label: 'LinkedIn',
    },
    {
      icon: <Mail className='w-4 h-4' />,
      href: 'mailto:alfayadev@gmail.com',
      label: 'Email',
    },
  ]

  return (
    <footer className='border-t border-white/[0.06] py-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          {/* Brand */}
          <div className='flex items-center gap-3'>
            <span className='text-lg font-bold text-foreground'>&lt;/&gt;</span>
            <span className='text-sm text-muted-foreground'>Felipe Alfaya</span>
          </div>

          {/* Nav links */}
          <nav className='flex items-center gap-6'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm text-muted-foreground hover:text-violet-400 transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className='flex items-center gap-3'>
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel='noopener noreferrer'
                aria-label={social.label}
                className='w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/30 transition-all duration-200'
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-8 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-muted-foreground/60'>
            {t.footer.copyright}
          </p>
          <p className='text-xs text-muted-foreground/40'>
            Built with Next.js, TypeScript & ♥
          </p>
        </div>
      </div>
    </footer>
  )
}
