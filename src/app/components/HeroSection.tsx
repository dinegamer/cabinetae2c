"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const CreditCard3D = dynamic(() => import('./CreditCard3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[250px] bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
  )
})

interface HeroSectionProps {
  t: {
    hero: {
      title: string
      subtitle: string
      trustText: string
      learnMore: string
    }
  }
  yOffset: any
}

const HeroSection: React.FC<HeroSectionProps> = ({ t, yOffset }) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F1] to-white dark:from-gray-800 dark:to-gray-900" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Left Column */}
          <motion.div
            className="flex flex-col space-y-6 sm:space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.hero.title.split(' ').map((word, index) => (
                <span key={index} className="inline-block mr-2">
                  {word}
                </span>
              ))}
              <span className="text-[#1B998B] dark:text-[#3CDFFF]">SUCCES</span>
            </motion.h1>

            <motion.div 
              className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] max-w-lg mx-auto lg:mx-0"
              style={{ y: yOffset }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-[#1B998B]/20 dark:bg-[#3CDFFF]/20" />
              <CreditCard3D />
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.hero.subtitle}
            </motion.h2>

            <motion.div 
              className="relative w-full max-w-md mx-auto lg:mx-0"
              style={{ y: yOffset }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="rounded-2xl bg-gray-900 p-6 sm:p-8 text-white dark:bg-white dark:text-gray-900 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">1000+</div>
                  <div className="mt-2 text-sm sm:text-base text-gray-400 dark:text-gray-600">
                    {t.hero.trustText}
                  </div>
                  <button className="mt-6 flex w-full items-center justify-between rounded-lg bg-gray-800 p-3 sm:p-4 text-gray-300 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 transition-colors">
                    <span className="text-sm sm:text-base">{t.hero.learnMore}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
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