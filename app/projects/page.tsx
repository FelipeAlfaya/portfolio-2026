'use client'

import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Smartphone } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import { PageBackground } from '@/components/page-background'
import { ProjectCard } from '@/components/ui/project-card'

export default function ProjectsPage() {
  const { t } = useTranslation()

  const projects = [
    {
      title: 'Facilize',
      description: t.projectsPage.facilize.description,
      image: 'facilize',
      technologies: [
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'React Native',
        'Docker',
        'Redis',
        'Nest.JS',
        'Prisma',
        'Tailwind CSS',
        'Socket.io',
        'CI/CD',
        'Stripe',
      ],
      demoUrl: 'https://facilize.com.br',
      category: 'Full Stack',
      gradient: 'from-blue-600/30 to-purple-600/30',
    },
    {
      title: 'Netflix Clone',
      description: t.projectsPage.netflix.description,
      image: 'netflix',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://netflix-clone-teal-seven.vercel.app/',
      category: 'Frontend',
      gradient: 'from-red-600/30 to-black/30',
    },
    {
      title: 'Old Portfolio Website',
      description: t.projectsPage.portfolio.description,
      image: <Smartphone className='w-16 h-16 text-white/60' /> as React.ReactNode,
      technologies: ['Next.JS', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://felipe-alfaya.vercel.app/',
      category: 'Frontend',
      gradient: 'from-green-600/30 to-blue-600/30',
    },
    {
      title: 'Pokedex',
      description: t.projectsPage.pokedex.description,
      image: 'pokedex',
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://pokedex-liart-three.vercel.app/',
      category: 'Frontend',
      gradient: 'from-red-500/30 to-white/30',
    },
  ]

  return (
    <PageBackground showDarkVeil={true}>
      <Navbar />

      {/* Header */}
      <section className='relative pt-32 pb-16 px-6 overflow-hidden'>
        <div className='relative z-10 max-w-7xl mx-auto'>
          <Link
            href='/'
            className='group inline-flex items-center text-muted-foreground hover:text-violet-400 transition-colors mb-10 text-sm'
          >
            <ArrowLeft className='w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1' />
            {t.projectsPage.backToHome}
          </Link>

          <div className='max-w-2xl'>
            <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
              {t.projects.label}
            </span>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              {t.projectsPage.title}
            </h1>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              {t.projectsPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='pb-24 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                techs={project.technologies}
                demoUrl={project.demoUrl}
                gradient={project.gradient}
                category={project.category}
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className='text-center py-16'>
              <p className='text-muted-foreground text-lg'>
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className='py-24 px-6'>
        <div className='section-divider mb-20' />
        <div className='max-w-3xl mx-auto text-center'>
          <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block'>
            {t.contact.getInTouch}
          </span>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
            {t.contact.title}
          </h2>
          <p className='text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed'>
            {t.contact.subtitle}
          </p>
          <Link href='/contact'>
            <Button
              size='lg'
              className='btn-gradient text-white dark:text-white border-0 px-8 py-6 text-base'
            >
              <Mail className='w-5 h-5 mr-2' />
              {t.contact.getInTouch}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </PageBackground>
  )
}
