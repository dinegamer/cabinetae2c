"use client"

import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const Scene3D = lazy(() => 
  import('./Scene3D').then(mod => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mod)
      }, 100)
    })
  })
)

const LoadingFallback = () => (
  <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
)

interface AboutSectionProps {
  t: {
    about: {
      title: string
      description: string
      point1: string
      point2: string
      point3: string
    }
  }
}

const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.about.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg mb-4">{t.about.description}</p>
            <ul className="list-disc list-inside space-y-2">
              <li>{t.about.point1}</li>
              <li>{t.about.point2}</li>
              <li>{t.about.point3}</li>
            </ul>
          </motion.div>
          <motion.div 
            className="relative h-[400px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Scene3D />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection