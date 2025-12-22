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
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
} from 'lucide-react'
import { SpotlightCursor } from '@/components/spotlight-cursor'
import { GitHubStats } from '@/components/github-stats'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslation } from '@/hooks/use-translation'
import { useTypewriter } from '@/hooks/use-typewriter'
import Image from 'next/image'

export default function HomePage() {
  const { t, language } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const typewriterText = useTypewriter(t.hero.title, 100)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleDownloadCV = () => {
    const cvPath =
      language === 'pt' ? '/PTBR-CURRICULUM.pdf' : '/ENUS-CURRICULUM.pdf'

    const link = document.createElement('a')
    link.href = cvPath
    link.download = cvPath.split('/').pop() || 'curriculum.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Tailwind CSS',
    'GraphQL',
    'AWS',
    'Docker',
    'Git',
    'Figma',
  ]

  const services = [
    {
      icon: <Code className='w-8 h-8' />,
      title: t.services.frontend.title,
      description: t.services.frontend.description,
    },
    {
      icon: <Palette className='w-8 h-8' />,
      title: t.services.uiux.title,
      description: t.services.uiux.description,
    },
    {
      icon: <Smartphone className='w-8 h-8' />,
      title: t.services.mobile.title,
      description: t.services.mobile.description,
    },
  ]

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
            <Link
              href='/'
              className='hover:text-blue-600 hover:text-glow-blue transition-colors'
            >
              {t.nav.home}
            </Link>
            <Link
              href='/projects'
              className='hover:text-blue-600 hover:text-glow-blue transition-colors'
            >
              {t.nav.projects}
            </Link>
            <LanguageSwitcher />
            <Button
              variant='outline'
              size='sm'
              className='border-white/20 hover:bg-white/15 hover:text-white text-white bg-transparent hover:border-white/30'
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='pt-32 pb-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h1 className='text-6xl md:text-8xl font-bold mb-6 text-blue-600 py-2 text-glow-blue'>
              {typewriterText}
              <span className='animate-pulse'>|</span>
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto'>
              {t.hero.subtitle}
            </p>
            <div className='flex items-center justify-center gap-4 mb-12'>
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
              >
                {t.hero.viewWork}
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
                onClick={handleDownloadCV}
              >
                {t.hero.downloadCV}
              </Button>
            </div>
            <div className='flex items-center justify-center gap-6'>
              <Link
                href='https://github.com/felipealfaya'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <Github className='w-6 h-6' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/felipealfaya/'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <Linkedin className='w-6 h-6' />
              </Link>
              <Link
                href='mailto:alfayadev@gmail.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <Mail className='w-6 h-6' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='py-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <h2 className='text-4xl font-bold mb-6'>{t.about.title}</h2>
              <p className='text-muted-foreground text-lg mb-6 leading-relaxed'>
                {t.about.description1}
              </p>
              <p className='text-muted-foreground text-lg mb-8 leading-relaxed'>
                {t.about.description2}
              </p>
              <div className='flex flex-wrap gap-2'>
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className='relative'>
              <div className='w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-border flex items-center justify-center'>
                <div className='text-center'>
                  <Image
                    src='./pixel-art.svg'
                    alt='Profile Image'
                    width={300}
                    height={300}
                    className='object-cover animate-float'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4'>{t.services.title}</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              {t.services.subtitle}
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Card
                key={index}
                className='bg-card border-border hover:bg-accent transition-all duration-300'
              >
                <CardHeader>
                  <div className='text-blue-400 mb-4'>{service.icon}</div>
                  <CardTitle className='text-card-foreground'>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-muted-foreground'>
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Stats Section */}
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

      {/* Featured Projects Preview */}
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
          <div className='grid md:grid-cols-2 gap-8'>
            <Card className='bg-card border-border hover:bg-accent transition-all duration-300 group'>
              <CardHeader>
                <div className='w-full h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg mb-4 flex items-center justify-center'>
                  <Code className='w-16 h-16 text-muted-foreground' />
                </div>
                <CardTitle className='text-card-foreground group-hover:text-blue-400 transition-colors'>
                  {t.projects.ecommerce.title}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {t.projects.ecommerce.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2 mb-4'>
                  <Badge
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    Stripe
                  </Badge>
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
                  >
                    <ExternalLink className='w-4 h-4 mr-2' />
                    <Link href='https://facilize.com.br' target='_blank'>
                      {t.projects.liveDemo}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* <Card className='bg-card border-border hover:bg-accent transition-all duration-300 group'>
              <CardHeader>
                <div className='w-full h-48 bg-gradient-to-br from-green-600/30 to-blue-600/30 rounded-lg mb-4 flex items-center justify-center'>
                  <Smartphone className='w-16 h-16 text-muted-foreground' />
                </div>
                <CardTitle className='text-card-foreground group-hover:text-blue-400 transition-colors'>
                  {t.projects.taskManagement.title}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {t.projects.taskManagement.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2 mb-4'>
                  <Badge
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    React
                  </Badge>
                  <Badge
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant='secondary'
                    className='bg-secondary text-secondary-foreground border-border'
                  >
                    Socket.io
                  </Badge>
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
                  >
                    <Github className='w-4 h-4 mr-2' />
                    {t.projects.code}
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
                  >
                    <ExternalLink className='w-4 h-4 mr-2' />
                    {t.projects.liveDemo}
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold mb-6'>{t.contact.title}</h2>
          <p className='text-muted-foreground text-lg mb-8 max-w-2xl mx-auto'>
            {t.contact.subtitle}
          </p>
          <Button
            size='lg'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
          >
            <Mail className='w-5 h-5 mr-2' />
            {t.contact.getInTouch}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border py-8 px-6'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <p className='text-muted-foreground'>{t.footer.copyright}</p>
          <div className='flex items-center gap-4'>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Github className='w-5 h-5' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Linkedin className='w-5 h-5' />
            </Link>
            <Link
              href='#'
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

