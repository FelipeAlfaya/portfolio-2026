'use client'

import { useTranslation } from '@/hooks/use-translation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const languages = [
  { code: 'en', name: 'English', flag: '/USA.svg' },
  { code: 'pt', name: 'Português', flag: '/Brazil.svg' },
  { code: 'es', name: 'Español', flag: '/spain.svg' },
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const currentLang = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='border-border hover:bg-accent hover:text-accent-foreground text-foreground bg-transparent w-10 h-10 p-0'
          title={currentLang?.name}
        >
          {currentLang && (
            <Image
              src={currentLang.flag}
              alt={currentLang.name}
              width={20}
              height={20}
              className='object-contain'
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='bg-popover border-border backdrop-blur-sm'
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'pt' | 'es')}
            className={`cursor-pointer text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground flex items-center gap-2 ${
              language === lang.code ? 'bg-accent' : ''
            }`}
            title={lang.name}
          >
            <span className='text-md'>{lang.name}</span>
            <Image
              src={lang.flag}
              alt={lang.name}
              width={24}
              height={24}
              className='object-contain'
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

