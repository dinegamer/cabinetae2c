"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'

const teamMembers = [
  {
    name: "BOUBACAR KANTE",
    roles: [
      "Associé - Managing Partner & Responsable du Contrôle qualité",
      "Expert-comptable et Commissaire aux comptes diplômé régime français",
      "Expert financier et ancien cadre de Banque"
    ],
    email: "bkante@ae2cmali.com",
    phone: "66 71 57 97 / 20 28 23 81",
    image: "/membres/membre1.jpg"
  },
  {
    name: "HAMMADOUN TAMBOURA",
    roles: [
      "Associé - Managing Director",
      "Expert-comptable et Commissaire aux comptes diplômé régime français",
      "Directeur du département Expertise, ingénierie financière et Conseils"
    ],
    email: "htamboura@ae2cmali.com",
    phone: "77 24 17 17 / 20 28 23 81",
    image: "/membres/membre2.jpg"
  },
  {
    name: "ILIASSA CISSE",
    roles: [
      "Directeur Technique et des Opérations",
      "TechExpert Certifié",
      "Directeur du département Audit, Commissariat aux comptes, système d'information et Organisation"
    ],
    email: "icisse@ae2cmali.com",
    phone: "20 28 23 81",
    image: "/membres/membre3.jpg"
  },
  {
    name: "DJIBRIL DOUCOURE",
    roles: [
      "Expert en Evaluation de projet et Assistance Technique",
      "Directeur du département Etudes-Développement, Assistance Technique et Suivi-Evaluation"
    ],
    email: "ddoucoure@ae2cmali.com",
    phone: "20 28 23 81",
    image: "/membres/membre4.jpg"
  }
]

interface TeamMemberProps {
  name: string;
  roles: string[];
  email: string;
  phone: string;
  image: string;
  language: 'fr' | 'en';
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, roles, email, phone, image, language }) => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="lg:w-1/3 relative h-[400px] lg:h-auto">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          objectPosition="center top"
          className="rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
        />
      </div>
      <div className="lg:w-2/3 p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{name}</h3>
        <ul className="mb-6 space-y-2">
          {roles.map((role, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{role}</li>
          ))}
        </ul>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-primary" />
            <a href={`mailto:${email}`} className="text-sm text-primary hover:underline">{email}</a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-primary" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Phone:' : 'Téléphone:'} (+223) {phone}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  const [language, setLanguage] = React.useState<'fr' | 'en'>('fr')
  const { theme, setTheme } = useTheme()

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const t = translations[language]

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
        t={t}
      />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.team.title}
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.team.description}
            </motion.p>

            <div className="space-y-12">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} language={language} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </div>
  )
}

