'use client'

import { useState, useEffect } from 'react'

interface LanguageStats {
  [language: string]: number
}

interface CommitActivity {
  date: string
  count: number
}

interface GitHubStats {
  languages: LanguageStats
  commitActivity: CommitActivity[]
  totalRepos: number
  totalCommits: number
}

interface UseGitHubStatsReturn {
  data: GitHubStats | null
  loading: boolean
  error: string | null
}

const CACHE_KEY = 'github-stats'
const CACHE_DURATION = 60 * 60 * 1000

function getCachedData(): GitHubStats | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    const now = Date.now()

    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return data
  } catch {
    return null
  }
}

function setCachedData(data: GitHubStats): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    )
  } catch {
    // Ignore storage errors
  }
}

export function useGitHubStats(username?: string): UseGitHubStatsReturn {
  const [data, setData] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      setError('GitHub username não configurado')
      return
    }

    const cachedData = getCachedData()
    if (cachedData) {
      setData(cachedData)
      setLoading(false)
      return
    }

    async function fetchGitHubStats() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/github-stats?username=${username}`)

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do GitHub')
        }

        const stats = await response.json()
        setData(stats)
        setCachedData(stats)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro desconhecido ao buscar dados'
        )
        setData(getMockData())
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username])

  return { data, loading, error }
}

function getMockData(): GitHubStats {
  return {
    languages: {
      TypeScript: 45000,
      JavaScript: 32000,
      Python: 28000,
      'React/TSX': 18000,
      CSS: 12000,
      HTML: 8000,
      Shell: 5000,
      Dockerfile: 3000,
    },
    commitActivity: generateMockCommitActivity(),
    totalRepos: 24,
    totalCommits: 1247,
  }
}

function generateMockCommitActivity(): CommitActivity[] {
  const activity: CommitActivity[] = []
  const today = new Date()
  const daysToShow = 365

  for (let i = daysToShow; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    const baseCount = isWeekend ? 0 : Math.floor(Math.random() * 5)
    const randomVariation = Math.random() > 0.7 ? Math.floor(Math.random() * 8) : 0

    activity.push({
      date: date.toISOString().split('T')[0],
      count: baseCount + randomVariation,
    })
  }

  return activity
}

