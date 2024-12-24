"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation, useTransform, useScroll } from 'framer-motion'
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
  yOffset: number
}
const HeroSection: React.FC<HeroSectionProps> = ({ t, yOffset }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      id: 1,
      image: "/images/ae2c-headquarters.jpg",
      title: t.discover.firm.title,
      description: t.discover.firm.description,
      link: "about"
    },
    {
      id: 2,
      image: "/images/tour-afrique1.jpg",
      title: t.discover.services.title,
      description: t.discover.services.description,
      link: "services"
    },
    {
      id: 3,
      image: "/images/mosque-djenne.jpeg",
      title: t.discover.teams.title,
      description: t.discover.teams.description,
      link: "team"
    }
  ]

  const startAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    autoSlideInterval.current = setInterval(() => {
      handleSlideChange(1);
    }, 5000);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  }, []);

  const handleSlideChange = useCallback(async (newDirection: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(newDirection);
    
    stopAutoSlide();
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    await controls.start("exit");
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
    await controls.start("enter");
    
    setTimeout(() => {
      setIsTransitioning(false);
      startAutoSlide();
    }, 500);
  }, [isTransitioning, controls, slides.length, startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 0.5
      }
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      },
    }),
  }

  const quadrantVariants = {
    initial: { opacity: 1, x: 0, y: 0 },
    exit: (index: number) => ({
      opacity: 0,
      x: (index % 2 === 0 ? -1 : 1) * 100,
      y: (index < 2 ? -1 : 1) * 100,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  const parallaxY = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <>
      <section 
        id="hero"
        className="relative h-screen w-full overflow-hidden"
        style={{ marginTop: `-${yOffset}px` }}
        ref={containerRef}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <motion.div
              className="relative h-full w-full"
              style={{ y: parallaxY }}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="transform scale-105 filter brightness-75"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isTransitioning && (
            <motion.div
              key={`split-${currentSlide}`}
              className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none"
              initial="initial"
              exit="exit"
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
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="transform scale-105 filter brightness-75"
                    style={{
                      objectPosition: `${index % 2 === 0 ? 'left' : 'right'} ${index < 2 ? 'top' : 'bottom'}`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex h-full items-center justify-center px-4 pt-20">
          <div className="container mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={textVariants}
                className="text-center text-white"
              >
                <motion.h1
                  className="mb-6 text-4xl font-bold md:text-6xl"
                  variants={textVariants}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  className="mb-8 text-lg md:text-xl"
                  variants={textVariants}
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div variants={textVariants}>
                  <Link
                    href={`#${slides[currentSlide].link}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-black transition-all hover:bg-white"
                  >
                    {t.discover.learnMore}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                stopAutoSlide();
                handleSlideChange(index - currentSlide);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => {
            stopAutoSlide();
            handleSlideChange(-1);
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="h-6 w-6 rotate-180" />
        </motion.button>
        <motion.button
          onClick={() => {
            stopAutoSlide();
            handleSlideChange(1);
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="h-6 w-6" />
        </motion.button>
      </section>
      <PartnersSection t={t} />
      <MapSection t={t} />
    </>
  )
}

export default HeroSection

