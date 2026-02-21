'use client'

import React from 'react'
import CardSwap, { SwapCard } from '@/components/ui/card-swap'
import { Code, Palette, Smartphone, Database, Cloud, Server } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export function ServicesSection() {
  const { t } = useTranslation()

  const services = [
    {
      icon: <Code className='w-10 h-10' />,
      title: t.services.frontend.title,
      description: t.services.frontend.description,
    },
    {
      icon: <Palette className='w-10 h-10' />,
      title: t.services.uiux.title,
      description: t.services.uiux.description,
    },
    {
      icon: <Smartphone className='w-10 h-10' />,
      title: t.services.mobile.title,
      description: t.services.mobile.description,
    },
    {
      icon: <Database className='w-10 h-10' />,
      title: t.services.backend.title,
      description: t.services.backend.description,
    },
    {
      icon: <Server className='w-10 h-10' />,
      title: t.services.api.title,
      description: t.services.api.description,
    },
    {
      icon: <Cloud className='w-10 h-10' />,
      title: t.services.devops.title,
      description: t.services.devops.description,
    },
  ]

  const highlights = ['React', 'Next.js', 'Node.js', 'AWS', 'Flutter', 'TypeScript']

  return (
    <section className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-16 lg:gap-24'>
          {/* Left side — Text content */}
          <div className='flex-1 max-w-xl'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='text-violet-400 text-sm font-medium tracking-widest uppercase'>
                {t.services.label}
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
              {t.services.title}
            </h2>
            <p className='text-muted-foreground text-lg mb-6 leading-relaxed'>
              {t.services.subtitle}
            </p>
            <p className='text-muted-foreground/80 text-base mb-10 leading-relaxed'>
              {t.services.description}
            </p>

            <div className='flex flex-wrap gap-2'>
              {highlights.map((tech) => (
                <span
                  key={tech}
                  className='badge-violet text-sm px-4 py-1.5 rounded-full transition-colors duration-200 hover:border-violet-500/40'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right side — CardSwap */}
          <div className='flex-1 flex justify-center lg:justify-end'>
            <div style={{ width: 500, height: 520, position: 'relative' }}>
              <CardSwap
                width={500}
                height={420}
                cardDistance={45}
                verticalDistance={50}
                delay={5000}
                pauseOnHover={true}
              >
                {services.map((service, index) => (
                  <SwapCard
                    key={index}
                    className='card-glass p-10 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(82,39,255,0.08)]'
                  >
                    <div className='text-violet-500 mb-6 bg-violet-500/10 p-5 rounded-2xl'>
                      {service.icon}
                    </div>
                    <h3 className='text-2xl font-bold mb-4 text-card-foreground'>
                      {service.title}
                    </h3>
                    <p className='text-muted-foreground text-base leading-relaxed max-w-sm'>
                      {service.description}
                    </p>
                  </SwapCard>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
