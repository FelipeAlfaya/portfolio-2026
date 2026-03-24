import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contato',
  description: `Entre em contato com ${SITE_NAME} para projetos web, freelas full-stack e parcerias. Formulário, e-mail, GitHub e LinkedIn.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contato | ${SITE_NAME}`,
    description: `Fale com ${SITE_NAME}: desenvolvimento web, Next.js, TypeScript e produtos digitais.`,
    url: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
