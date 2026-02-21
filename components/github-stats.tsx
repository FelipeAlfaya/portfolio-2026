'use client'

import { useGitHubStats } from '@/hooks/use-github-stats'
import { Skeleton } from '@/components/ui/skeleton'
import { Github, GitCommit, Code2, Loader2 } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface GitHubStatsProps {
  username?: string
}

const COLORS = [
  '#8b5cf6',
  '#a78bfa',
  '#7c3aed',
  '#6d28d9',
  '#c084fc',
  '#d946ef',
  '#ec4899',
  '#f472b6',
]

export function GitHubStats({ username }: GitHubStatsProps) {
  const { t } = useTranslation()
  const { data, loading, error } = useGitHubStats(username)

  if (!username) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-400'>{t.github.configureUsername}</p>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-400'>{error}</p>
      </div>
    )
  }

  const languagesData = data
    ? Object.entries(data.languages)
        .map(([name, bytes]) => ({
          name: name.length > 12 ? name.substring(0, 12) + '...' : name,
          fullName: name,
          bytes,
        }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 8)
    : []

  const totalBytes = languagesData.reduce((sum, lang) => sum + lang.bytes, 0)

  const languagesWithPercentage = languagesData.map((lang) => ({
    ...lang,
    percentage: ((lang.bytes / totalBytes) * 100).toFixed(1),
  }))

  const stats = [
    {
      icon: <Github className='w-5 h-5' />,
      label: t.github.repositories,
      value: data?.totalRepos || 0,
    },
    {
      icon: <GitCommit className='w-5 h-5' />,
      label: t.github.commits,
      value: data?.totalCommits || 0,
    },
    {
      icon: <Code2 className='w-5 h-5' />,
      label: t.github.languages,
      value: languagesData.length,
    },
  ]

  return (
    <div className='space-y-10'>
      {/* Inline stat counters */}
      <div className='grid grid-cols-3 gap-3 md:gap-6'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='flex items-center gap-2 md:gap-4 card-glass rounded-2xl px-3 md:px-6 py-3 md:py-4'
          >
            <div className='text-violet-400 hidden sm:block'>{stat.icon}</div>
            <div>
              {loading ? (
                <Skeleton className='h-7 w-14 mb-1' />
              ) : (
                <p className='text-lg md:text-2xl font-bold text-foreground'>
                  {stat.value.toLocaleString()}
                </p>
              )}
              <p className='text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider'>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + language bars side by side */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Bar chart */}
        <div className='flex-1 card-glass rounded-2xl p-6'>
          <h3 className='text-lg font-semibold text-foreground mb-6'>
            {t.github.mostUsed}
          </h3>
          {loading ? (
            <div className='h-[280px] flex items-center justify-center'>
              <div className='flex flex-col items-center gap-3'>
                <Loader2 className='w-8 h-8 text-violet-400 animate-spin' />
                <p className='text-sm text-muted-foreground'>
                  Loading chart data...
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width='100%' height={280}>
              <BarChart data={languagesWithPercentage}>
                <XAxis
                  dataKey='name'
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(139, 92, 246, 0.06)', radius: 8 }}
                  contentStyle={{
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.6)',
                    padding: '12px 16px',
                  }}
                  itemStyle={{ color: '#e5e7eb', fontSize: '13px' }}
                  labelStyle={{
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}
                  formatter={(value: number) => [`${(value / 1024).toFixed(1)} KB`, 'Size']}
                />
                <Bar dataKey='bytes' radius={[6, 6, 0, 0]} barSize={32}>
                  {languagesWithPercentage.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Language breakdown bars */}
        <div className='lg:w-[340px] card-glass rounded-2xl p-6'>
          <h3 className='text-lg font-semibold text-foreground mb-6'>
            {t.github.languages}
          </h3>
          {loading ? (
            <div className='space-y-5'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-2 w-full rounded-full' />
                </div>
              ))}
            </div>
          ) : (
            <div className='space-y-4'>
              {languagesWithPercentage.map((lang, index) => (
                <div key={lang.fullName} className='group'>
                  <div className='flex items-center justify-between mb-1.5'>
                    <div className='flex items-center gap-2'>
                      <div
                        className='w-2.5 h-2.5 rounded-full'
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className='text-sm font-medium text-foreground'>
                        {lang.fullName}
                      </span>
                    </div>
                    <span className='text-xs text-muted-foreground font-mono'>
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
                    <div
                      className='h-full rounded-full transition-all duration-700 ease-out group-hover:opacity-80'
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
