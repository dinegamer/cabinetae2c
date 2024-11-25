"use client"

import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CreditCard3D = lazy(() => 
  import('./CreditCard3D').then(mod => {
    return new Promise(resolve => {
      // Add small delay to prevent immediate loading
      setTimeout(() => resolve(mod), 100)
    })
  })
)

const LoadingPlaceholder = () => (
  <div className="w-full h-full min-h-[250px] bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
)

interface HeroSectionProps {
  t: {
    hero: {
      title: string
      subtitle: string
      trustText: string
      learnMore: string
    }
  }
  yOffset: number
}

const HeroSection: React.FC<HeroSectionProps> = ({ t, yOffset }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-20 sm:pt-28 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F1] to-white dark:from-gray-800 dark:to-gray-900" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Left Column */}
          <motion.div
            className="flex flex-col space-y-6 sm:space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="block mb-2">{t.hero.title}</span>
              <span className="text-[#1B998B] dark:text-[#3CDFFF]">SUCCES</span>
            </motion.h1>

            <motion.div 
              className="relative w-full aspect-[16/9] max-w-lg mx-auto lg:mx-0"
              style={{ 
                transform: `translateY(${yOffset * 0.2}px)`,
                transition: 'transform 0.1s linear'
              }}
            >
              <Suspense fallback={<LoadingPlaceholder />}>
                <CreditCard3D />
              </Suspense>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t.hero.subtitle}
            </motion.h2>

            <motion.div 
              className="relative w-full max-w-md mx-auto lg:mx-0"
              style={{ 
                transform: `translateY(${yOffset * 0.1}px)`,
                transition: 'transform 0.1s linear'
              }}
            >
              <div className="rounded-2xl bg-gray-900/95 p-6 sm:p-8 text-white dark:bg-white/95 dark:text-gray-900 shadow-xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold">1000+</div>
                  <div className="mt-3 text-base sm:text-lg text-gray-300 dark:text-gray-600">
                    {t.hero.trustText}
                  </div>
                  <button 
                    className="mt-6 flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-gray-300 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 transition-colors"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="text-base sm:text-lg font-medium">{t.hero.learnMore}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection