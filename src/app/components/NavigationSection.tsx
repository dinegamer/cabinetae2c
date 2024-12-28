"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'

export interface NavigationSectionProps {
  language: 'fr' | 'en'
  setLanguage: (lang: 'fr' | 'en') => void
  handleThemeChange: () => void
  currentTheme: string | undefined
  t: {
    nav: {
      services: string
      expertise: string
      team: string
      contact: string
      about: string
      partners: string
      certifications: string
      careers: string
      "who-we-are": string
      "banking-references": string
    }
  }
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ 
  language, 
  setLanguage, 
  handleThemeChange, 
  currentTheme = 'light',
  t
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: 'home', fr: 'Accueil', en: 'Home', href: '/' },
    { key: 'about', fr: 'À propos', en: 'About', href: '/about' },
    { key: 'services', fr: 'Nos services', en: 'Our Services', href: '/services' },
    { key: 'team', fr: 'Nos équipes', en: 'Our Team', href: '/team' },
    { key: 'partners', fr: 'Nos partenaires', en: 'Our Partners', href: '/partners' },
    { key: 'contact', fr: 'Contactez-nous', en: 'Contact Us', href: '/contact' }
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-50 w-full">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav 
          className={`flex items-center justify-between h-16 transition-all duration-300 ${
            hasScrolled 
              ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm" 
              : "bg-black/20 backdrop-blur-sm"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/">
            <div className="relative w-[280px] h-[140px] sm:w-[320px] sm:h-[160px] md:w-[360px] md:h-[180px] lg:w-[400px] lg:h-[200px] -ml-4">
              <Image
                src="/logo/svg/ae2c.svg"
                alt="AE2C Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
              />
            </div>
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  hasScrolled
                    ? "text-gray-800 dark:text-gray-200 hover:text-[#F4B223]"
                    : "text-white hover:text-[#F4B223]"
                }`}
              >
                {item[language as keyof typeof item]}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleThemeChange}
              className={`p-2 rounded-full transition-colors ${
                hasScrolled 
                  ? "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" 
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Toggle theme"
            >
              {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className={`p-2 rounded-full transition-colors ${
                hasScrolled 
                  ? "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" 
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Change language"
            >
              <Globe size={18} />
            </button>

            <button
              className={`lg:hidden p-2 rounded-full transition-colors ${
                hasScrolled 
                  ? "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" 
                  : "hover:bg-white/20 text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 border-t dark:border-gray-800 shadow-lg"
          >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item[language as keyof typeof item]}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavigationSection

