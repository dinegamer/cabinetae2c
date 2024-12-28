"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'

interface ServiceSectionProps {
  title: string;
  description: string;
  subsections?: {
    [key: string]: {
      title: string;
      services: string[];
    };
  };
  services?: string[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  subsections,
  services,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-8 space-y-8">
        <div className="flex items-start gap-4">
          <div className="relative w-8 h-8 flex-shrink-0 mt-1">
            <Image
              src="/images/star.png"
              alt="Star icon"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {subsections ? (
            Object.entries(subsections).map(([key, subsection]) => (
              <div 
                key={key}
                className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 text-sm">
                  {subsection.title}
                </h4>
                <ul className="space-y-3">
                  {subsection.services.map((service, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <ChevronRight className="w-4 h-4 text-[#F4B223] flex-shrink-0 mt-1" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : services ? (
            <div className="col-span-2">
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <ChevronRight className="w-4 h-4 text-[#F4B223] flex-shrink-0 mt-1" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = translations[language]
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

      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-16">
              <motion.div 
                className="w-full lg:w-1/3 lg:sticky lg:top-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/services.jpg"
                    alt="Services AE2C"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <div className="w-full lg:w-2/3">
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative py-3 bg-[#FCD0B1] rounded-lg">
                    <div className="absolute inset-y-0 left-6 right-6 flex items-center">
                      <div className="h-px bg-gray-600 flex-1" />
                      <h2 className="text-2xl font-bold text-gray-900 px-4">
                        Nos domaines d'intervention
                      </h2>
                      <div className="h-px bg-gray-600 flex-1" />
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-12">
                  {Object.entries(sections).map(([key, section], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ServiceSection
                        title={section.title}
                        description={section.description}
                        subsections={'subsections' in section ? section.subsections : undefined}
                        services={'services' in section ? section.services : undefined}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </div>
  )
}

