'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Mail, Github, Linkedin, Send, ArrowUpRight, MapPin } from 'lucide-react'
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

const socials = [
  {
    icon: <Mail className='w-5 h-5' />,
    label: 'Email',
    value: 'alfayadev@gmail.com',
    href: 'mailto:alfayadev@gmail.com',
    color: 'hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]',
    iconColor: 'group-hover:text-violet-400',
  },
  {
    icon: <Github className='w-5 h-5' />,
    label: 'GitHub',
    value: 'github.com/felipealfaya',
    href: 'https://github.com/felipealfaya',
    color: 'hover:border-[#6e5494]/40 hover:shadow-[0_0_20px_rgba(110,84,148,0.1)]',
    iconColor: 'group-hover:text-[#e6e6e6]',
  },
  {
    icon: <Linkedin className='w-5 h-5' />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/felipealfaya',
    href: 'https://www.linkedin.com/in/felipealfaya/',
    color: 'hover:border-[#0A66C2]/40 hover:shadow-[0_0_20px_rgba(10,102,194,0.1)]',
    iconColor: 'group-hover:text-[#0A66C2]',
  },
]

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

      <section className='relative min-h-[100dvh] pt-32 pb-24 px-6'>
        <div className='relative z-10 max-w-7xl mx-auto w-full'>
          {/* Back link */}
          <Link
            href='/'
            className='group inline-flex items-center text-muted-foreground hover:text-violet-400 transition-colors mb-12 text-sm'
          >
            <ArrowLeft className='w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1' />
            {t.projectsPage.backToHome}
          </Link>

          <div className='grid lg:grid-cols-5 gap-16 lg:gap-20 items-start'>
            {/* Left column — Info (2/5 width) */}
            <div className='lg:col-span-2'>
              <span className='text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block'>
                {t.contactPage.info.socialsLabel}
              </span>
              <h1 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
                {t.contactPage.title}
              </h1>
              <p className='text-muted-foreground text-lg leading-relaxed mb-12'>
                {t.contactPage.subtitle}
              </p>

              {/* Social links */}
              <div className='space-y-3'>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel='noopener noreferrer'
                    className={`group flex items-center gap-4 p-4 rounded-xl card-glass transition-all duration-300 ${social.color}`}
                  >
                    <div className={`text-muted-foreground transition-colors ${social.iconColor}`}>
                      {social.icon}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider mb-0.5'>
                        {social.label}
                      </p>
                      <p className='text-sm text-foreground truncate'>
                        {social.value}
                      </p>
                    </div>
                    <ArrowUpRight className='w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-y-0.5 group-hover:translate-y-0' />
                  </a>
                ))}
              </div>

              {/* Location hint */}
              <div className='flex items-center gap-2 mt-8 text-muted-foreground/60 text-sm'>
                <MapPin className='w-4 h-4' />
                <span>Brasil • UTC-3</span>
              </div>
            </div>

            {/* Right column — Form (3/5 width) */}
            <div className='lg:col-span-3'>
              <div className='card-glass rounded-2xl p-8 md:p-10'>
                <h2 className='text-xl font-semibold mb-8 text-foreground'>
                  {t.contact.getInTouch}
                </h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    {/* Name + Email row */}
                    <div className='grid sm:grid-cols-2 gap-5'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs uppercase tracking-wider text-muted-foreground'>
                              {t.contactPage.form.name}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.contactPage.form.placeholderName}
                                {...field}
                                className='bg-white/[0.03] border-white/[0.06] focus:border-violet-500/40 transition-colors h-12 rounded-xl'
                              />
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
                            <FormLabel className='text-xs uppercase tracking-wider text-muted-foreground'>
                              {t.contactPage.form.email}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.contactPage.form.placeholderEmail}
                                {...field}
                                className='bg-white/[0.03] border-white/[0.06] focus:border-violet-500/40 transition-colors h-12 rounded-xl'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs uppercase tracking-wider text-muted-foreground'>
                            {t.contactPage.form.subject}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.contactPage.form.placeholderSubject}
                              {...field}
                              className='bg-white/[0.03] border-white/[0.06] focus:border-violet-500/40 transition-colors h-12 rounded-xl'
                            />
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
                          <FormLabel className='text-xs uppercase tracking-wider text-muted-foreground'>
                            {t.contactPage.form.message}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t.contactPage.form.placeholderMessage}
                              className='min-h-[160px] bg-white/[0.03] border-white/[0.06] focus:border-violet-500/40 transition-colors resize-none rounded-xl'
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
                      className='w-full btn-gradient text-white dark:text-white border-0 h-12 rounded-xl text-base font-medium'
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  )
}
