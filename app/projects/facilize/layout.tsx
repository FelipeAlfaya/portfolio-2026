import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Facilize — Estudo de caso SaaS',
  description:
    'Estudo de caso Facilize: SaaS multi-tenant com agendamento, finanças, CRM, ERP, 100+ permissões, NestJS, Next.js, Stripe e integrações.',
  keywords: [
    'Facilize',
    'SaaS',
    'multi-tenant',
    'NestJS',
    'Next.js',
    'estudo de caso',
    SITE_NAME,
  ],
  alternates: { canonical: '/projects/facilize' },
  openGraph: {
    title: `Facilize — Estudo de caso | ${SITE_NAME}`,
    description:
      'Plataforma SaaS completa para prestadores de serviços: módulos, permissões granulares e arquitetura full-stack.',
    url: '/projects/facilize',
    images: [{ url: '/facilize_dashboard.png', alt: 'Dashboard Facilize' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Facilize — Estudo de caso | ${SITE_NAME}`,
    description:
      'SaaS multi-tenant: agendamento, finanças, CRM e mais — arquitetura e stack técnica.',
    images: ['/facilize_dashboard.png'],
  },
}

export default function FacilizeCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
