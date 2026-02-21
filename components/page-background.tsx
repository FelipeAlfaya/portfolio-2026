import DarkVeil from '@/components/ui/dark-veil'

export function PageBackground({ 
  children, 
  showDarkVeil = false 
}: { 
  children: React.ReactNode,
  showDarkVeil?: boolean
}) {
  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden'>
      {showDarkVeil && (
        <div className='absolute top-0 left-0 w-full h-screen z-0 pointer-events-none'>
          <DarkVeil
            speed={0.3}
            resolutionScale={1}
          />
        </div>
      )}
      <div className='relative z-10'>{children}</div>
    </div>
  )
}
