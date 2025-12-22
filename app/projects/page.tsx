'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
  ArrowLeft,
  Search,
} from 'lucide-react'
import { SpotlightCursor } from '@/components/spotlight-cursor'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslation } from '@/hooks/use-translation'
import Image from 'next/image'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

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
      category: 'Full Stack',
      gradient: 'from-blue-600/30 to-purple-600/30',
    },
    // {
    //   title: 'E-Commerce Platform',
    //   description:
    //     'A full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.',
    //   image: <Code className='w-16 h-16 text-muted-foreground' />,
    //   technologies: [
    //     'Next.js',
    //     'TypeScript',
    //     'Stripe',
    //     'PostgreSQL',
    //     'Tailwind CSS',
    //   ],
    //   category: 'Full Stack',
    //   gradient: 'from-blue-600/30 to-purple-600/30',
    // },
    // {
    //   title: 'Task Management App',
    //   description:
    //     'Collaborative task management application with real-time updates and team collaboration features.',
    //   image: <Smartphone className='w-16 h-16 text-white/60' />,
    //   technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    //   category: 'Full Stack',
    //   gradient: 'from-green-600/30 to-blue-600/30',
    // },
    // {
    //   title: 'Portfolio Website',
    //   description:
    //     'A modern, responsive portfolio website with interactive animations and smooth scrolling.',
    //   image: <Globe className='w-16 h-16 text-muted-foreground' />,
    //   technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    //   category: 'Frontend',
    //   gradient: 'from-purple-600/30 to-pink-600/30',
    // },
    // {
    //   title: 'Weather Dashboard',
    //   description:
    //     'Real-time weather dashboard with location-based forecasts and interactive maps.',
    //   image: <Database className='w-16 h-16 text-muted-foreground' />,
    //   technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS Modules'],
    //   category: 'Frontend',
    //   gradient: 'from-cyan-600/30 to-blue-600/30',
    // },
    // {
    //   title: 'Social Media API',
    //   description:
    //     'RESTful API for a social media platform with authentication, posts, and user management.',
    //   image: <Database className='w-16 h-16 text-muted-foreground' />,
    //   technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    //   category: 'Backend',
    //   gradient: 'from-orange-600/30 to-red-600/30',
    // },
    // {
    //   title: 'Crypto Tracker',
    //   description:
    //     'Cryptocurrency tracking application with real-time prices and portfolio management.',
    //   image: <Globe className='w-16 h-16 text-muted-foreground' />,
    //   technologies: [
    //     'React',
    //     'Redux',
    //     'CoinGecko API',
    //     'Chart.js',
    //     'Material-UI',
    //   ],
    //   category: 'Frontend',
    //   gradient: 'from-yellow-600/30 to-orange-600/30',
    // },
  ]

  const categories = [
    t.projectsPage.allCategories,
    'Full Stack',
    'Frontend',
    'Backend',
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden bg-grid-blue'>
      <SpotlightCursor mousePosition={mousePosition} />

      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link href='/' className='text-xl font-bold'>
            Felipe Alfaya
          </Link>
          <div className='flex items-center gap-6'>
            <Link href='/' className='hover:text-blue-400 transition-colors'>
              {t.nav.home}
            </Link>
            <Link href='/projects' className='text-blue-400'>
              {t.nav.projects}
            </Link>
            <LanguageSwitcher />
            <Button
              variant='outline'
              size='sm'
              className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>
      </nav>

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

      {/* Filters */}
      <section className='pb-12 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
              <Input
                placeholder={t.projectsPage.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground'
              />
            </div>
            <div className='flex gap-2'>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
                      : 'border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='pb-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProjects.map((project, index) => (
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
                    >
                      <ExternalLink className='w-4 h-4 mr-2' />
                      <Link href='https://facilize.com.br' target='_blank'>
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
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
            Interested in Working Together?
          </h2>
          <p className='text-muted-foreground text-lg mb-8 max-w-2xl mx-auto'>
            I'm always open to discussing new opportunities and interesting
            projects.
          </p>
          <Button
            size='lg'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
          >
            <Mail className='w-5 h-5 mr-2' />
            Let's Talk
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border py-8 px-6'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <p className='text-muted-foreground'>
            © 2025 Felipe Alfaya. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <Link
              href='https://github.com/felipealfaya'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Github className='w-5 h-5' />
            </Link>
            <Link
              href='https://www.linkedin.com/in/felipealfaya/'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Linkedin className='w-5 h-5' />
            </Link>
            <Link
              href='mailto:alfayadev@gmail.com'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Mail className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

