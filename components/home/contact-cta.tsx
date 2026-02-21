'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export function ContactCTA() {
  const { t } = useTranslation()

  return (
    <section className='py-24 px-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='relative card-glass rounded-3xl p-10 md:p-16 text-center overflow-hidden'>
          {/* Background glow */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/[0.07] rounded-full blur-[100px] pointer-events-none' />

          <div className='relative z-10'>
            <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block'>
              {t.contact.getInTouch}
            </span>
            <h2 className='text-3xl md:text-5xl font-bold mb-6 leading-tight'>
              {t.contact.title}
            </h2>
            <p className='text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed'>
              {t.contact.subtitle}
            </p>
            <Link href='/contact'>
              <Button
                size='lg'
                className='btn-gradient text-white dark:text-white border-0'
              >
                <Mail className='w-5 h-5 mr-2' />
                {t.contact.getInTouch}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
