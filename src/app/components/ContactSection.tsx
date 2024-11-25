import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'

const Wave3D = dynamic(() => import('./Wave3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
})

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
    <section id="contact" className="relative min-h-screen py-20">
      <div className="absolute inset-0">
        <Wave3D />
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <h2 className="mb-12 text-4xl font-bold text-center text-white dark:text-gray-900">{t.contact.title}</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.message}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1B998B] hover:bg-[#1B998B]/80"
              >
                <Send className="w-4 h-4" />
                {t.contact.send}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </form>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-xl space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.contact.title}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#1B998B] dark:text-[#3CDFFF]" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{t.contact.phone}</p>
                  <p className="text-gray-900 dark:text-white">(+223) 20 28 23 81</p>
                  <p className="text-gray-900 dark:text-white">(+223) 66 71 57 97</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#1B998B] dark:text-[#3CDFFF]" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{t.contact.email}</p>
                  <a href="mailto:cae2c@ae2cmali.com" className="text-[#1B998B] dark:text-[#3CDFFF] hover:underline">
                    cae2c@ae2cmali.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

