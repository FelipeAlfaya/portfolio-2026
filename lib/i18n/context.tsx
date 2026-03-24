'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import enTranslations from './translations/en.json'
import ptTranslations from './translations/pt.json'
import esTranslations from './translations/es.json'

type Language = 'en' | 'pt' | 'es'

type Translations = typeof enTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const toHtmlLang = (lang: Language) => {
  if (lang === 'pt') return 'pt-BR'
  if (lang === 'es') return 'es-ES'
  return 'en'
}

const isValidLanguage = (value: string | undefined | null): value is Language => {
  return value === 'en' || value === 'pt' || value === 'es'
}

const readLanguageCookie = (): Language | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('language='))
  if (!match) return null
  const value = decodeURIComponent(match.split('=')[1] ?? '')
  return isValidLanguage(value) ? value : null
}

const writeLanguageCookie = (lang: Language) => {
  if (typeof document === 'undefined') return
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const maxAgeSeconds = 60 * 60 * 24 * 365
  document.cookie = `language=${encodeURIComponent(lang)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure ? '; Secure' : ''}`
}

export function LanguageProvider({
  children,
  defaultLanguage,
}: {
  children: React.ReactNode
  defaultLanguage: Language
}) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const cookieLang = readLanguageCookie()
    const savedLanguage = localStorage.getItem('language')

    const browserLang = navigator.language.split('-')[0]
    const detected: Language = browserLang === 'pt' || browserLang === 'es' ? browserLang : 'en'

    const chosen: Language = cookieLang ?? (isValidLanguage(savedLanguage) ? savedLanguage : detected)
    if (chosen !== defaultLanguage) setLanguageState(chosen)
    writeLanguageCookie(chosen)
    localStorage.setItem('language', chosen)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const next = toHtmlLang(language)
      if (document.documentElement.lang !== next) document.documentElement.lang = next
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    writeLanguageCookie(lang)
    if (typeof document !== 'undefined') document.documentElement.lang = toHtmlLang(lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

