import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const CreditCard3D = dynamic(() => import('./CreditCard3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
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
    <section id="hero" className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F1] to-white dark:from-gray-800 dark:to-gray-900" />
      <div className="relative w-full max-w-full px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid gap-8 lg:gap-24 lg:grid-cols-2">
          <motion.div
            className="relative"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            <motion.h1
              className="mb-6 lg:mb-12 text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
            >
              {t.hero.title.split(' ').map((word, index) => (
                <span key={index} className="inline-block mr-2">
                  {word}
                </span>
              ))}
              <span className="text-[#1B998B] dark:text-[#3CDFFF]">SUCCES</span>
            </motion.h1>

            <motion.div 
              className="relative h-[300px] lg:h-[400px] w-full"
              style={{ y: yOffset }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2.1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 rounded-3xl bg-[#1B998B]/20 dark:bg-[#3CDFFF]/20" />
              <CreditCard3D />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            <motion.h2 
              className="mb-12 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
            >
              {t.hero.subtitle}
            </motion.h2>

            <motion.div 
              className="relative mt-12"
              style={{ y: yOffset }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2.1, ease: "easeOut" }}
            >
              <div className="relative mx-auto max-w-md rounded-2xl bg-gray-900 p-8 text-white dark:bg-white dark:text-gray-900">
                <div className="mt-16 text-center">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="mt-2 text-gray-400 dark:text-gray-600">{t.hero.trustText}</div
>
                  <button className="mt-6 flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-gray-300 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200">
                    <span>{t.hero.learnMore}</span>
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

