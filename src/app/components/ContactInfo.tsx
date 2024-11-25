"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

interface ContactInfoProps {
  t: {
    contact: {
      title: string
      phone: string
      email: string
    }
  }
}

const ContactInfo: React.FC<ContactInfoProps> = ({ t }) => {
  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t.contact.title}
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Phone className="w-5 h-5 mt-1 text-[#1B998B] dark:text-[#3CDFFF]" />
          <div>
            <p className="text-gray-700 dark:text-gray-300">{t.contact.phone}</p>
            <p className="text-gray-900 dark:text-white">(+223) 20 28 23 81</p>
            <p className="text-gray-900 dark:text-white">(+223) 66 71 57 97</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-5 h-5 mt-1 text-[#1B998B] dark:text-[#3CDFFF]" />
          <div>
            <p className="text-gray-700 dark:text-gray-300">{t.contact.email}</p>
            <a 
              href="mailto:cae2c@ae2cmali.com" 
              className="text-[#1B998B] dark:text-[#3CDFFF] hover:underline transition-colors"
            >
              cae2c@ae2cmali.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactInfo