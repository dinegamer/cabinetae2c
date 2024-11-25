"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle } from 'lucide-react'

interface ContactFormProps {
  t: {
    contact: {
      name: string
      email: string
      message: string
      send: string
    }
  }
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleWhatsAppClick: () => void
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
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.contact.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1B998B] hover:bg-[#1B998B]/80 transition-colors"
        >
          <Send className="w-4 h-4" />
          {t.contact.send}
        </button>
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
      </div>
    </motion.form>
  )
}

export default ContactForm