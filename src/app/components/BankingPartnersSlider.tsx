import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Image from 'next/image'
import { Partner } from '../types/partners'

interface BankingPartnersSliderProps {
  partners: Partner[]
}

const BankingPartnersSlider: React.FC<BankingPartnersSliderProps> = ({ partners }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(scrollRef, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const scrollAnimation = () => {
        scrollElement.scrollLeft += 1
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0
        }
        requestAnimationFrame(scrollAnimation)
      }
      const animationFrame = requestAnimationFrame(scrollAnimation)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <motion.div
      ref={scrollRef}
      className="relative w-full h-48 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-2xl"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1]
          }
        }
      }}
    >
      <div className="absolute top-0 left-0 w-[200%] h-full flex items-center">
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 w-48 h-48 mx-4 bg-white rounded-full shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-full p-4">
              <Image
                src={`/partenaires/${partner.logo}`}
                alt=""
                layout="fill"
                objectFit="contain"
                className="p-4"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BankingPartnersSlider

