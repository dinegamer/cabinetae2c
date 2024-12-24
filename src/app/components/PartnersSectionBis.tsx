"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { allPartners } from '../utils/partners-data'
import PartnersSlider from './PartnersSlider'

interface PartnersSectionProps {
  t: {
    partners: {
      title: string
      subtitle: string
      bankingPartnersTitle: string
      otherPartnersTitle: string
    }
  }
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ t }) => {
  const bankPartners = allPartners.filter(p => p.isBank)
  const otherPartners = allPartners.filter(p => !p.isBank)

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.partners.title}
        </motion.h2>
        
        <motion.p
          className="text-center text-lg mb-16 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.partners.subtitle}
        </motion.p>

        {/* Banking partners slider */}
        <div className="mb-20">
          <motion.h3 
            className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.partners.bankingPartnersTitle}
          </motion.h3>
          <PartnersSlider partners={bankPartners} isBank={true} />
        </div>

        {/* Other partners slider */}
        <motion.h3 
          className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.partners.otherPartnersTitle}
        </motion.h3>
        <PartnersSlider partners={otherPartners} />
      </div>
    </section>
  )
}

export default PartnersSection

