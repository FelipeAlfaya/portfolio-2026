'use client'

import React from 'react'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

interface TimelineItem {
  type: 'work' | 'education'
  company: string
  role: string
  period: string
  location?: string
  description: string
  tags: string[]
}

export function ExperienceSection() {
  const { t } = useTranslation()

  const timeline: TimelineItem[] = [
    {
      type: 'work',
      company: 'Facilize',
      role: t.experience.facilize.role,
      period: '2023 — ' + t.experience.present,
      location: 'Salvador, BA',
      description: t.experience.facilize.description,
      tags: ['Next.js', 'Nest.js', 'PostgreSQL', 'TypeScript', 'ERP/CRM', 'AWS'],
    },
    {
      type: 'work',
      company: 'Senai Cimatec',
      role: t.experience.senai.role,
      period: '2022 — ' + t.experience.present,
      location: 'Salvador, BA',
      description: t.experience.senai.description,
      tags: ['Golang', 'Next.js', 'Nest.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript', 'SCRUM'],
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
    <section className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16'>
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
        </div>

        {/* Timeline */}
        <div className='relative'>
          {/* Vertical line */}
          <div className='absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 via-violet-500/10 to-transparent' />

          <div className='space-y-12'>
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on the line */}
                  <div className='absolute left-[12px] md:left-1/2 md:-translate-x-1/2 z-10'>
                    <div className='w-[15px] h-[15px] rounded-full border-2 border-violet-500/60 bg-background flex items-center justify-center'>
                      <div className='w-[7px] h-[7px] rounded-full bg-violet-500/80' />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                    <div className='card-glass rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/20 hover:shadow-[0_0_30px_rgba(82,39,255,0.06)]'>
                      {/* Header */}
                      <div className='flex items-start gap-3 mb-4'>
                        <div className='p-2 rounded-xl bg-violet-500/10 text-violet-400 mt-0.5'>
                          {item.type === 'work' ? (
                            <Briefcase className='w-4 h-4' />
                          ) : (
                            <GraduationCap className='w-4 h-4' />
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-lg font-bold text-foreground'>{item.company}</h3>
                          <p className='text-violet-400 text-sm font-medium'>{item.role}</p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className='flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground'>
                        <span className='font-mono'>{item.period}</span>
                        {item.location && (
                          <span className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags.length > 0 && (
                        <div className='flex flex-wrap gap-1.5 select-none'>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className='text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.03] text-muted-foreground border border-white/[0.06]'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className='hidden md:block md:w-[calc(50%-40px)]' />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
