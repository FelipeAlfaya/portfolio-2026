import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const paths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
    {
      path: '/projects/facilize',
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      path: '/projects/acompanhamento',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  const now = new Date()
  return paths.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}${path}` : `${base}/`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
