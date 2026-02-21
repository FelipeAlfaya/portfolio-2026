'use client'

import React from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { AboutSection } from '@/components/home/about-section'
import { ServicesSection } from '@/components/home/services-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { ContactCTA } from '@/components/home/contact-cta'
import { PageBackground } from '@/components/page-background'
import { GitHubSection } from '@/components/home/github-section'

export default function HomePage() {
  return (
    <PageBackground showDarkVeil={true}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GitHubSection />
      <FeaturedProjects />
      <ContactCTA />
      <Footer />
    </PageBackground>
  )
}
