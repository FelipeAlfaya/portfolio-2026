'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import TrueFocus from '@/components/ui/true-focus'
import VariableProximity from '@/components/ui/variable-proximity'
import { AnimatePresence, motion } from 'framer-motion'

export function HeroSection() {
  const { t, language } = useTranslation()
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const [techIndex, setTechIndex] = React.useState(0)
  const technologies = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Next.js', color: '#FFFFFF' },
    { name: 'Angular', color: '#DD0031' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Node.js', color: '#339933' },
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % technologies.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [technologies.length])

  const tech = technologies[techIndex]

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

  return (
    <section className='relative min-h-screen flex flex-col justify-center pt-20 pb-20 px-6'>
      <div className='relative z-10 max-w-6xl mx-auto w-full' ref={containerRef}>
        <div className='text-center mb-0 mt-8'>
          <div className='min-h-[120px] md:min-h-[160px] flex items-center justify-center'>
            <TrueFocus 
              sentence={t.hero.title}
              manualMode={false}
              blurAmount={5}
              borderColor="#5227FF"
              animationDuration={0.5}
              pauseBetweenAnimations={1}
              className="justify-center"
            />
          </div>
          <div className='min-h-[60px] flex items-center justify-center mb-8 flex-wrap gap-x-2'>
            <VariableProximity
              label={t.hero.subtitlePrefix}
              className={'text-2xl md:text-4xl font-bold text-white'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            />
            
            <div className="inline-grid max-w-[180px] grid-cols-1 grid-rows-1 items-center justify-items-start">
              {/* Espaçador invisível para manter a largura constante baseada na maior palavra */}
              <div className="invisible h-0 flex flex-col pointer-events-none" aria-hidden="true">
                {technologies.map((item) => (
                  <span key={item.name} className="text-2xl md:text-4xl font-bold px-1">
                    {item.name}
                  </span>
                ))}
              </div>

              {/* Texto animado real */}
              <div className="col-start-1 row-start-1 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tech.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex justify-start"
                  >
                    <VariableProximity
                      label={tech.name}
                      className={'text-2xl md:text-4xl font-bold'}
                      style={{ color: tech.color }}
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={containerRef}
                      radius={100}
                      falloff='linear'
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center gap-4 mb-12'>
            <Link href='/projects'>
              <Button
                size='lg'
                className='btn-gradient text-white dark:text-white border-0'
              >
                {t.hero.viewWork}
              </Button>
            </Link>
            <Button
              variant='outline'
              size='lg'
              className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent'
              onClick={handleDownloadCV}
            >
              {t.hero.downloadCV}
            </Button>
          </div>
          <div className='flex items-center justify-center gap-3'>
            <Link
              href='https://github.com/felipealfaya'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-2 px-4 py-2.5 rounded-full card-glass transition-all duration-300 hover:border-[#6e5494]/50 hover:shadow-[0_0_20px_rgba(110,84,148,0.15)]'
            >
              <Github className='w-5 h-5 text-muted-foreground group-hover:text-[#e6e6e6] transition-colors' />
              <span className='text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline'>GitHub</span>
            </Link>
            <Link
              href='https://www.linkedin.com/in/felipealfaya/'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-2 px-4 py-2.5 rounded-full card-glass transition-all duration-300 hover:border-[#0A66C2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.15)]'
            >
              <Linkedin className='w-5 h-5 text-muted-foreground group-hover:text-[#0A66C2] transition-colors' />
              <span className='text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline'>LinkedIn</span>
            </Link>
            <Link
              href='mailto:alfayadev@gmail.com'
              className='group flex items-center gap-2 px-4 py-2.5 rounded-full card-glass transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]'
            >
              <Mail className='w-5 h-5 text-muted-foreground group-hover:text-violet-400 transition-colors' />
              <span className='text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline'>Email</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
