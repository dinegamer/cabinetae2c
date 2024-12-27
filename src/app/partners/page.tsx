"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'

const partners = [
  { name: 'Partner 1', image: '/partenaires/p1.png' },
  { name: 'Partner 2', image: '/partenaires/p2.png' },
  { name: 'Partner 3', image: '/partenaires/p3.png' },
  { name: 'Partner 4', image: '/partenaires/p4.jpg' },
  { name: 'Partner 5', image: '/partenaires/p5.jpg' },
  { name: 'Partner 6', image: '/partenaires/p6.jpg' },
]

export default function PartnersPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const { theme, setTheme } = useTheme()

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = translations[language]

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        t={t}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.partners.title}
            </motion.h1>

            <motion.p
              className="text-center text-lg mb-16 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.partners.subtitle}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-48 sm:h-64">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      layout="fill"
                      objectFit="contain"
                      className="p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                      {partner.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </div>
  )
}

