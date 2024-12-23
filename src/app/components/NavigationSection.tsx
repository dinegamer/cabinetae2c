"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'
import Image from 'next/image'

interface NavigationSectionProps {
  language: string
  setLanguage: (lang: string) => void
  t?: {
    nav?: {
      [key: string]: string
    }
  }
  handleThemeChange: () => void
  currentTheme: string
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ 
  language, 
  setLanguage, 
  t = { nav: {} }, 
  handleThemeChange, 
  currentTheme 
}) => {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)

  const sections = [
    "hero",
    "about",
    "services",
    "expertise",
    "team",
    "partners",
    "certifications",
    "careers",
    "international",
    "contact"
  ]

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsOpen(false)
  }

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
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-[230px] h-[120px]">
            <Image
              src="/logo/svg/ae2c.svg"
              alt="AE2C Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 180px, 180px"
            />
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden lg:flex items-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {sections.filter(section => section !== "hero").map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-sm font-medium transition-colors ${
                hasScrolled
                  ? `${
                      activeSection === section 
                        ? "text-[#1B998B] dark:text-[#3CDFFF]" 
                        : "text-gray-600 dark:text-gray-300"
                    } hover:text-[#1B998B] dark:hover:text-[#3CDFFF]`
                  : "text-white hover:text-[#3CDFFF]"
              }`}
            >
              {t.nav?.[section] || section}
            </button>
          ))}
        </motion.div>

        {/* Actions */}
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

      {/* Mobile Navigation */}
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
              {sections.filter(section => section !== "hero").map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    activeSection === section 
                      ? "text-[#1B998B] dark:text-[#3CDFFF]" 
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {t.nav?.[section] || section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default NavigationSection

