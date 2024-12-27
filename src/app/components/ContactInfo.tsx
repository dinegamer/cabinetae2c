"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

interface ContactInfoProps {
  t: {
    contact: {
      title: string;
    }
  }
}

const ContactInfo: React.FC<ContactInfoProps> = ({ t }) => {
  return (
    <motion.div
      className="space-y-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-[#1B998B]" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Adresse</h3>
            <p className="text-gray-600 dark:text-gray-300">
              123 Rue Example<br />
              75000 Paris, France
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-[#1B998B]" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Téléphone</h3>
            <p className="text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-[#1B998B]" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">contact@example.com</p>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937586!2d2.292292615509614!3d48.858373079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647856687320!5m2!1sfr!2sfr"
        className="w-full h-64 rounded-lg"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </motion.div>
  )
}

export default ContactInfo
