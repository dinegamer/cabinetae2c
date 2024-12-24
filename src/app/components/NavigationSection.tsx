"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NavigationSectionProps {
  language: string
  setLanguage: (lang: string) => void
  handleThemeChange: () => void
  currentTheme: string
  t: any
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ 
  language, 
  setLanguage, 
  handleThemeChange, 
  currentTheme,
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
    { 
      key: 'home', 
      fr: 'Accueil', 
      en: 'Home',
      href: '/'
    },
    { 
      key: 'about', 
      fr: 'À propos', 
      en: 'About',
      href: '/about'
    },
    { 
      key: 'services', 
      fr: 'Nos services', 
      en: 'Our Services',
      href: '/services'
    },
    { 
      key: 'team', 
      fr: 'Nos équipes', 
      en: 'Our Team',
      href: '/team'
    },
    { 
      key: 'partners', 
      fr: 'Nos partenaires', 
      en: 'Our Partners',
      href: '/partners'
    },
    { 
      key: 'contact', 
      fr: 'Contactez-nous', 
      en: 'Contact Us',
      href: '/contact'
    }
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm" 
          : "bg-black/20 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="container mx-auto px-4 h-28 sm:h-32 md:h-36 flex items-center justify-between">
        <motion.div 
          className="flex items-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/">
            <div className="relative w-[280px] h-[140px] sm:w-[360px] sm:h-[180px] md:w-[400px] md:h-[200px] lg:w-[440px] lg:h-[220px] -ml-4">
              <Image
                src="/logo/svg/ae2c.svg"
                alt="AE2C Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 400px, 440px"
              />
            </div>
          </Link>
        </motion.div>

        <motion.div 
          className="hidden lg:flex items-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                hasScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-[#1B998B] dark:hover:text-[#3CDFFF]"
                  : "text-white hover:text-[#3CDFFF]"
              }`}
            >
              {item[language as keyof typeof item]}
            </Link>
          ))}
        </motion.div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleThemeChange}
            className={`p-2 rounded-full transition-colors ${
              hasScrolled 
                ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200" 
                : "hover:bg-white/10 text-white"
            }`}
            aria-label="Toggle theme"
          >
            {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className={`p-2 rounded-full transition-colors ${
              hasScrolled 
                ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200" 
                : "hover:bg-white/10 text-white"
            }`}
            aria-label="Change language"
          >
            <Globe size={20} />
          </button>

          <button
            className={`lg:hidden p-2 rounded-full transition-colors ${
              hasScrolled 
                ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200" 
                : "hover:bg-white/10 text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 border-t dark:border-gray-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item[language as keyof typeof item]}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default NavigationSection

