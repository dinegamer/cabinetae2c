"use client"

import React from 'react'
import { motion } from 'framer-motion'

export interface ContactFormProps {
  t: {
    contact: {
      title: string;
      name: string;
      firstName: string;
      email: string;
      phone: string;
      postalCode: string;
      company: string;
      needs: string;
      message: string;
      send: string;
    }
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleWhatsAppClick: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ t, handleSubmit, handleWhatsAppClick }) => {
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.contact.firstName}
          </label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.contact.name}
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.email}
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.phone}
        </label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.company}
        </label>
        <input 
          type="text" 
          id="company" 
          name="company" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="needs" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.needs}
        </label>
        <input 
          type="text" 
          id="needs" 
          name="needs" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.message}
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <motion.button 
        type="submit" 
        className="w-full bg-[#1B998B] text-white px-6 py-3 rounded-lg hover:bg-[#1B998B]/80 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t.contact.send}
      </motion.button>
    </motion.form>
  )
}

export default ContactForm

