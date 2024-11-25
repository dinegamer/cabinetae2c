import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PartnersSectionProps {
  t: {
    partners: {
      title: string
      subtitle: string
      acdiVoca: string
      unicef: string
      usaid: string
      unWomen: string
      unWomenDesc: string
      icco: string
      helenKeller: string
      africanDevBank: string
      africanDevBankDesc: string
      bsic: string
      bnda: string
    }
  }
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ t }) => {
  const partners = [
    { 
      name: "ACDI Voca", 
      logo: "/partenaires/partenaire1.jpg", 
      description: t.partners.acdiVoca
    },
    { 
      name: "UNICEF", 
      logo: "/partenaires/partenaire2.jpg", 
      description: t.partners.unicef
    },
    { 
      name: "USAID", 
      logo: "/partenaires/partenaire3.jpg", 
      description: t.partners.usaid
    },
    { 
      name: t.partners.unWomen, 
      logo: "/partenaires/partenaire4.jpg", 
      description: t.partners.unWomenDesc
    },
    { 
      name: "ICCO", 
      logo: "/partenaires/partenaire5.jpg", 
      description: t.partners.icco
    },
    { 
      name: "Helen Keller", 
      logo: "/partenaires/partenaire6.jpg", 
      description: t.partners.helenKeller
    },
    { 
      name: t.partners.africanDevBank, 
      logo: "/partenaires/partenaire7.jpg", 
      description: t.partners.africanDevBankDesc
    },
    { 
      name: "BSIC", 
      logo: "/partenaires/partenaire8.jpg", 
      description: t.partners.bsic
    },
    { 
      name: "BNDA", 
      logo: "/partenaires/partenaire9.png", 
      description: t.partners.bnda
    }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0F2D4A] text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.partners.title}
        </motion.h2>
        <motion.p
          className="text-center text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.partners.subtitle}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B998B]/20 to-[#3CDFFF]/20 rounded-xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={96}
                      height={96}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{partner.name}</h3>
                <p className="text-sm text-center text-gray-300">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection

