'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import { ProjectCard } from '@/components/ui/project-card'

export function FeaturedProjects() {
  const { t } = useTranslation()

  const projects = [
    {
      title: 'Facilize',
      description: t.projectsPage.facilize.description,
      image: 'facilize',
      techs: [
        'Next.js',
        'TypeScript',
        'Nest.JS',
        'PostgreSQL',
        'React Native',
        'Redis',
        'AWS',
        'Stripe',
      ],
      demoUrl: 'https://facilize.com.br',
      gradient: 'from-blue-600/30 to-purple-600/30',
      category: 'Full Stack',
    },
    {
      title: 'Netflix Clone',
      description: t.projectsPage.netflix.description,
      image: 'netflix',
      techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://netflix-clone-teal-seven.vercel.app/',
      gradient: 'from-red-600/30 to-black/30',
      category: 'Frontend',
    },
    {
      title: 'Pokedex',
      description: t.projectsPage.pokedex.description,
      image: 'pokedex',
      techs: ['Angular', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://pokedex-liart-three.vercel.app/',
      gradient: 'from-red-500/30 to-white/30',
      category: 'Frontend',
    },
  ]

  return (
    <section className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14'>
          <div>
            <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
              {t.projects.label}
            </span>
            <h2 className='text-4xl md:text-5xl font-bold leading-tight'>
              {t.projects.title}
            </h2>
          </div>
          <Link
            href='/projects'
            className='group inline-flex select-none items-center gap-2 text-muted-foreground hover:text-violet-400 transition-colors text-sm font-medium'
          >
            {t.projects.viewAll}
            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* Projects grid */}
        <div className='grid md:grid-cols-2 select-none lg:grid-cols-3 gap-6'>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              techs={project.techs}
              demoUrl={project.demoUrl}
              gradient={project.gradient}
              category={project.category}
              featured
            />
          ))}
        </div>
      </div>
    </section>
  )
}
