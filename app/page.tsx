'use client'

import React, { useState, useEffect } from 'react'
import { SpotlightCursor } from '@/components/spotlight-cursor'
import { GitHubStats } from '@/components/github-stats'
import { useTranslation } from '@/hooks/use-translation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { AboutSection } from '@/components/home/about-section'
import { ServicesSection } from '@/components/home/services-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { ContactCTA } from '@/components/home/contact-cta'

export default function HomePage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden bg-grid-blue'>
      <SpotlightCursor mousePosition={mousePosition} />

      <Navbar />

      <HeroSection />

      <AboutSection />

      <ServicesSection />

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

      <FeaturedProjects />

      <ContactCTA />

      <Footer />
    </div>
  )
}
