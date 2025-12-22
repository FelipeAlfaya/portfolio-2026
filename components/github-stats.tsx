'use client'

import { useGitHubStats } from '@/hooks/use-github-stats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Github, Code2, Calendar, Loader2 } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts'

interface GitHubStatsProps {
  username?: string
}

const COLORS = [
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#84cc16',
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

  const recentActivity = data
    ? data.commitActivity.slice(-30).map((day) => ({
        date: new Date(day.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        count: day.count,
      }))
    : []

  const pieChartData = languagesWithPercentage.map((lang) => ({
    name: lang.fullName,
    value: lang.bytes,
    percentage: lang.percentage,
  }))

  return (
    <div className='space-y-8'>
      <div className='grid md:grid-cols-3 gap-6'>
        <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-300'>
              {t.github.repositories}
            </CardTitle>
            <Github className='h-4 w-4 text-blue-400' />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-8 w-20' />
            ) : (
              <div className='text-2xl font-bold text-white'>
                {data?.totalRepos || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-300'>
              {t.github.commits}
            </CardTitle>
            <Calendar className='h-4 w-4 text-purple-400' />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-8 w-20' />
            ) : (
              <div className='text-2xl font-bold text-white'>
                {data?.totalCommits || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-300'>
              {t.github.languages}
            </CardTitle>
            <Code2 className='h-4 w-4 text-pink-400' />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-8 w-20' />
            ) : (
              <div className='text-2xl font-bold text-white'>
                {languagesData.length}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-8'>
        <Card className='bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
          <CardHeader>
            <CardTitle className='text-white'>{t.github.mostUsed}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='space-y-6'>
                <Tabs defaultValue='bar' className='w-full'>
                  <TabsList className='grid w-full grid-cols-2 bg-white/5 border border-white/10'>
                    <TabsTrigger
                      value='bar'
                      className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400'
                      disabled
                    >
                      {t.github.barChart}
                    </TabsTrigger>
                    <TabsTrigger
                      value='pie'
                      className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400'
                      disabled
                    >
                      {t.github.pieChart}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='bar' className='mt-4'>
                    <div className='relative h-[300px] flex items-center justify-center'>
                      <div className='absolute inset-0 flex flex-col justify-end gap-2 px-4 pb-8'>
                        {[0.8, 0.6, 0.7, 0.5, 0.9, 0.65, 0.75, 0.55].map(
                          (height, index) => (
                            <div
                              key={index}
                              className='flex items-end gap-2'
                              style={{ height: '12.5%' }}
                            >
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.05}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.1}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.15}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.2}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.25}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.3}s`,
                                }}
                              />
                              <Skeleton
                                className='bg-blue-600/20'
                                style={{
                                  width: '12%',
                                  height: `${height * 100}%`,
                                  animationDelay: `${index * 0.1 + 0.35}s`,
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='flex flex-col items-center gap-3'>
                          <Loader2 className='w-8 h-8 text-blue-400 animate-spin' />
                          <p className='text-sm text-gray-400'>
                            Loading chart data...
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value='pie' className='mt-4'>
                    <div className='relative h-[300px] flex items-center justify-center'>
                      <div className='relative w-64 h-64'>
                        <div className='absolute inset-0 rounded-full border-8 border-blue-600/20 animate-pulse' />
                        <div
                          className='absolute inset-4 rounded-full border-8 border-blue-600/20 animate-pulse'
                          style={{ animationDelay: '0.2s' }}
                        />
                        <div
                          className='absolute inset-8 rounded-full border-8 border-blue-600/20 animate-pulse'
                          style={{ animationDelay: '0.4s' }}
                        />
                      </div>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='flex flex-col items-center gap-3'>
                          <Loader2 className='w-8 h-8 text-blue-400 animate-spin' />
                          <p className='text-sm text-gray-400'>
                            Loading chart data...
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className='flex flex-wrap gap-3'>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton
                      key={i}
                      className='h-8 w-24 bg-white/5 rounded-md'
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className='space-y-6'>
                <Tabs defaultValue='bar' className='w-full'>
                  <TabsList className='grid w-full grid-cols-2 bg-white/5 border border-white/10'>
                    <TabsTrigger
                      value='bar'
                      className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400'
                    >
                      {t.github.barChart}
                    </TabsTrigger>
                    <TabsTrigger
                      value='pie'
                      className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400'
                    >
                      {t.github.pieChart}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='bar' className='mt-4'>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart data={languagesWithPercentage}>
                        <XAxis
                          dataKey='name'
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <YAxis
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            padding: '12px',
                          }}
                          itemStyle={{
                            color: '#fff',
                            fontSize: '14px',
                          }}
                          labelStyle={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '4px',
                          }}
                          formatter={(
                            value: number,
                            name: string,
                            props: any
                          ) => [`${(value / 1024).toFixed(1)} KB`, 'Bytes']}
                        />
                        <Bar dataKey='bytes' radius={[8, 8, 0, 0]}>
                          {languagesWithPercentage.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value='pie' className='mt-4'>
                    <ResponsiveContainer width='100%' height={300}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx='50%'
                          cy='50%'
                          labelLine={true}
                          label={({ name, percentage }) => {
                            if (parseFloat(percentage) > 5) {
                              return `${name}: ${percentage}%`
                            }
                            return ''
                          }}
                          outerRadius={100}
                          fill='#8884d8'
                          dataKey='value'
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            padding: '12px',
                          }}
                          itemStyle={{
                            color: '#fff',
                            fontSize: '14px',
                          }}
                          labelStyle={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '4px',
                          }}
                          formatter={(
                            value: number,
                            name: string,
                            props: any
                          ) => [
                            `${(value / 1024).toFixed(1)} KB (${
                              props.payload.percentage
                            }%)`,
                            'Bytes',
                          ]}
                        />
                        <Legend
                          wrapperStyle={{
                            color: '#fff',
                            fontSize: '12px',
                          }}
                          formatter={(value, entry: any) => (
                            <span style={{ color: '#fff' }}>
                              {entry.payload.name}: {entry.payload.percentage}%
                            </span>
                          )}
                          iconType='circle'
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
                <div className='flex flex-wrap gap-3'>
                  {languagesWithPercentage.map((lang, index) => (
                    <div
                      key={lang.fullName}
                      className='flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 hover:bg-white/15 transition-colors'
                    >
                      <div
                        className='w-3 h-3 rounded-full'
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className='text-sm text-white font-medium'>
                        {lang.fullName}
                      </span>
                      <span className='text-xs text-gray-300 font-semibold'>
                        {lang.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

