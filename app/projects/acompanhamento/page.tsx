'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PageBackground } from '@/components/page-background'
import { useTranslation } from '@/hooks/use-translation'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Layers, Server, Shield, FileText, LayoutDashboard } from 'lucide-react'

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AcompanhamentoCasePage() {
  const { t } = useTranslation()
  const c = t.acompanhamentoCase

  return (
    <PageBackground showDarkVeil={true}>
      <Navbar />

      <article className='relative'>
        <section className='relative min-h-[55vh] flex flex-col justify-end pb-16 pt-32 px-6'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-600/[0.07] rounded-full blur-[100px] pointer-events-none' />

          <div className='relative z-10 max-w-4xl mx-auto w-full'>
            <Link
              href='/projects'
              className='group inline-flex items-center text-muted-foreground hover:text-violet-400 transition-colors mb-10 text-sm'
            >
              <ArrowLeft className='w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1' />
              {c.backToProjects}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className='text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4 block'>{c.caseLabel}</span>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]'>{c.title}</h1>
              <p className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl'>{c.subtitle}</p>
            </motion.div>
          </div>
        </section>

        <section className='pb-8 px-6'>
          <div className='max-w-4xl mx-auto'>
            <AnimatedSection>
              <h2 className='text-2xl font-bold mb-4'>{c.contextTitle}</h2>
              <p className='text-muted-foreground leading-relaxed'>{c.context}</p>
            </AnimatedSection>
          </div>
        </section>

        <section className='py-12 px-6 border-t border-white/[0.06]'>
          <div className='max-w-4xl mx-auto'>
            <AnimatedSection delay={0.05}>
              <h2 className='text-2xl font-bold mb-3 flex items-center gap-2'>
                <Layers className='w-6 h-6 text-emerald-400' />
                {c.architectureTitle}
              </h2>
              <p className='text-muted-foreground mb-8 leading-relaxed'>{c.architectureLead}</p>
              <div className='grid md:grid-cols-2 gap-6'>
                {c.layers.map((layer: { title: string; description: string }, i: number) => (
                  <div key={i} className='card-glass rounded-2xl p-6 border border-white/[0.06]'>
                    <div className='flex items-center gap-2 mb-3'>
                      {i === 0 ? (
                        <LayoutDashboard className='w-5 h-5 text-violet-400' />
                      ) : (
                        <Server className='w-5 h-5 text-violet-400' />
                      )}
                      <h3 className='font-semibold text-foreground'>{layer.title}</h3>
                    </div>
                    <p className='text-sm text-muted-foreground leading-relaxed'>{layer.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className='py-12 px-6'>
          <div className='max-w-4xl mx-auto'>
            <AnimatedSection delay={0.08}>
              <h2 className='text-2xl font-bold mb-6'>{c.stackTitle}</h2>
              <div className='flex flex-wrap gap-2'>
                {c.stack.map((item: string) => (
                  <span
                    key={item}
                    className='text-sm font-medium px-3 py-1.5 rounded-full bg-white/[0.04] text-muted-foreground border border-white/[0.08]'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className='py-12 px-6 border-t border-white/[0.06]'>
          <div className='max-w-4xl mx-auto'>
            <AnimatedSection delay={0.1}>
              <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <FileText className='w-6 h-6 text-emerald-400' />
                {c.productTitle}
              </h2>
              <ul className='space-y-3'>
                {c.productBullets.map((item: string, i: number) => (
                  <li key={i} className='text-muted-foreground leading-relaxed pl-4 border-l-2 border-emerald-500/30'>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>

        <section className='py-12 px-6 pb-24'>
          <div className='max-w-4xl mx-auto'>
            <AnimatedSection delay={0.12}>
              <div className='card-glass rounded-2xl p-8 border border-white/[0.06] flex gap-4'>
                <Shield className='w-8 h-8 text-emerald-400 shrink-0' />
                <div>
                  <h2 className='text-lg font-bold mb-2'>{c.securityTitle}</h2>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{c.securityBody}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </article>

      <Footer />
    </PageBackground>
  )
}
