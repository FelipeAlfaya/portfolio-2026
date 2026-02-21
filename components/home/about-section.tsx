'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from '@/hooks/use-translation'
import LogoLoop from '@/components/ui/logo-loop'

const SKILLS = [
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'NestJS', slug: 'nestjs' },
  { name: 'Python', slug: 'python' },
  { name: 'Go', slug: 'go' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Prisma', slug: 'prisma' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'SASS', slug: 'sass' },
  { name: 'Redux', slug: 'redux' },
  { name: 'Framer Motion', slug: 'framer' },
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub Actions', slug: 'githubactions' },
  { name: 'BitBucket', slug: 'bitbucket' },
  { name: 'Google Cloud', slug: 'googlecloud' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'React Native', slug: 'react' },
  { name: 'Flutter', slug: 'flutter' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Jest', slug: 'jest' },
  { name: 'Cypress', slug: 'cypress' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Figma', slug: 'figma' },
]

export function AboutSection() {
  const { t } = useTranslation()

  const skillLogos = SKILLS.map(skill => ({
    src: `https://cdn.simpleicons.org/${skill.slug}${['nextdotjs', 'vercel'].includes(skill.slug) ? '/eee' : ''}`, // Use light gray for black logos
    alt: skill.name,
    title: skill.name
  }));

  return (
    <section className='py-20 relative overflow-hidden'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-16 items-center mb-16'>
          <div>
            <h2 className='text-4xl font-bold mb-6'>{t.about.title}</h2>
            <p className='text-muted-foreground text-lg mb-6 leading-relaxed'>
              {t.about.description1}
            </p>
            <p className='text-muted-foreground text-lg mb-8 leading-relaxed'>
              {t.about.description2}
            </p>
          </div>
          <div className='relative'>
            <div className='w-full h-96 rounded-2xl flex items-center justify-center'>
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
      
      {/* Full width LogoLoop below the content */}
      <div className='w-full overflow-hidden pt-10 pb-20'>
        <LogoLoop 
          logos={skillLogos}
          speed={25}
          gap={60}
          logoHeight={50}
          fadeOut={true}
          pauseOnHover={true}
          scaleOnHover={true}
        />
      </div>
    </section>
  )
}
