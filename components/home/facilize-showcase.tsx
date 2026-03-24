'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, GitBranch, Layers, Zap } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

const HIGHLIGHT_ICONS = [Shield, GitBranch, Layers, Zap]

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FacilizeShowcase() {
  const { t } = useTranslation()
  const c = t.facilizeShowcase

  if (!c) return null

  return (
    <section className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        <AnimatedSection>
          <div className='relative card-glass rounded-3xl overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-violet-600/[0.08] via-transparent to-violet-400/[0.04] pointer-events-none' />
            <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/[0.06] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none' />

            <div className='relative z-10 p-8 md:p-12 lg:p-16'>
              <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-center'>
                <div className='flex-1 space-y-6'>
                  <span className='inline-flex items-center gap-2 text-violet-400 text-sm font-medium tracking-widest uppercase'>
                    <span className='w-2 h-2 rounded-full bg-violet-400 animate-pulse' />
                    {c.label}
                  </span>

                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
                    {c.title}
                  </h2>

                  <p className='text-muted-foreground text-lg leading-relaxed max-w-xl'>
                    {c.description}
                  </p>

                  <div className='flex flex-wrap gap-3 pt-2'>
                    {c.highlights?.map((highlight: string, i: number) => {
                      const Icon = HIGHLIGHT_ICONS[i] ?? Shield
                      return (
                        <span
                          key={i}
                          className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300'
                        >
                          <Icon className='w-3.5 h-3.5' />
                          {highlight}
                        </span>
                      )
                    })}
                  </div>

                  <Link
                    href='/projects/facilize'
                    className='group inline-flex items-center gap-2 mt-4 text-base font-semibold text-white hover:text-violet-300 transition-colors'
                  >
                    {c.cta}
                    <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                  </Link>
                </div>

                <div className='lg:w-[400px] flex-shrink-0'>
                  <div className='relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-violet-500/10'>
                    <Image
                      src='./facilize_dashboard.png'
                      alt='Facilize Platform'
                      fill
                      className='object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
