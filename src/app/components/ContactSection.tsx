"use client"

import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

interface ContactSectionProps {
  t: {
    contact: {
      title: string;
      description: string;
      name: string;
      firstName: string;
      email: string;
      emailValue: string;
      phone: string;
      phoneValue: string;
      postalCode: string;
      company: string;
      needs: string;
      message: string;
      send: string;
      address: string;
      addressValue: string;
      hours: string;
      hoursValue: string;
    }
  }
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Logique de soumission du formulaire
    console.log('Form submitted')
  }

  const handleWhatsAppClick = () => {
    // Logique pour WhatsApp
    console.log('WhatsApp clicked')
  }

  return (
    <section id="contact" className="relative min-h-screen py-16 sm:py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
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
          <ContactForm 
            t={{
              contact: {
                title: t.contact.title,
                name: t.contact.name,
                firstName: t.contact.firstName,
                email: t.contact.email,
                phone: t.contact.phone,
                postalCode: t.contact.postalCode,
                company: t.contact.company,
                needs: t.contact.needs,
                message: t.contact.message,
                send: t.contact.send,
              }
            }}
            handleSubmit={handleSubmit}
            handleWhatsAppClick={handleWhatsAppClick}
          />
          <ContactInfo 
            t={{
              contact: {
                title: t.contact.title,
                description: t.contact.description,
                phone: t.contact.phone,
                phoneValue: t.contact.phoneValue,
                email: t.contact.email,
                emailValue: t.contact.emailValue,
                address: t.contact.address,
                addressValue: t.contact.addressValue,
                hours: t.contact.hours,
                hoursValue: t.contact.hoursValue,
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default ContactSection

