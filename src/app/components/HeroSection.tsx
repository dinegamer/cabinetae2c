"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PartnersSection from './PartnersSection'
import MapSection from './MapSection'

interface HeroSectionProps {
  t: {
    hero: {
      title: string
      subtitle: string
    }
    discover: {
      firm: {
        title: string
        description: string
      }
      services: {
        title: string
        description: string
      }
      teams: {
        title: string
        description: string
      }
      learnMore: string
    }
  }
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)

  const slides = [
    {
      id: 1,
      image: "/images/ae2c-headquarters.jpg",
      title: "Découvrez notre cabinet",
      description: "Expertise comptable reconnue depuis 2009",
      buttonText: "Plus d'info →",
      buttonLink: "/about"
    },
    {
      id: 2,
      image: "/images/tour-afrique1.jpg",
      title: "Découvrez nos services",
      description: "Le cabinet AE2C vous accompagne dans les différents stades de nos projets ou missions afin d'apporter des solutions concrètes et une expértise reconnue",
      buttonText: "Nos services →",
      buttonLink: "/services"
    },
    {
      id: 3,
      image: "/images/mosque-djenne.jpeg",
      title: "Découvrez nos équipes",
      description: "AE2C Mali s'appuie sur une équipe d'une vingtaine de collaborateurs expérimentés et au profil varié",
      buttonText: "Notre équipe →",
      buttonLink: "/team"
    }
  ]

  const countries = [
    'Mali', 'Mauritanie', 'France', 'Sénégal', 'Burkina Faso', 'Guinée Conakry',
    'Niger', 'Congo Brazzaville', 'Centrafrique', 'Ghana', 'Côte d\'Ivoire', 'Bénin'
  ]

  const handleSlideChange = useCallback((direction: number) => {
    if (isTransitioning || !mounted) return
    setIsTransitioning(true)
    
    const newNextSlide = (currentSlide + direction + slides.length) % slides.length
    setNextSlide(newNextSlide)
    
    setTimeout(() => {
      setCurrentSlide(newNextSlide)
      setIsTransitioning(false)
    }, 3000) 
  }, [isTransitioning, mounted, currentSlide, slides.length])

  const startAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current)
    }
    autoSlideInterval.current = setInterval(() => {
      handleSlideChange(1)
    }, 6000)
  }, [handleSlideChange])

  useEffect(() => {
    setMounted(true)
    startAutoSlide()
    return () => {
      setMounted(false)
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current)
      }
    }
  }, [startAutoSlide])

  const quadrantVariants = {
    initial: { opacity: 1, scale: 1, x: 0, y: 0 },
    exitCurrent: (index: number) => ({
      opacity: 0,
      scale: 0,
      x: index % 2 === 0 ? '-100%' : '100%',
      y: index < 2 ? '-100%' : '100%',
      transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
    }),
    enterNext: {
      opacity: 0,
      scale: 1.2, 
    },
    centerNext: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 2.5, 
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  return (
    <div className="relative w-full font-inter">
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={`full-${currentSlide}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isTransitioning && (
            <>
              <motion.div
                key={`split-current-${currentSlide}`}
                className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none"
                initial="initial"
                animate="exitCurrent"
                transition={{ staggerChildren: 0.15 }} 
              >
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden"
                    variants={quadrantVariants}
                    custom={index}
                  >
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: `${index % 2 === 0 ? 'left' : 'right'} ${index < 2 ? 'top' : 'bottom'}`
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                key={`next-${nextSlide}`}
                className="absolute inset-0 pointer-events-none"
                initial="enterNext"
                animate="centerNext"
                transition={{ delay: 0.5 }} 
              >
                <motion.div
                  className="relative w-full h-full"
                  variants={quadrantVariants}
                >
                  <Image
                    src={slides[nextSlide].image}
                    alt={slides[nextSlide].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-[#F4B223] mb-4"
                >
                  {slides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={`description-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-white text-lg mb-8"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`button-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    href={slides[currentSlide].buttonLink}
                    className="inline-flex items-center px-6 py-3 bg-[#1B998B] text-white rounded hover:bg-[#168577] transition-colors"
                  >
                    {slides[currentSlide].buttonText}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index - currentSlide)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-[#1B998B]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => handleSlideChange(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>

        <button
          onClick={() => handleSlideChange(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </section>

      {/* Content Section */}
      <div className="relative -mt-24 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 relative h-[280px]">
              <Image
                src="/images/consultant.jpg"
                alt="Consultante AE2C"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-full md:w-1/3 bg-[#F4B223] p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                AE2C International
              </h2>
              <p className="text-white text-base leading-relaxed mb-4">
                Notre cabinet d'expertise comptable et d'audit rayonne à travers 12 pays : 
                {countries.join(', ')}. Notre expertise locale et notre réseau international 
                font de nous votre partenaire privilégié pour votre développement en Afrique et en Europe.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-white hover:underline"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="w-full md:w-1/3 p-8 bg-white shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                <span className="text-[#1B998B]">Votre</span> devis comptable gratuit et sans engagement !
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Vous souhaitez obtenir un devis comptable ? Remplissez le formulaire et nous vous répondrons sous 48h.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm px-4 py-2 bg-[#1B998B] text-white rounded hover:bg-[#168577] transition-colors"
              >
                Demander un devis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <PartnersSection t={t} />
        </div>
      </div>

      {/* Map Section */}
      <div className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <MapSection t={t} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection

