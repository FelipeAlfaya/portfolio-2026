'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslation } from '@/hooks/use-translation'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/projects', label: t.nav.projects },
  ]

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className='max-w-6xl mx-auto px-6 flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold font-heading z-50 relative tracking-tight'>
            Felipe Alfaya
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='relative group py-2'
              >
                <span
                  className={cn(
                    'text-sm font-medium transition-colors relative z-10',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId='navbar-indicator'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_10px_rgba(var(--primary),0.5)]'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            <div className='flex items-center gap-4 ml-4 pl-4 border-l border-border/50'>
              <LanguageSwitcher />
              <Link href='/contact'>
                <Button variant="outline" size='sm' className='rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300'>
                  {t.nav.contact}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className='md:hidden z-50 relative p-2 focus:outline-none'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
          >
            <div className='flex flex-col justify-center items-center w-6 h-6 gap-1.5'>
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className='w-6 h-0.5 bg-foreground block origin-center transition-all duration-300'
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className='w-6 h-0.5 bg-foreground block transition-all duration-300'
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className='w-6 h-0.5 bg-foreground block origin-center transition-all duration-300'
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className='fixed inset-0 z-[40] bg-background flex flex-col items-center justify-center space-y-8 md:hidden'
            style={{ height: '100dvh' }}
          >
            <nav className='flex flex-col items-center gap-8'>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-4xl font-bold tracking-tight transition-colors hover:text-primary',
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-foreground/80'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className='flex flex-col items-center gap-8 mt-8'
              >
                <div className="scale-125">
                  <LanguageSwitcher />
                </div>
                <Link href='/contact' onClick={() => setIsOpen(false)}>
                  <Button size='lg' className='rounded-full px-10 py-6 text-xl shadow-lg'>
                    {t.nav.contact}
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
