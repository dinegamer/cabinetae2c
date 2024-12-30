import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Code, ExternalLink } from 'lucide-react'

interface FooterProps {
  language: 'fr' | 'en'
  setLanguage: (lang: 'fr' | 'en') => void
  t: {
    footer: {
      description: string
      services: string
      company: string
      contact: string
      location: string
      rights: string
      privacy: string
      terms: string
      developedBy: string
      serviceLinks: Record<string, string>
      companyLinks: Record<string, string>
    }
  }
}

const Footer: React.FC<FooterProps> = ({ language, setLanguage, t }) => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/cabinetae2cmali" },
    { icon: Twitter, href: "https://twitter.com/cabinetae2cmali" },
    { icon: Instagram, href: "https://www.instagram.com/cabinetae2cmali" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/cabinetae2c-mali" },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Image
              src="/logo/svg/ae2c.svg"
              alt="AE2C Logo"
              width={120}
              height={48}
              className="mb-6"
            />
            <p className="text-gray-400 mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-gray-400 hover:text-[#1B998B] transition-colors">
                  <link.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.services}</h3>
            <ul className="space-y-4">
              {Object.entries(t.footer.serviceLinks).map(([key, value]) => (
                <li key={key}>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.company}</h3>
            <ul className="space-y-4">
              {Object.entries(t.footer.companyLinks).map(([key, value]) => (
                <li key={key}>
                  <Link href={`/${key}`} className="text-gray-400 hover:text-white transition-colors">
                    {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={20} />
                <span>{t.footer.location}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} />
                <span>(+223) 20 28 23 81 / 66 71 57 97</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} />
                <span>cae2c@ae2cmali.com</span>
              </li>
              <li>
                <Link href="https://mail.ae2cmali.com/roundcube/" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                  <span>Webmail</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} AE2C. {t.footer.rights}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.terms}
              </Link>
              <div className="text-gray-500 text-sm flex items-center">
                <Link href="mailto:teenagerdine@gmail.com" className="flex items-center hover:text-[#1B998B] transition-colors">
                  <Code size={16} className="mr-1" />
                  <span>{language === 'fr' ? 'Contacter le développeur' : 'Contact the developer'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

