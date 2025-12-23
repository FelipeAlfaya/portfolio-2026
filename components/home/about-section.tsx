'use client'

import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/use-translation'

const SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'GraphQL',
  'AWS',
  'Docker',
  'Git',
  'Figma',
  'Golang',
  'React Native',
  'Flutter',
  'CI/CD',
]

export function AboutSection() {
  const { t } = useTranslation()

  return (
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
              {SKILLS.map((skill) => (
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
    </section>
  )
}
