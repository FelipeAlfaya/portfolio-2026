'use client'

import React, { useRef } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import { motion, useInView } from 'framer-motion'

interface TimelineItem {
  type: 'work' | 'education'
  company: string
  role: string
  period: string
  location?: string
  description: string
  tags: string[]
  url?: string
  active?: boolean
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Dot on the timeline */}
      <div className='absolute left-[15px] md:left-1/2 md:-translate-x-1/2 z-10'>
        <motion.div
          initial={{ scale: 0. }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
            item.active
              ? 'bg-violet-500/20 border-violet-500/40 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
              : 'bg-white/[0.03] border-white/[0.08]'
          }`}
        >
          {item.type === 'work' ? (
            <Briefcase className={`w-4 h-4 ${item.active ? 'text-violet-400' : 'text-muted-foreground'}`} />
          ) : (
            <GraduationCap className={`w-4 h-4 ${item.active ? 'text-violet-400' : 'text-muted-foreground'}`} />
          )}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`ml-16 md:ml-0 md:w-[calc(50%-48px)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}
      >
        <div className='group relative rounded-2xl transition-all duration-200'>
          {/* Animated gradient border on hover */}
          <div className='absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/0 via-violet-500/0 to-violet-500/0 group-hover:from-violet-500/20 group-hover:via-transparent group-hover:to-violet-400/10 transition-all duration-500' />

          <div className='relative card-glass rounded-2xl p-6 md:p-7 overflow-hidden'>
            {/* Subtle corner accent */}
            <div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/[0.04] to-transparent rounded-bl-full pointer-events-none' />

            {/* Active badge */}
            {item.active && (
              <div className='mb-4'>
                <span className='inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20'>
                  <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse' />
                  {item.period.split('—')[1]?.trim()}
                </span>
              </div>
            )}

            {/* Company & Role */}
            <div className='mb-4'>
              <div className='flex items-center gap-2'>
                <h3 className='text-xl font-bold text-foreground'>
                  {item.company}
                </h3>
                {item.url && (
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground/40 hover:text-violet-400 transition-colors'
                  >
                    <ExternalLink className='w-3.5 h-3.5' />
                  </a>
                )}
              </div>
              <p className='text-violet-400/80 text-sm font-medium mt-1'>{item.role}</p>
            </div>

            {/* Meta row */}
            <div className='flex flex-wrap items-center gap-4 mb-5'>
              <span className='flex items-center gap-1.5 text-xs text-muted-foreground/70'>
                <Calendar className='w-3 h-3' />
                {item.period}
              </span>
              {item.location && (
                <span className='flex items-center gap-1.5 text-xs text-muted-foreground/70'>
                  <MapPin className='w-3 h-3' />
                  {item.location}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className='w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5' />

            {/* Description */}
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {item.description}
            </p>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className='flex flex-wrap gap-1.5 mt-5'>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-[10px] font-medium select-none px-2.5 py-1 rounded-lg bg-white/[0.03] text-muted-foreground/80 border border-white/[0.06] transition-colors duration-200 group-hover:border-violet-500/10 group-hover:text-muted-foreground'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Spacer for the other side */}
      <div className='hidden md:block md:w-[calc(50%-48px)]' />
    </div>
  )
}

export function ExperienceSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const timeline: TimelineItem[] = [
    {
      type: 'work',
      company: 'Facilize',
      role: t.experience.facilize.role,
      period: '2023 — ' + t.experience.present,
      location: 'Salvador, BA',
      description: t.experience.facilize.description,
      tags: ['Next.js', 'Nest.js', 'PostgreSQL', 'TypeScript', 'ERP/CRM', 'AWS'],
      url: 'https://facilize.com.br',
      active: true,
    },
    {
      type: 'work',
      company: 'Senai Cimatec',
      role: t.experience.senai.role,
      period: '2022 — ' + t.experience.present,
      location: 'Salvador, BA',
      description: t.experience.senai.description,
      tags: ['Golang', 'Next.js', 'Nest.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript', 'SCRUM'],
      active: true,
    },
    {
      type: 'work',
      company: 'Freelance',
      role: t.experience.freelance.role,
      period: '2021 — 2022',
      description: t.experience.freelance.description,
      tags: ['TypeScript', 'Next.js', 'Angular', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker'],
    },
    {
      type: 'education',
      company: t.experience.ucsal.institution,
      role: t.experience.ucsal.degree,
      period: '2023 — 2025',
      location: 'Salvador, BA',
      description: t.experience.ucsal.description,
      tags: [],
    },
    {
      type: 'education',
      company: 'Senai Cimatec',
      role: t.experience.senaiEdu.degree,
      period: '2021 — 2023',
      location: 'Salvador, BA',
      description: t.experience.senaiEdu.description,
      tags: [],
    },
  ]

  return (
    <section ref={sectionRef} className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-20'
        >
          <div>
            <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
              {t.experience.label}
            </span>
            <h2 className='text-4xl md:text-5xl font-bold leading-tight'>
              {t.experience.title}
            </h2>
          </div>
          <p className='text-muted-foreground text-lg max-w-md lg:text-right'>
            {t.experience.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className='relative'>
          {/* Vertical line — gradient glow */}
          <div className='absolute left-[34px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px'>
            <div className='w-full h-full bg-gradient-to-b from-violet-500/40 via-violet-500/15 to-transparent' />
            {/* Pulsing glow at the top */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3 h-12 bg-violet-500/20 blur-md animate-pulse' />
          </div>

          <div className='space-y-8 md:space-y-16'>
            {timeline.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Timeline end dot */}
          <div className='absolute left-[27px] md:left-1/2 md:-translate-x-1/2 -bottom-4'>
            <div className='w-6 h-6 rounded-full bg-background border border-white/[0.06] flex items-center justify-center'>
              <div className='w-2 h-2 rounded-full bg-violet-500/30' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
