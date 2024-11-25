import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, QrCode, Brain, MessageSquare } from 'lucide-react'

interface CareersSectionProps {
  t: {
    careers: {
      title: string
      subtitle: string
      recruitment: string
      recruitmentDesc: string
      training: string
      trainingDesc: string
      support: string
      supportDesc: string
      learnMore: string
      programs: string
      programsList: string[]
    }
  }
}

const CareersSection: React.FC<CareersSectionProps> = ({ t }) => {
  const features = [
    {
      icon: <QrCode className="h-8 w-8" />,
      title: t.careers.recruitment,
      description: t.careers.recruitmentDesc
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: t.careers.training,
      description: t.careers.trainingDesc
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: t.careers.support,
      description: t.careers.supportDesc
    }
  ];

  return (
    <section id="careers" className="relative overflow-hidden bg-gradient-to-br from-white to-[#E6F4F1] dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#1B998B] to-[#3CDFFF] opacity-20 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            className="mb-4 text-5xl font-bold tracking-tight text-[#1B998B] dark:text-[#3CDFFF]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.careers.title}
          </motion.h2>
          <motion.p 
            className="mb-16 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.careers.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-lg rounded-lg">
                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B998B]/10 dark:bg-[#3CDFFF]/10 text-[#1B998B] dark:text-[#3CDFFF]">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  <button className="mt-4 flex items-center text-[#1B998B] dark:text-[#3CDFFF] transition-all group-hover:translate-x-1">
                    {t.careers.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-24 rounded-2xl bg-white/80 dark:bg-gray-800/80 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="mb-6 text-2xl font-semibold">{t.careers.programs}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.careers.programsList.map((program, index) => (
              <div 
                key={index}
                className="flex items-center rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1B998B]/10 dark:bg-[#3CDFFF]/10 text-[#1B998B] dark:text-[#3CDFFF]">
                  {index + 1}
                </div>
                <span className="font-medium">{program}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CareersSection

