import { NextRequest, NextResponse } from 'next/server'

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

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function fetchWithAuth(url: string) {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`
  }

  const response = await fetch(url, { headers })
  return response
}

async function getRepositories(username: string) {
  const repos: any[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const response = await fetchWithAuth(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Usuário não encontrado')
      }
      throw new Error('Erro ao buscar repositórios')
    }

    const data = await response.json()
    if (data.length === 0) break

    repos.push(...data)
    if (data.length < perPage) break

    page++
  }

  return repos
}

async function getLanguagesForRepos(
  username: string,
  repos: any[]
): Promise<LanguageStats> {
  const languageStats: LanguageStats = {}

  for (const repo of repos.slice(0, 30)) {
    try {
      const response = await fetchWithAuth(
        `${GITHUB_API_BASE}/repos/${username}/${repo.name}/languages`
      )

      if (response.ok) {
        const languages = await response.json()
        for (const [lang, bytes] of Object.entries(languages)) {
          languageStats[lang] = (languageStats[lang] || 0) + (bytes as number)
        }
      }
    } catch {
      continue
    }
  }

  return languageStats
}

async function getCommitActivity(
  username: string,
  repos: any[]
): Promise<CommitActivity[]> {
  const commitMap = new Map<string, number>()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  for (const repo of repos.slice(0, 10)) {
    try {
      const response = await fetchWithAuth(
        `${GITHUB_API_BASE}/repos/${username}/${repo.name}/commits?since=${oneYearAgo.toISOString()}&per_page=100`
      )

      if (response.ok) {
        const commits = await response.json()
        for (const commit of commits) {
          if (commit.commit?.author?.date) {
            const date = new Date(commit.commit.author.date)
              .toISOString()
              .split('T')[0]
            commitMap.set(date, (commitMap.get(date) || 0) + 1)
          }
        }
      }
    } catch {
      continue
    }
  }

  const activity: CommitActivity[] = []
  const today = new Date()
  const daysToShow = 365

  for (let i = daysToShow; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    activity.push({
      date: dateStr,
      count: commitMap.get(dateStr) || 0,
    })
  }

  return activity
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json(
        { error: 'Username é obrigatório' },
        { status: 400 }
      )
    }

    const repos = await getRepositories(username)
    const [languages, commitActivity] = await Promise.all([
      getLanguagesForRepos(username, repos),
      getCommitActivity(username, repos),
    ])

    const totalCommits = commitActivity.reduce((sum, day) => sum + day.count, 0)

    const stats: GitHubStats = {
      languages,
      commitActivity,
      totalRepos: repos.length,
      totalCommits,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erro ao buscar stats do GitHub:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Erro ao buscar dados',
      },
      { status: 500 }
    )
  }
}

