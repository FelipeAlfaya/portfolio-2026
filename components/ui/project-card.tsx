'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image: string | React.ReactNode
  techs: string[]
  demoUrl: string
  gradient: string
  category?: string
  featured?: boolean
}

export function ProjectCard({
  title,
  description,
  image,
  techs,
  demoUrl,
  gradient,
  category,
  featured = false,
}: ProjectCardProps) {
  const renderImage = () => {
    if (typeof image === 'string') {
      switch (image) {
        case 'facilize':
          return (
            <Image
              src='/logo-facilize-color.svg'
              alt='Facilize Logo'
              width={80}
              height={80}
              className='object-contain drop-shadow-lg'
            />
          )
        case 'netflix':
          return (
            <Image
              src='/netflix.webp'
              alt='Netflix Logo'
              width={80}
              height={80}
              className='object-contain drop-shadow-lg'
            />
          )
        case 'pokedex':
          return (
            <Image
              src='/pokeball.png'
              alt='Pokeball Logo'
              width={80}
              height={80}
              className='object-contain drop-shadow-lg'
            />
          )
        default:
          return null
      }
    }
    return image
  }

  return (
    <Link
      href={demoUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='group block'
    >
      <div className='card-glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(82,39,255,0.1)] hover:border-violet-500/20'>
        {/* Image area */}
        <div
          className={`relative w-full ${featured ? 'h-56' : 'h-48'} bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Subtle pattern overlay */}
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]' />
          
          <div className='relative z-10 transition-transform duration-500 group-hover:scale-110'>
            {renderImage()}
          </div>

          {/* Category badge */}
          {category && (
            <div className='absolute top-4 left-4'>
              <span className='text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 border border-white/10'>
                {category}
              </span>
            </div>
          )}

          {/* Arrow icon */}
          <div className='absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0'>
            <ArrowUpRight className='w-4 h-4 text-white' />
          </div>
        </div>

        {/* Content area */}
        <div className='p-6'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-xl font-bold text-foreground group-hover:text-violet-400 transition-colors duration-300'>
              {title}
            </h3>
            <ExternalLink className='w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity' />
          </div>
          
          <p className='text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2'>
            {description}
          </p>

          {/* Tech tags */}
          <div className='flex flex-wrap gap-1.5'>
            {techs.slice(0, featured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className='text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.03] text-muted-foreground border border-white/[0.06] transition-colors group-hover:border-violet-500/20'
              >
                {tech}
              </span>
            ))}
            {techs.length > (featured ? 6 : 4) && (
              <span className='text-[11px] font-medium px-2.5 py-1 rounded-md text-muted-foreground'>
                +{techs.length - (featured ? 6 : 4)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
