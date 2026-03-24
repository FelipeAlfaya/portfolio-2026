import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Acompanhamento clínico e esportivo',
  description:
    'Estudo de caso: plataforma full-stack para gestão de acompanhamento em contextos clínico e esportivo — Next.js, NestJS, Prisma, PDF e controle de acesso.',
  keywords: [
    'Next.js',
    'NestJS',
    'acompanhamento clínico',
    'full-stack',
    'Prisma',
    SITE_NAME,
  ],
  alternates: { canonical: '/projects/acompanhamento' },
  openGraph: {
    title: `Acompanhamento clínico e esportivo | ${SITE_NAME}`,
    description:
      'Sistema interno com papéis, API REST e exportações — foco em UX e segurança.',
    url: '/projects/acompanhamento',
  },
}

export default function AcompanhamentoCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
