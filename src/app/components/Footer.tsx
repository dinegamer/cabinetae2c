"use client"

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Code } from 'lucide-react'
import { TranslationType } from '@/types'

interface FooterProps {
  t: TranslationType
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.company}</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {t.footer.address}
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                {t.footer.phone}
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                {t.footer.email}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.links.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-[#F4B223] transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/expertise" className="hover:text-[#F4B223] transition-colors">
                  {t.nav.expertise}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.links.about}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#F4B223] transition-colors">
                  {t.nav["who-we-are"]}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#F4B223] transition-colors">
                  {t.nav.team}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.social.facebook}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#F4B223] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#F4B223] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#F4B223] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#F4B223] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} AE2C. {t.footer.links.legal}
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Code className="w-4 h-4 mr-2" />
              <span className="text-sm text-gray-400">Made with ❤️ by AE2C</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

