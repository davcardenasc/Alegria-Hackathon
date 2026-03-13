"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import es from "@/locales/es.json"
import en from "@/locales/en.json"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
}

const translations: Record<Language, Record<string, string>> = { es, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("alegria-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("alegria-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] ?? key
  }

  const tArray = (key: string): string[] => {
    const dict = translations[language]
    // Check for indexed keys like key.0, key.1, ...
    const items: string[] = []
    let i = 0
    while (dict[`${key}.${i}`] !== undefined) {
      items.push(dict[`${key}.${i}`])
      i++
    }
    if (items.length > 0) return items
    // Fall back to the plain key as a single-item array
    const val = dict[key]
    return val ? [val] : [key]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
