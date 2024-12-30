"use client"

import React from 'react'
import { useTheme } from "next-themes"
import NavigationSection, { NavigationSectionProps } from '../components/NavigationSection'
import Footer from '../components/Footer'
import AboutSection from '../components/AboutSection'
import { translations } from '../../translations/index'

export default function About() {
  const [language, setLanguage] = React.useState<'fr' | 'en'>('fr')
  const { theme, setTheme } = useTheme()

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = React.useMemo(() => ({
    ...translations[language as keyof typeof translations],
    language
  }), [language])

  return (
    <div className={`${theme || 'light'} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
        t={t as NavigationSectionProps['t']}
      />
      <main className="pt-24">
        <AboutSection t={t} />
      </main>
      <Footer 
            language={language} 
            setLanguage={setLanguage} 
            t={t} 
          />
    </div>
  )
}

