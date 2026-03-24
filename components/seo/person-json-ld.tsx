import { getSiteUrl, SITE_NAME } from '@/lib/site-config'

const sameAs = [
  'https://github.com/felipealfaya',
  'https://www.linkedin.com/in/felipealfaya/',
]

export function PersonJsonLd() {
  const url = getSiteUrl()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url,
    jobTitle: 'Desenvolvedor Web Full-Stack',
    sameAs,
    knowsAbout: [
      'Next.js',
      'TypeScript',
      'React',
      'NestJS',
      'PostgreSQL',
      'Desenvolvimento SaaS',
    ],
  }
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const url = getSiteUrl()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_NAME} — Portfólio`,
    url,
    description:
      'Portfólio de Felipe Alfaya: projetos full-stack, estudos de caso e contato profissional.',
    inLanguage: ['pt-BR', 'en'],
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url,
      sameAs,
    },
  }
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
