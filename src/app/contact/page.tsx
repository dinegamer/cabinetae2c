"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'
import type { NavigationSectionProps } from '../components/NavigationSection'

export default function ContactPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const { theme, setTheme } = useTheme()

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log('Form submitted:', data)
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = '+22376000000' // Replace with actual phone number
    const message = encodeURIComponent('Bonjour, je souhaite prendre contact avec vous.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <div className={`${theme || 'light'} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        t={t as NavigationSectionProps['t']}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <section id="contact" className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="mb-12 text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {t.contact.title}
            </motion.h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <ContactForm 
                t={t}
                handleSubmit={handleSubmit}
                handleWhatsAppClick={handleWhatsAppClick}
              />
              <ContactInfo t={t} />
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </div>
  )
}

