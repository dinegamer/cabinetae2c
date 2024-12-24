import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface ExpertiseSectionProps {
  t: {
    expertise: {
      title: string
      accounting: string
      audit: string
      studies: string
      information: string
      training: string
      accountingDesc: string
      auditDesc: string
      studiesDesc: string
      informationDesc: string
      trainingDesc: string
    }
  }
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ t }) => {
  const [openCard, setOpenCard] = useState<number | null>(null)
  const expertiseData = [
    { title: t.expertise.accounting, icon: "📊", content: t.expertise.accountingDesc },
    { title: t.expertise.audit, icon: "🔍", content: t.expertise.auditDesc },
    { title: t.expertise.studies, icon: "💼", content: t.expertise.studiesDesc },
    { title: t.expertise.information, icon: "💻", content: t.expertise.informationDesc },
    { title: t.expertise.training, icon: "🎓", content: t.expertise.trainingDesc }
  ]
  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <section id="expertise" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-center text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.expertise.title}
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertiseData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#1B998B] to-[#3CDFFF] opacity-30 blur transition duration-1000 group-hover:opacity-100" />
              <div className="relative rounded-2xl bg-white p-0.5 shadow-xl dark:bg-gray-900">
                <div className="rounded-[14px] bg-white dark:bg-gray-900">
                  <div
                    className="flex cursor-pointer items-center justify-between p-6"
                    onClick={() => toggleCard(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#1B998B] to-[#3CDFFF] text-2xl text-white">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                        {item.title}
                      </h3>
                    </div>
                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                      {openCard === index ? (
                        <ChevronUp className="h-5 w-5 text-[#1B998B]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-[#3CDFFF]" />
                      )}
                    </div>
                  </div>
                  {openCard === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800/50">
                        <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpertiseSection

