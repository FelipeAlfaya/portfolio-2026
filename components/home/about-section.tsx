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

const HIGHLIGHTS = [
  { label: '3+', desc: 'years' },
  { label: '50+', desc: 'projects' },
  { label: '30+', desc: 'technologies' },
]

export function AboutSection() {
  const { t } = useTranslation()

  const skillLogos = SKILLS.map(skill => ({
    src: `https://cdn.simpleicons.org/${skill.slug}${['nextdotjs', 'vercel'].includes(skill.slug) ? '/eee' : ''}`,
    alt: skill.name,
    title: skill.name
  }));

  return (
    <section className='py-24 relative'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-20'>
          {/* Left side — Avatar */}
          <div className='flex-shrink-0'>
            <div className='relative group'>
              {/* Outer glow — sits behind everything */}
              <div className='absolute -inset-8 rounded-full bg-violet-600/8 blur-[80px] pointer-events-none' />
              
              {/* Decorative ring — outer */}
              <div className='absolute -inset-4 rounded-full border border-violet-500/10' />
              
              {/* Decorative ring — dashed orbit */}
              <div className='absolute -inset-8 rounded-full border border-dashed border-white/[0.04] animate-[spin_60s_linear_infinite]' />
              
              {/* Dot accents on orbit */}
              <div className='absolute -inset-8 rounded-full animate-[spin_60s_linear_infinite]'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500/40' />
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400/30' />
              </div>

              {/* Main avatar container */}
              <div className='relative w-72 h-72 md:w-80 md:h-80 rounded-full flex items-center justify-center'
                style={{
                  background: 'linear-gradient(135deg, rgba(82,39,255,0.12) 0%, rgba(5,5,5,0.8) 40%, rgba(5,5,5,0.8) 60%, rgba(139,92,246,0.08) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  boxShadow: '0 0 60px rgba(82, 39, 255, 0.06), inset 0 0 60px rgba(0,0,0,0.4)',
                }}
              >
                <Image
                  src='./pixel-art.svg'
                  alt='Profile Image'
                  width={260}
                  height={260}
                  className='object-cover animate-float'
                />
              </div>
            </div>
          </div>

          {/* Right side — Text content */}
          <div className='flex-1 max-w-2xl'>
            <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
              {t.about.label}
            </span>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
              {t.about.title}
            </h2>
            <p className='text-muted-foreground text-lg mb-5 leading-relaxed'>
              {t.about.description1}
            </p>
            <p className='text-muted-foreground/80 text-base mb-10 leading-relaxed'>
              {t.about.description2}
            </p>

            {/* Stat counters */}
            <div className='flex gap-8 flex-wrap'>
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className='text-center'>
                  <p className='text-3xl md:text-4xl font-bold text-gradient-violet'>
                    {item.label}
                  </p>
                  <p className='text-xs text-muted-foreground uppercase tracking-wider mt-1'>
                    {t.about.stats?.[item.desc as keyof typeof t.about.stats] ?? item.desc}
                  </p>
                </div>
              ))}
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
