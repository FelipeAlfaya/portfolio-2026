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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = savedLanguage
      }
    } else {
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'pt' || browserLang === 'es') {
        setLanguageState(browserLang)
        if (typeof document !== 'undefined') {
          document.documentElement.lang = browserLang
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
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

