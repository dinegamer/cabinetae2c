"use client"

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import dynamic from 'next/dynamic'

const Wave3D = dynamic(() => import('./Wave3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 animate-pulse" />
  )
})

interface ContactSectionProps {
  t: {
    contact: {
      title: string
    }
  }
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  return (
    <section id="contact" className="relative min-h-screen py-16 sm:py-20">
      <div className="absolute inset-0">
        <Wave3D />
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <motion.h2 
          className="mb-12 text-3xl sm:text-4xl font-bold text-center text-[#1B998B] dark:text-[#F4B223] drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.contact.title}
        </motion.h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <ContactForm t={t} />
          <ContactInfo t={t} />
        </div>
      </div>
    </section>
  )
}

export default ContactSection

