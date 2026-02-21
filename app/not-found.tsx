'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageBackground } from '@/components/page-background'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/use-translation'
import { Home, MoveLeft } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <PageBackground showDarkVeil={true}>
      <div className='min-h-screen flex items-center justify-center px-6 relative'>
        <div className='max-w-2xl w-full text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='relative inline-block'
          >
            <motion.h1
              animate={{ 
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              className='text-[12rem] md:text-[20rem] font-bold leading-none select-none tracking-tighter'
              style={{
                background: 'linear-gradient(180deg, rgba(82, 39, 255, 0.8) 0%, rgba(82, 39, 255, 0.1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(82, 39, 255, 0.4))'
              }}
            >
              404
            </motion.h1>
            
            {/* Glitch overlays */}
            <motion.div
              animate={{ 
                x: mousePosition.x * 1.5,
                y: mousePosition.y * 1.5,
              }}
              className='absolute inset-0 text-[12rem] md:text-[20rem] font-bold leading-none select-none tracking-tighter blur-[2px] opacity-30 pointer-events-none'
              style={{
                color: '#5227FF',
                zIndex: -1
              }}
            >
              404
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='mt-8'
          >
            <h2 className='text-3xl md:text-5xl font-bold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
              {t.error404.heading}
            </h2>
            <p className='text-muted-foreground text-lg mb-10 max-w-md mx-auto'>
              {t.error404.description}
            </p>

            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link href='/'>
                <Button size='lg' className='btn-gradient group px-8'>
                  <Home className='w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1' />
                  {t.error404.backHome}
                </Button>
              </Link>
              <Button 
                variant='outline' 
                size='lg' 
                onClick={() => window.history.back()}
                className='border-white/10 hover:bg-white/5'
              >
                <MoveLeft className='w-4 h-4 mr-2' />
                {t.nav.back || 'Go Back'}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px]' />
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px]' />
        </div>
      </div>
    </PageBackground>
  )
}
