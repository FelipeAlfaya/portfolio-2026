'use client'

import React from 'react'
import { GitHubStats } from '@/components/github-stats'
import { useTranslation } from '@/hooks/use-translation'

export function GitHubSection() {
  const { t } = useTranslation()

  return (
    <section className='py-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-4 text-white'>
            {t.github.title}
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t.github.subtitle}
          </p>
        </div>
        <GitHubStats
          username={process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'felipealfaya'}
        />
      </div>
    </section>
  )
}
