import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n/context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cookies, headers } from 'next/headers'
import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  SEO_KEYWORDS,
  SITE_NAME,
} from '@/lib/site-config'
import { PersonJsonLd, WebSiteJsonLd } from '@/components/seo/person-json-ld'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const siteUrl = getSiteUrl()
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

type Language = 'en' | 'pt' | 'es'

const isValidLanguage = (value: string | undefined | null): value is Language => {
  return value === 'en' || value === 'pt' || value === 'es'
}

const detectFromAcceptLanguage = (accept: string): Language => {
  const first = accept.split(',')[0]?.trim() ?? ''
  const primary = first.split('-')[0] ?? ''
  if (primary === 'pt') return 'pt'
  if (primary === 'es') return 'es'
  return 'en'
}

const toHtmlLang = (lang: Language) => {
  if (lang === 'pt') return 'pt-BR'
  if (lang === 'es') return 'es-ES'
  return 'en'
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Desenvolvedor Web Full-Stack | Portfólio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    url: '/',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Desenvolvedor Web Full-Stack`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/greatball.webp',
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Desenvolvedor Web Full-Stack`,
    description: DEFAULT_DESCRIPTION,
    images: ['/greatball.webp'],
  },
  icons: {
    icon: [{ url: '/icon.webp', type: 'image/webp' }],
    apple: '/icon.webp',
  },
  category: 'technology',
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('language')?.value
  const headerList = await headers()
  const acceptLanguage = headerList.get('accept-language') ?? ''
  const initialLanguage: Language = isValidLanguage(cookieLang)
    ? cookieLang
    : detectFromAcceptLanguage(acceptLanguage)

  return (
    <html lang={toHtmlLang(initialLanguage)} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider defaultLanguage={initialLanguage}>{children}</LanguageProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

