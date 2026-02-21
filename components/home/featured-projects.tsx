'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslation } from '@/hooks/use-translation'

export function FeaturedProjects() {
  const { t } = useTranslation()

  return (
    <section className='py-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-4xl font-bold'>{t.projects.title}</h2>
          <Link href='/projects'>
            <Button
              variant='outline'
              className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
            >
              {t.projects.viewAll}
              <ExternalLink className='w-4 h-4 ml-2' />
            </Button>
          </Link>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
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
            },
            {
              title: 'Netflix Clone',
              description: t.projectsPage.netflix.description,
              image: 'netflix',
              techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
              demoUrl: 'https://netflix-clone-teal-seven.vercel.app/',
              gradient: 'from-red-600/30 to-black/30',
            },
            {
              title: 'Pokedex',
              description: t.projectsPage.pokedex.description,
              image: 'pokedex',
              techs: ['Angular', 'TypeScript', 'Tailwind CSS'],
              demoUrl: 'https://pokedex-liart-three.vercel.app/',
              gradient: 'from-red-500/30 to-white/30',
            },
          ].map((project, index) => (
            <Card
              key={index}
              className='card-glass hover:bg-accent/50 transition-all duration-300 group'
            >
              <CardHeader>
                <div
                  className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-4 flex items-center justify-center`}
                >
                  {project.image === 'facilize' ? (
                    <Image
                      src='/logo-facilize-color.svg'
                      alt='Facilize Logo'
                      width={64}
                      height={64}
                      className='object-contain'
                    />
                  ) : project.image === 'netflix' ? (
                    <Image
                      src='/netflix.webp'
                      alt='Netflix Logo'
                      width={64}
                      height={64}
                      className='object-contain'
                    />
                  ) : project.image === 'pokedex' ? (
                    <Image
                      src='/pokeball.png'
                      alt='Pokeball Logo'
                      width={64}
                      height={64}
                      className='object-contain'
                    />
                  ) : null}
                </div>
                <CardTitle className='text-card-foreground group-hover:text-violet-400 transition-colors'>
                  {project.title}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.techs.map((tech) => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className='badge-violet text-xs'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
                    asChild
                  >
                    <Link href={project.demoUrl} target='_blank'>
                      <ExternalLink className='w-4 h-4 mr-2' />
                      {t.projects.liveDemo}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
