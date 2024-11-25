import React from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface InternationalSectionProps {
  t: {
    international: {
      title: string
      description: string
      countries: string[]
    }
  }
}

const InternationalSection: React.FC<InternationalSectionProps> = ({ t }) => {
  return (
    <section id="international" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.international.title}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {t.international.countries.map((country, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MapPin className="text-[#1B998B] dark:text-[#3CDFFF]" />
              <span className="text-lg font-semibold">{country}</span>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.international.description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default InternationalSection

