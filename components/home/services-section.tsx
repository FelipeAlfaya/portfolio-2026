'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Palette, Smartphone, Database, Cloud, Server } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export function ServicesSection() {
  const { t } = useTranslation()

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
    {
      icon: <Database className='w-8 h-8' />,
      title: t.services.backend.title,
      description: t.services.backend.description,
    },
    {
      icon: <Server className='w-8 h-8' />,
      title: t.services.api.title,
      description: t.services.api.description,
    },
    {
      icon: <Cloud className='w-8 h-8' />,
      title: t.services.devops.title,
      description: t.services.devops.description,
    },
  ]

  return (
    <section className='py-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-4'>{t.services.title}</h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t.services.subtitle}
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <Card
              key={index}
              className='card-glass hover:bg-accent/50 transition-all duration-300'
            >
              <CardHeader>
                <div className='text-violet-500 mb-4'>{service.icon}</div>
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
  )
}
