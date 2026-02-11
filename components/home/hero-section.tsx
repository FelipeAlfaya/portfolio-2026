'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import { useTypewriter } from '@/hooks/use-typewriter'

export function HeroSection() {
  const { t, language } = useTranslation()
  const typewriterText = useTypewriter(t.hero.title, 100)

  const handleDownloadCV = () => {
    const cvPath =
      language === 'pt' ? '/PTBR-CURRICULUM.pdf' : '/ENUS-CURRICULUM.pdf'

    const link = document.createElement('a')
    link.href = cvPath
    link.download = cvPath.split('/').pop() || 'curriculum.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className='pt-32 pb-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <div className='min-h-[120px] md:min-h-[160px] flex items-center justify-center'>
            <h1 className='text-6xl md:text-8xl font-bold mb-6 text-blue-600 py-2 text-glow-blue'>
              {typewriterText}
              <span className='animate-pulse'>|</span>
            </h1>
          </div>
          <p className='text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto'>
            {t.hero.subtitle}
          </p>
          <div className='flex items-center justify-center gap-4 mb-12'>
            <Link href='/projects'>
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
              >
                {t.hero.viewWork}
              </Button>
            </Link>
            <Button
              variant='outline'
              size='lg'
              className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
              onClick={handleDownloadCV}
            >
              {t.hero.downloadCV}
            </Button>
          </div>
          <div className='flex items-center justify-center gap-6'>
            <Link
              href='https://github.com/felipealfaya'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Github className='w-6 h-6' />
            </Link>
            <Link
              href='https://www.linkedin.com/in/felipealfaya/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Linkedin className='w-6 h-6' />
            </Link>
            <Link
              href='mailto:alfayadev@gmail.com'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Mail className='w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
