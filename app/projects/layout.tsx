import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Projetos',
  description: `Projetos de ${SITE_NAME}: SaaS Facilize, plataformas full-stack com Next.js, NestJS, PostgreSQL e estudos de caso técnicos.`,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `Projetos | ${SITE_NAME}`,
    description:
      'Portfólio de projetos: gestão empresarial, acompanhamento clínico e esportivo, e stack moderna.',
    url: '/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
