'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export function ContactCTA() {
  const { t } = useTranslation()

  return (
    <section className='py-20 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-4xl font-bold mb-6'>{t.contact.title}</h2>
        <p className='text-muted-foreground text-lg mb-8 max-w-2xl mx-auto'>
          {t.contact.subtitle}
        </p>
        <Link href='/contact'>
          <Button
            size='lg'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
          >
            <Mail className='w-5 h-5 mr-2' />
            {t.contact.getInTouch}
          </Button>
        </Link>
      </div>
    </section>
  )
}
