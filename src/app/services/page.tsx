"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'

interface SubsectionProps {
  title: string;
  services: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const Subsection: React.FC<SubsectionProps> = ({ title, services, isOpen, onToggle }) => (
  <div className="border-l-2 border-primary/20 pl-4 mt-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-medium mb-2 hover:text-primary"
    >
      <span>{title}</span>
      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 overflow-hidden"
        >
          {services.map((service, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>{service}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
)

interface ServiceCardProps {
  title: string;
  description: string;
  subsections?: {
    [key: string]: {
      title: string;
      services: string[];
    };
  };
  services?: string[];
  isActive: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  subsections,
  services,
  isActive,
  onClick,
}) => {
  const [openSubsections, setOpenSubsections] = useState<string[]>([])

  const toggleSubsection = (key: string) => {
    setOpenSubsections(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl p-6
        transition-all duration-300 ease-in-out
        ${isActive
          ? 'bg-card shadow-lg scale-100 border-primary/20 border-2'
          : 'bg-card/50 hover:bg-card shadow hover:shadow-md scale-95 border-transparent border-2'
        }
      `}
      onClick={onClick}
      layout
    >
      <h3 className="text-lg font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-sm mb-4 text-muted-foreground">{description}</p>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {subsections ? (
            Object.entries(subsections).map(([key, subsection]) => (
              <Subsection
                key={key}
                title={subsection.title}
                services={subsection.services}
                isOpen={openSubsections.includes(key)}
                onToggle={() => toggleSubsection(key)}
              />
            ))
          ) : services ? (
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{service}</span>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function ServicesPage() {
  const [language, setLanguage] = useState('fr')
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = translations[language as keyof typeof translations]
  const sections = t.services?.sections || {}

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={setLanguage}
        t={t}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <section id="services" className="py-20 bg-background">
          <div className="container px-4 mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">{t.services.title}</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Services Image */}
              <motion.div 
                className="w-full lg:w-1/2 lg:sticky lg:top-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/services.jpg"
                    alt="Services AE2C"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Service Cards */}
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(sections).map(([key, section]) => (
                    <ServiceCard
                      key={key}
                      title={section.title}
                      description={section.description}
                      subsections={section.subsections}
                      services={section.services}
                      isActive={key === activeSection}
                      onClick={() => setActiveSection(key === activeSection ? null : key)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </div>
  )
}