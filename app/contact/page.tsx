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
import { PageBackground } from '@/components/page-background'
import TrueFocus from '@/components/ui/true-focus'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data.error || t.contactPage.form.error)
        return
      }
      toast.success(t.contactPage.form.success)
      form.reset()
    } catch {
      toast.error(t.contactPage.form.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageBackground showDarkVeil={true}>
      <Navbar />

      {/* Content */}
      <section className='relative min-h-[100dvh] pt-24 pb-12 px-6 flex items-center overflow-hidden'>
        <div className='relative z-10 max-w-6xl mx-auto w-full'>
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
              <div className='mb-6'>
                <TrueFocus 
                  sentence={t.contactPage.title}
                  manualMode={false}
                  blurAmount={5}
                  borderColor="#5227FF"
                  animationDuration={0.5}
                  pauseBetweenAnimations={1}
                  className="justify-start"
                />
              </div>
              <p className='text-xl text-muted-foreground mb-12 max-w-lg'>
                {t.contactPage.subtitle}
              </p>

              <div className='space-y-8'>
                <div className='flex items-start'>
                  <div className='w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 mr-4 shrink-0'>
                    <Mail className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>{t.contactPage.info.emailLabel}</h3>
                    <a href="mailto:alfayadev@gmail.com" className='text-muted-foreground hover:text-violet-400 transition-colors'>
                      alfayadev@gmail.com
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 mr-4 shrink-0'>
                    <Github className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>{t.github.title}</h3>
                    <a href="https://github.com/felipealfaya" target="_blank" rel="noopener noreferrer" className='text-muted-foreground hover:text-violet-400 transition-colors'>
                      github.com/felipealfaya
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 mr-4 shrink-0'>
                    <Linkedin className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>LinkedIn</h3>
                    <a href="https://www.linkedin.com/in/felipealfaya/" target="_blank" rel="noopener noreferrer" className='text-muted-foreground hover:text-violet-400 transition-colors'>
                      linkedin.com/in/felipealfaya
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className='card-glass'>
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
                            <Input placeholder={t.contactPage.form.placeholderName} {...field} className='bg-background/50 border-input' />
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
                            <Input placeholder={t.contactPage.form.placeholderEmail} {...field} className='bg-background/50 border-input' />
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
                            <Input placeholder={t.contactPage.form.placeholderSubject} {...field} className='bg-background/50 border-input' />
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
                              placeholder={t.contactPage.form.placeholderMessage}
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
                      className='w-full btn-gradient text-white dark:text-white border-0'
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
    </PageBackground>
  )
}
