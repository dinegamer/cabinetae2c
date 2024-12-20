"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface HeroSectionProps {
  t: {
    hero: {
      title: string
      subtitle: string
      trustText: string
      learnMore: string
    }
    discover?: {
      firm?: string
      firmDesc?: string
      services?: string
      servicesDesc?: string
      teams?: string
      teamsDesc?: string
      learnMore?: string
    }
  }
  yOffset: number
  language: 'fr' | 'en'
}

const images = [
  { src: "/images/ae2c-headquarters.jpg", alt: { fr: "Siège d'AE2C", en: "AE2C Headquarters" } },
  { src: "/images/tour-afrique.jpeg", alt: { fr: "Tour de l'Afrique", en: "Africa Tower" } },
  { src: "/images/mosque-djenne.jpeg", alt: { fr: "Mosquée de Djenné", en: "Djenne Mosque" } },
]

const HeroSection: React.FC<HeroSectionProps> = ({ t, yOffset, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      y: '100%',
      rotate: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      y: '-100%',
      rotate: direction > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  return (
    <section id="hero" className="relative min-h-screen pt-20 sm:pt-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F1] to-white dark:from-gray-800 dark:to-gray-900" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Left Column */}
          <motion.div
            className="flex flex-col space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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

            <div className="relative w-full aspect-[16/9] max-w-lg mx-auto lg:mx-0 overflow-hidden rounded-2xl shadow-2xl">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt[language] || "Image descriptive de AE2C"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </AnimatePresence>
              <motion.div 
                className="absolute inset-0 flex items-center justify-between p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 text-white text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-2">{images[currentImageIndex].alt[language]}</h3>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
              <motion.div 
                className="rounded-2xl bg-gray-900/95 p-6 sm:p-8 text-white dark:bg-white/95 dark:text-gray-900 shadow-xl backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold">{t.hero.trustText.split(' ')[0]}+</div>
                  <div className="mt-3 text-base sm:text-lg text-gray-300 dark:text-gray-600">
                    {t.hero.trustText.split(' ').slice(1).join(' ')}
                  </div>
                  <motion.button 
                    className="mt-6 flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-gray-300 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 transition-colors"
                    onClick={() => scrollToSection('services')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base sm:text-lg font-medium">{t.hero.learnMore}</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Discover Sections */}
        <motion.div 
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { 
              title: t.discover?.firm ?? "Découvrir le cabinet", 
              content: t.discover?.firmDesc ?? "Expertise comptable reconnue depuis 2009", 
              link: "about" 
            },
            { 
              title: t.discover?.services ?? "Découvrir nos services", 
              content: t.discover?.servicesDesc ?? "Solutions concrètes et expertise reconnue", 
              link: "services" 
            },
            { 
              title: t.discover?.teams ?? "Découvrir nos équipes", 
              content: t.discover?.teamsDesc ?? "Professionnels expérimentés à votre service", 
              link: "team" 
            }
          ].map((section, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{section.content}</p>
              <motion.button
                onClick={() => scrollToSection(section.link)}
                className="inline-flex items-center text-[#1B998B] dark:text-[#3CDFFF] hover:underline"
                whileHover={{ x: 5 }}
              >
                {t.discover?.learnMore ?? "En savoir plus"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

