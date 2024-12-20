"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronUp, ChevronDown, Mail, Phone, Users } from 'lucide-react'

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
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div 
        className={`
          w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
          transition-all duration-300 cursor-pointer
          hover:shadow-xl border border-gray-100 dark:border-gray-700
          ${isExpanded ? 'scale-100' : 'hover:scale-[1.02]'}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        layout
      >
        <motion.div className="p-6" layout>
          <div className="flex flex-col items-center">
            <div className="relative mb-6 h-40 w-40 overflow-hidden rounded-full shadow-lg border-4 border-primary/10">
              <Image
                src={image}
                alt={name}
                width={160}
                height={160}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">{name}</h3>
            <p className="text-sm text-center text-primary font-medium">{role.split('\n')[0]}</p>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-primary"
            >
              {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </motion.div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700"
            >
              <div className="space-y-4 pt-4">
                <div>
                  <h5 className="font-semibold text-primary mb-2">{teamTranslations.role}</h5>
                  <p className="text-sm whitespace-pre-line text-gray-600 dark:text-gray-300">{role}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-primary mb-2">{teamTranslations.email}</h5>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <a 
                      href={`mailto:${email}`} 
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-primary mb-2">{teamTranslations.phone}</h5>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">(+223) {phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

interface TeamSectionProps {
  t: {
    team: {
      title: string;
      description: string;
      teamSize: string;
      role: string;
      email: string;
      phone: string;
      teamMembers: Array<{
        name: string;
        role: string;
        email: string;
        phone: string;
      }>;
    };
  };
}

const TeamSection: React.FC<TeamSectionProps> = ({ t }) => {
  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.team.title}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.team.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Users className="h-5 w-5" />
              <p className="text-sm font-medium">{t.team.teamSize}</p>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
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

