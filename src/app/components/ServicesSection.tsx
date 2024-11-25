"use client"

import React, { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const LargeScene3D = lazy(() => 
  import('./LargeScene3D').then(mod => {
    return new Promise(resolve => {
      setTimeout(() => resolve(mod), 100)
    })
  })
)

const LoadingPlaceholder = () => (
  <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
)

interface ServicesSectionProps {
  t: {
    services: {
      title: string
      audit: string
      accounting: string
      tax: string
      legal: string
      social: string
      digital: string
      auditDesc: string
      accountingDesc: string
      taxDesc: string
      legalDesc: string
      socialDesc: string
      digitalDesc: string
    }
  }
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ t }) => {
  const [activeServiceCard, setActiveServiceCard] = useState(0)

  const services = [
    { title: t.services.audit, description: t.services.auditDesc },
    { title: t.services.accounting, description: t.services.accountingDesc },
    { title: t.services.tax, description: t.services.taxDesc },
    { title: t.services.legal, description: t.services.legalDesc },
    { title: t.services.social, description: t.services.socialDesc },
    { title: t.services.digital, description: t.services.digitalDesc }
  ]

  return (
    <section id="services" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-3xl sm:text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.services.title}
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px]">
              <Suspense fallback={<LoadingPlaceholder />}>
                <LargeScene3D />
              </Suspense>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  index={index}
                  active={index === activeServiceCard}
                  onClick={() => setActiveServiceCard(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection