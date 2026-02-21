'use client'

import React from 'react'
import { GitHubStats } from '@/components/github-stats'
import { useTranslation } from '@/hooks/use-translation'

export function GitHubSection() {
  const { t } = useTranslation()

  return (
    <section className='relative py-24 px-6'>
      <div className='relative z-10 max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12'>
          <div>
            <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
              GitHub
            </span>
            <h2 className='text-4xl md:text-5xl font-bold leading-tight'>
              {t.github.title}
            </h2>
          </div>
          <p className='text-muted-foreground text-lg max-w-md lg:text-right'>
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
