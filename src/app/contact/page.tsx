"use client"

import React, { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'

// const Wave3D = lazy(() => 
//   import('../components/Wave3D').then(mod => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(mod)
//       }, 100)
//     })
//   })
// )

const LoadingFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 animate-pulse" />
)

export default function ContactPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const { theme, setTheme } = useTheme()

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted')
  }

  const handleWhatsAppClick = () => {
    // Handle WhatsApp click logic here
    console.log('WhatsApp clicked')
  }

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        t={t}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
        <section id="contact" className="relative min-h-screen py-16 sm:py-20">
          <div className="absolute inset-0">
            {/* <Suspense fallback={<LoadingFallback />}>
              <Wave3D />
            </Suspense> */}
          </div>
          
          <div className="relative container mx-auto px-4 z-10">
            <motion.h2 
              className="mb-12 text-3xl sm:text-4xl font-bold text-center text-[#1B998B] dark:text-[#F4B223] drop-shadow-lg"
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

      <Footer 
            language={language} 
            setLanguage={setLanguage} 
            t={t} 
          />
    </div>
  )
}

