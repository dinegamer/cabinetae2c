import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronUp, ChevronDown, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

interface TeamMemberProps {
  name: string
  role: string
  email: string
  phone: string
  image: string
  index: number
  teamTranslations: {
    role: string
    email: string
    phone: string
  }
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, email, phone, image, index, teamTranslations }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div 
        className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6 flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden rounded-full shadow-lg">
            <Image
              src={image}
              alt={name}
              width={128}
              height={128}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">{role.split('\n')[0]}</p>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold">{teamTranslations.role}</h5>
                  <p className="text-sm whitespace-pre-line">{role}</p>
                </div>
                <div>
                  <h5 className="font-semibold">{teamTranslations.email}</h5>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">{email}</a>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold">{teamTranslations.phone}</h5>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <p className="text-sm">{phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

interface TeamSectionProps {
  t: {
    team: {
      title: string
      teamMembers: Array<{
        name: string
        role: string
        email: string
        phone: string
      }>
    }
  }
}

const TeamSection: React.FC<TeamSectionProps> = ({ t }) => {
  return (
    <section id="team" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.team.title}
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.team.teamMembers.map((member, index) => (
            <TeamMember 
              key={member.name}
              {...member}
              image={`/membres/membre${index + 1}.jpg`}
              index={index}
              teamTranslations={t.team}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection

