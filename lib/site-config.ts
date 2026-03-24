export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  const vercel = process.env.VERCEL_URL?.replace(/^https?:\/\//, '')
  if (vercel) return `https://${vercel}`
  return 'https://felipealfaya.com'
}

export const SITE_NAME = 'Felipe Alfaya'

export const DEFAULT_DESCRIPTION =
  'Felipe Alfaya — desenvolvedor web full-stack: Next.js, TypeScript, React, NestJS e produtos SaaS. Portfólio, projetos e contato.'

export const SEO_KEYWORDS = [
  'Felipe Alfaya',
  'desenvolvedor web',
  'full-stack developer',
  'Next.js',
  'TypeScript',
  'React',
  'NestJS',
  'portfolio',
  'desenvolvedor Brasil',
  'SaaS',
  'Facilize',
]
