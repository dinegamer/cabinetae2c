"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PartnersSectionProps {
  t: {
    partners: {
      title: string
      usaid: string
      tomate: string
      morana: string
      moranaAudit: string
      enplus: string
      intecsup: string
      description: string
    }
  }
}

const PartnerCard = ({ name, description, image, index }: { name: string, description: string, image: string, index: number }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B998B]/20 to-[#3CDFFF]/20 rounded-xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
      <div className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300">
        <motion.div 
          className="flex items-center justify-center mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="w-32 h-32 relative">
            <Image
              src={`/partenaires/${image}`}
              alt={name}
              width={128}
              height={128}
              className="object-contain w-full h-full"
            />
          </div>
        </motion.div>
        <h3 className="text-xl font-bold text-center mb-2 text-white dark:text-gray-200">{name}</h3>
        <p className="text-sm text-center text-gray-300 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ t }) => {
  const partners = [
    { name: "USAID", logo: "usaid.png", description: t.partners.usaid },
    { name: "TOMATE", logo: "tomate.png", description: t.partners.tomate },
    { name: "Morana", logo: "morana.jpg", description: t.partners.morana },
    { name: "Morana Audit", logo: "morana_audit.jpg", description: t.partners.moranaAudit },
    { name: "Enplus", logo: "enplus.jpg", description: t.partners.enplus },
    { name: "Intecsup", logo: "intecsup.png", description: t.partners.intecsup },
  ]

  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0F2D4A] dark:from-gray-900 dark:to-gray-800 text-white dark:text-gray-200">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.partners.title}
        </motion.h2>
        <motion.p
          className="text-center text-xl mb-12 text-white dark:text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.partners.description}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard
              key={partner.name}
              name={partner.name}
              description={partner.description}
              image={partner.logo}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection

