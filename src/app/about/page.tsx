"use client"

import React, { useState } from 'react'
import { useTheme } from "next-themes"
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import AboutSection from '../components/AboutSection'
import { translations } from '../../translations/index'

export default function About() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = React.useMemo(() => ({
    ...translations[language as keyof typeof translations],
    language
  }), [language])

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
        t={t}
      />
      <main className="pt-24">
        <AboutSection t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

