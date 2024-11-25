"use client"

import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const Wave3D = lazy(() => 
  import('./Wave3D').then(mod => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mod)
      }, 100)
    })
  })
)

const LoadingFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 animate-pulse" />
)

interface ContactSectionProps {
  t: {
    contact: {
      title: string
      name: string
      email: string
      message: string
      phone: string
      send: string
    }
  }
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleWhatsAppClick: () => void
}

const ContactSection: React.FC<ContactSectionProps> = ({ t, handleSubmit, handleWhatsAppClick }) => {
  return (
    <section id="contact" className="relative min-h-screen py-16 sm:py-20">
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingFallback />}>
          <Wave3D />
        </Suspense>
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <motion.h2 
          className="mb-12 text-3xl sm:text-4xl font-bold text-center text-white dark:text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.contact.title}
        </motion.h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <ContactForm 
            t={t}
            handleSubmit={handleSubmit}
            handleWhatsAppClick={handleWhatsAppClick}
          />
          <ContactInfo t={t} />
        </div>
      </div>
    </section>
  )
}

export default ContactSection