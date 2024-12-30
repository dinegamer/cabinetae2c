"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import NavigationSection from '../components/NavigationSection'
import Footer from '../components/Footer'
import { useTheme } from "next-themes"
import { translations } from '../../translations/index'

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5 relative overflow-hidden">
            <div className="relative h-[450px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top"
                }}
                priority
              />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{name}</h3>
                <p className="text-white/90 text-sm drop-shadow-md">{roles[0]}</p>
              </motion.div>
            </div>
          </div>
          <div className="lg:w-3/5 p-8 lg:p-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{name}</h3>
                <div className="space-y-3">
                  {roles.map((role, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-start gap-3 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <Mail className="w-4 h-4 text-[#1B998B]" />
                  <span>{email}</span>
                </a>
                <div className="flex items-center justify-start gap-3 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                  <Phone className="w-4 h-4 text-[#1B998B]" />
                  <span>
                    {language === 'en' ? 'Phone:' : 'Téléphone:'} (+223) {phone}
                  </span>
                </div>
              </div>
            </div>
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

  const teamMembers = [
    {
      name: "BOUBACAR KANTE",
      roles: [t.team.teamMembers[0].role],
      email: "bkante@ae2cmali.com",
      phone: "66 71 57 97 / 20 28 23 81",
      image: "/membres/membre1.jpg"
    },
    {
      name: "HAMMADOUN TAMBOURA",
      roles: [t.team.teamMembers[1].role],
      email: "htamboura@ae2cmali.com",
      phone: "77 24 17 17 / 20 28 23 81",
      image: "/membres/membre2.jpg"
    },
    {
      name: "ILIASSA CISSE",
      roles: [t.team.teamMembers[2].role],
      email: "icisse@ae2cmali.com",
      phone: "20 28 23 81",
      image: "/membres/membre3.jpg"
    },
    {
      name: "DJIBRIL DOUCOURE",
      roles: [t.team.teamMembers[3].role],
      email: "ddoucoure@ae2cmali.com",
      phone: "20 28 23 81",
      image: "/membres/membre4.jpg"
    }
  ];

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <NavigationSection 
        language={language}
        setLanguage={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
        t={t}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1B998B] to-[#3CDFFF] inline-block text-transparent bg-clip-text mb-6">
                {t.team.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t.team.description}
              </p>
            </motion.div>

            <div className="space-y-16">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} language={language} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer 
            language={language} 
            setLanguage={setLanguage} 
            t={t} 
          />
    </div>
  )
}

