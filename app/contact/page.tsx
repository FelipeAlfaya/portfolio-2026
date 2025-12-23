'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, Github, Linkedin, Send } from 'lucide-react'
import { SpotlightCursor } from '@/components/spotlight-cursor'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslation } from '@/hooks/use-translation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
})

export default function ContactPage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(t.contactPage.form.success)
      form.reset()
    }, 1500)
  }

  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden bg-grid-blue'>
      <SpotlightCursor mousePosition={mousePosition} />

      <Navbar />

      {/* Content */}
      <section className='pt-32 pb-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <Link
            href='/'
            className='inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t.projectsPage.backToHome}
          </Link>

          <div className='grid lg:grid-cols-2 gap-12 items-start'>
            {/* Contact Info */}
            <div>
              <h1 className='text-5xl md:text-6xl font-bold mb-6 text-blue-600 text-glow-blue'>
                {t.contactPage.title}
              </h1>
              <p className='text-xl text-muted-foreground mb-12 max-w-lg'>
                {t.contactPage.subtitle}
              </p>

              <div className='space-y-8'>
                <div className='flex items-start'>
                  <div className='w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4 shrink-0'>
                    <Mail className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>{t.contactPage.info.emailLabel}</h3>
                    <a href="mailto:alfayadev@gmail.com" className='text-muted-foreground hover:text-blue-400 transition-colors'>
                      alfayadev@gmail.com
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mr-4 shrink-0'>
                    <Github className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>{t.github.title}</h3>
                    <a href="https://github.com/felipealfaya" target="_blank" rel="noopener noreferrer" className='text-muted-foreground hover:text-blue-400 transition-colors'>
                      github.com/felipealfaya
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 mr-4 shrink-0'>
                    <Linkedin className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>LinkedIn</h3>
                    <a href="https://www.linkedin.com/in/felipealfaya/" target="_blank" rel="noopener noreferrer" className='text-muted-foreground hover:text-blue-400 transition-colors'>
                      linkedin.com/in/felipealfaya
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className='bg-card/50 backdrop-blur-sm border-border'>
              <CardHeader>
                <CardTitle>{t.contact.getInTouch}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contactPage.form.name}</FormLabel>
                          <FormControl>
                            <Input placeholder='Your name' {...field} className='bg-background/50 border-input' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contactPage.form.email}</FormLabel>
                          <FormControl>
                            <Input placeholder='your@email.com' {...field} className='bg-background/50 border-input' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contactPage.form.subject}</FormLabel>
                          <FormControl>
                            <Input placeholder='Project inquiry' {...field} className='bg-background/50 border-input' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contactPage.form.message}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell me about your project...'
                              className='min-h-[150px] bg-background/50 border-input resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white dark:text-white'
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          {t.contactPage.form.sending}
                        </>
                      ) : (
                        <>
                          <Send className='w-4 h-4 mr-2' />
                          {t.contactPage.form.sendButton}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
