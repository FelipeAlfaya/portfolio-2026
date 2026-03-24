'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { PageBackground } from '@/components/page-background'
import { useTranslation } from '@/hooks/use-translation'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Layout,
  Database,
  Server,
  Palette,
  Smartphone,
  Zap,
  Shield,
  CheckCircle2,
  LayoutGrid,
  Calendar,
  DollarSign,
  Users,
  Building2,
  Package,
  FileBarChart,
  Plug,
  ArrowRight,
  Globe,
  GitBranch,
  Layers,
  ScrollText,
  Briefcase,
  Activity,
  Lock,
  Settings,
  User,
  Bell,
  LineChart,
} from 'lucide-react'

const HIGHLIGHT_ICONS = [Shield, GitBranch, Zap, Activity, Lock, Settings]

const MODULE_ICONS = [Calendar, Briefcase, DollarSign, Users, Building2, Package, FileBarChart, Plug]

const TECH_STACK = [
  { name: 'Next.js', slug: 'nextdotjs', light: true },
  { name: 'NestJS', slug: 'nestjs' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Prisma', slug: 'prisma' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'Docker', slug: 'docker' },
]

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

export default function FacilizeCasePage() {
  const { t } = useTranslation()
  const c = t.facilizeCase
  const o = c.observability

  return (
    <PageBackground showDarkVeil={true}>
      <Navbar />

      <article className='relative'>
        {/* Hero */}
        <section className='relative min-h-[70vh] flex flex-col justify-end pb-20 pt-32 px-6'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/[0.06] rounded-full blur-[120px] pointer-events-none' />

          <div className='relative z-10 max-w-5xl mx-auto w-full'>
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
              <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block'>
                {c.caseLabel}
              </span>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]'>
                {c.title}
              </h1>
              <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl'>
                {c.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className='mt-10 flex flex-wrap gap-3'
            >
              {TECH_STACK.map((tech) => (
                <span
                  key={tech.name}
                  className='inline-flex items-center gap-2 badge-violet text-sm px-4 py-2 rounded-full transition-colors duration-200 hover:border-violet-500/40'
                >
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}${tech.light ? '/eee' : ''}`}
                    alt={tech.name}
                    className='w-4 h-4'
                  />
                  {tech.name}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        {c.stats && (
          <section className='px-6 pb-20'>
            <div className='max-w-5xl mx-auto'>
              <AnimatedSection>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                  {c.stats.map((stat: { value: string; label: string }, i: number) => (
                    <div key={i} className='text-center py-6'>
                      <p className='text-3xl md:text-4xl font-bold text-gradient-violet mb-1'>
                        {stat.value}
                      </p>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Product Context */}
        <section className='py-20 px-6'>
          <div className='max-w-5xl mx-auto'>
            <AnimatedSection>
              <div className='flex flex-col lg:flex-row gap-16 lg:gap-24'>
                <div className='flex-1'>
                  <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                    {c.productContext.title}
                  </span>
                  <h2 className='text-3xl md:text-4xl font-bold mb-8 leading-tight'>
                    {c.productContext.problem}
                  </h2>
                  <div className='space-y-5 text-muted-foreground leading-relaxed'>
                    <p>{c.productContext.audience}</p>
                    <p>{c.productContext.purpose}</p>
                  </div>
                </div>

                <div className='lg:w-[380px] flex-shrink-0'>
                  <div className='card-glass rounded-2xl p-7 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/[0.06] to-transparent rounded-bl-full pointer-events-none' />
                    <div className='relative z-10'>
                      <h3 className='text-lg font-bold mb-4'>{c.productContext.differentialTitle}</h3>
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {c.productContext.differential}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Modules */}
        {c.modules && (
          <section className='py-20 px-6'>
            <div className='max-w-5xl mx-auto'>
              <AnimatedSection>
                <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                  {c.modules.title}
                </span>
                <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14'>
                  <h2 className='text-3xl md:text-4xl font-bold leading-tight max-w-lg'>
                    {c.modules.intro}
                  </h2>
                </div>
              </AnimatedSection>

              <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {c.modules.items.map((item: { title: string; description: string }, i: number) => {
                  const Icon = MODULE_ICONS[i] ?? Package
                  return (
                    <AnimatedSection key={i} delay={i * 0.06}>
                      <div className='group relative rounded-2xl transition-all duration-200 h-full'>
                        <div className='absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/0 via-violet-500/0 to-violet-500/0 group-hover:from-violet-500/20 group-hover:via-transparent group-hover:to-violet-400/10 transition-all duration-500' />
                        <div className='relative card-glass rounded-2xl p-6 md:p-7 h-full'>
                          <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20 mb-4'>
                            <Icon className='w-5 h-5 text-violet-400' />
                          </div>
                          <h3 className='text-lg font-bold mb-2'>
                            {item.title}
                          </h3>
                          <p className='text-sm text-muted-foreground leading-relaxed'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* User Flow: Solo vs Company */}
        {c.userFlow && (
          <section className='py-20 px-6'>
            <div className='max-w-5xl mx-auto'>
              <AnimatedSection>
                <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                  {c.userFlow.title}
                </span>
                <h2 className='text-3xl md:text-4xl font-bold mb-12 leading-tight'>
                  {c.userFlow.subtitle}
                </h2>
              </AnimatedSection>

              <div className='grid gap-8 md:grid-cols-2'>
                {c.userFlow.items.map((item: { title: string; description: string }, i: number) => {
                  const Icon = i === 0 ? User : Building2
                  return (
                    <AnimatedSection key={i} delay={i * 0.1}>
                      <div className='card-glass rounded-2xl p-8 h-full relative overflow-hidden'>
                        <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/[0.06] to-transparent rounded-bl-full pointer-events-none' />
                        <div className='relative z-10'>
                          <div className='w-14 h-14 rounded-2xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20 mb-6'>
                            <Icon className='w-7 h-7 text-violet-400' />
                          </div>
                          <h3 className='text-xl font-bold mb-3'>{item.title}</h3>
                          <p className='text-muted-foreground leading-relaxed'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Technical Highlights */}
        {c.highlights && (
          <section className='py-20 px-6 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent'>
            <div className='max-w-5xl mx-auto'>
              <AnimatedSection>
                <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                  {c.highlights.title}
                </span>
                <h2 className='text-3xl md:text-4xl font-bold mb-12 leading-tight'>
                  Arquitetura que escala com o negócio
                </h2>
              </AnimatedSection>

              <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {c.highlights.items.map((item: { title: string; description: string }, i: number) => {
                  const Icon = HIGHLIGHT_ICONS[i] ?? Shield
                  return (
                    <AnimatedSection key={i} delay={i * 0.06}>
                      <div className='group relative card-glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-violet-500/30'>
                        <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-500/[0.05] to-transparent rounded-bl-full pointer-events-none' />
                        <div className='relative z-10'>
                          <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20 mb-4'>
                            <Icon className='w-5 h-5 text-violet-400' />
                          </div>
                          <h3 className='text-base font-bold mb-2'>{item.title}</h3>
                          <p className='text-sm text-muted-foreground leading-relaxed'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {o && (
          <section className='py-20 px-6 border-y border-white/[0.06] bg-gradient-to-b from-violet-500/[0.03] via-transparent to-transparent'>
            <div className='max-w-5xl mx-auto'>
              <AnimatedSection>
                <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                  {o.label}
                </span>
                <h2 className='text-3xl md:text-4xl font-bold mb-5 leading-tight max-w-3xl'>
                  {o.title}
                </h2>
                <p className='text-muted-foreground leading-relaxed max-w-3xl'>
                  {o.lead}
                </p>
              </AnimatedSection>

              <div className='grid lg:grid-cols-2 gap-6 mt-14'>
                <AnimatedSection delay={0.05}>
                  <div className='card-glass rounded-2xl p-7 md:p-8 h-full relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-violet-500/[0.08] to-transparent rounded-bl-full pointer-events-none' />
                    <div className='relative z-10'>
                      <div className='flex items-center gap-3 mb-6'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20'>
                          <LineChart className='w-5 h-5 text-violet-400' />
                        </div>
                        <h3 className='text-lg font-bold'>{o.pipelineTitle}</h3>
                      </div>
                      <ul className='space-y-4'>
                        {o.pipelineItems.map((item: string, i: number) => (
                          <li key={i} className='flex gap-3 text-sm text-muted-foreground leading-relaxed'>
                            <span className='flex-shrink-0 w-6 h-6 rounded-md bg-violet-500/10 border border-violet-500/15 flex items-center justify-center text-xs font-semibold text-violet-400'>
                              {i + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className='mt-8 pt-8 border-t border-white/[0.06]'>
                        <h4 className='text-sm font-semibold mb-4 flex items-center gap-2'>
                          <Database className='w-4 h-4 text-violet-400' />
                          {o.infraTitle}
                        </h4>
                        <ul className='space-y-3'>
                          {o.infraItems.map((item: string, i: number) => (
                            <li key={i} className='flex gap-2 text-sm text-muted-foreground leading-relaxed'>
                              <CheckCircle2 className='w-4 h-4 text-violet-400/80 shrink-0 mt-0.5' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <div className='card-glass rounded-2xl p-7 md:p-8 h-full border-violet-500/20 relative overflow-hidden'>
                    <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/40 via-violet-500/40 to-violet-500/10' />
                    <div className='relative z-10'>
                      <div className='flex items-center gap-3 mb-6'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/25'>
                          <Bell className='w-5 h-5 text-amber-400' />
                        </div>
                        <h3 className='text-lg font-bold'>{o.alertsTitle}</h3>
                      </div>
                      <p className='text-sm text-muted-foreground leading-relaxed mb-6'>
                        {o.alertsLead}
                      </p>
                      <ul className='space-y-4'>
                        {o.alertsBullets.map((item: string, i: number) => (
                          <li key={i} className='flex gap-3 text-sm text-muted-foreground leading-relaxed'>
                            <Shield className='w-4 h-4 text-amber-400/90 shrink-0 mt-0.5' />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection className='mt-10' delay={0.12}>
                <p className='text-sm text-muted-foreground leading-relaxed max-w-3xl border-l-2 border-violet-500/30 pl-5 py-1'>
                  {o.configClosing}
                </p>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Full Stack Scope */}
        <section className='py-20 px-6'>
          <div className='max-w-5xl mx-auto'>
            <AnimatedSection>
              <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                {c.fullstack.label}
              </span>
              <h2 className='text-3xl md:text-4xl font-bold mb-12 leading-tight'>
                {c.fullstack.title}
              </h2>
            </AnimatedSection>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {c.fullstack.bullets.map((bullet: string, i: number) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className='flex items-start gap-4 card-glass rounded-xl p-5'>
                    <span className='flex-shrink-0 w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-sm font-bold text-violet-400'>
                      {i + 1}
                    </span>
                    <p className='text-sm text-muted-foreground leading-relaxed pt-1'>
                      {bullet}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture: Frontend + Backend */}
        <section className='py-20 px-6'>
          <div className='max-w-5xl mx-auto'>
            {/* Frontend */}
            <AnimatedSection className='mb-20'>
              <div className='flex flex-col lg:flex-row gap-12 lg:gap-16'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20'>
                      <Layout className='w-5 h-5 text-violet-400' />
                    </div>
                    <h2 className='text-2xl md:text-3xl font-bold'>{c.frontend.title}</h2>
                  </div>
                  <p className='text-muted-foreground mb-8 leading-relaxed'>
                    {c.frontend.intro}
                  </p>
                  <ul className='space-y-3'>
                    {c.frontend.bullets.map((bullet: string, i: number) => (
                      <li key={i} className='flex items-start gap-3'>
                        <CheckCircle2 className='w-4 h-4 text-violet-400 mt-0.5 shrink-0' />
                        <span className='text-sm text-muted-foreground'>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='lg:w-[400px] flex-shrink-0 grid grid-cols-1 gap-4'>
                  {[
                    { icon: Palette, ...c.frontend.architecture },
                    { icon: Smartphone, ...c.frontend.responsiveness },
                    { icon: Zap, ...c.frontend.performance },
                    { icon: Shield, ...c.frontend.auth },
                  ].map((card, i) => (
                    <div key={i} className='card-glass rounded-xl p-5'>
                      <h3 className='font-semibold mb-1.5 flex items-center gap-2 text-sm'>
                        <card.icon className='w-4 h-4 text-violet-400' />
                        {card.title}
                      </h3>
                      <p className='text-xs text-muted-foreground leading-relaxed'>
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Backend */}
            <AnimatedSection className='mb-20'>
              <div className='flex flex-col lg:flex-row-reverse gap-12 lg:gap-16'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20'>
                      <Server className='w-5 h-5 text-violet-400' />
                    </div>
                    <h2 className='text-2xl md:text-3xl font-bold'>{c.backend.title}</h2>
                  </div>
                  <p className='text-muted-foreground mb-8 leading-relaxed'>
                    {c.backend.intro}
                  </p>
                  <ul className='space-y-3'>
                    {c.backend.bullets.map((bullet: string, i: number) => (
                      <li key={i} className='flex items-start gap-3'>
                        <CheckCircle2 className='w-4 h-4 text-violet-400 mt-0.5 shrink-0' />
                        <span className='text-sm text-muted-foreground'>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='lg:w-[400px] flex-shrink-0'>
                  <div className='card-glass rounded-2xl p-7 relative overflow-hidden h-full flex flex-col justify-center'>
                    <div className='absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-violet-500/[0.06] to-transparent rounded-br-full pointer-events-none' />
                    <div className='relative z-10'>
                      <div className='flex items-center gap-3 mb-4'>
                        <Database className='w-5 h-5 text-violet-400' />
                        <h3 className='text-lg font-bold'>{c.database.title}</h3>
                      </div>
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {c.database.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className='py-24 px-6'>
          <div className='max-w-4xl mx-auto'>
            <AnimatedSection>
              <div className='relative card-glass rounded-3xl p-10 md:p-16 text-center overflow-hidden'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/[0.07] rounded-full blur-[100px] pointer-events-none' />
                <div className='relative z-10'>
                  <Globe className='w-10 h-10 text-violet-400 mx-auto mb-6' />
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>{c.cta.title}</h2>
                  <p className='text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed'>
                    {c.cta.subtitle}
                  </p>
                  <Link href='https://facilize.com.br' target='_blank' rel='noopener noreferrer'>
                    <Button
                      size='lg'
                      className='btn-gradient text-white dark:text-white border-0 px-8 py-6 text-base'
                    >
                      <ExternalLink className='w-5 h-5 mr-2' />
                      {c.cta.button}
                    </Button>
                  </Link>
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
