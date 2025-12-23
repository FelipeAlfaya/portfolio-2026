'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ExternalLink,
  Code,
  Smartphone,
  ArrowLeft,
  Mail,
} from 'lucide-react'
import { SpotlightCursor } from '@/components/spotlight-cursor'
import { useTranslation } from '@/hooks/use-translation'
import Image from 'next/image'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      image: <Smartphone className='w-16 h-16 text-white/60' />,
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
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden bg-grid-blue'>
      <SpotlightCursor mousePosition={mousePosition} />

      <Navbar />

      {/* Header */}
      <section className='pt-32 pb-12 px-6'>
        <div className='max-w-6xl mx-auto'>
          <Link
            href='/'
            className='inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t.projectsPage.backToHome}
          </Link>
          <h1 className='text-5xl md:text-6xl py-2 font-bold mb-6 text-blue-600 text-glow-blue'>
            {t.projectsPage.title}
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl'>
            {t.projectsPage.subtitle}
          </p>
        </div>
      </section>



      {/* Projects Grid */}
      <section className='pb-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((project, index) => (
              <Card
                key={index}
                className='bg-card border-border hover:bg-accent transition-all duration-300 group'
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
                    ) : (
                      project.image
                    )}
                  </div>
                  <CardTitle className='text-card-foreground group-hover:text-blue-400 transition-colors'>
                    {project.title}
                  </CardTitle>
                  <CardDescription className='text-muted-foreground'>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant='secondary'
                        className='bg-secondary text-secondary-foreground border-border text-xs'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent flex-1'
                      asChild
                    >
                      <Link href={project.demoUrl} target='_blank'>
                        <ExternalLink className='w-4 h-4 mr-2' />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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

      {/* Contact Section */}
      <section className='py-20 px-6 border-t border-border'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold mb-6'>
            {t.contact.title}
          </h2>
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

      <Footer />
    </div>
  )
}

