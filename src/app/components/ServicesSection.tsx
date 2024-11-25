import React, { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const LargeScene3D = dynamic(() => import('./LargeScene3D'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
})

interface ServicesSectionProps {
  t: {
    services: {
      title: string
      audit: string
      accounting: string
      tax: string
      legal: string
      social: string
      digital: string
      auditDesc: string
      accountingDesc: string
      taxDesc: string
      legalDesc: string
      socialDesc: string
      digitalDesc: string
    }
  }
}

const ServiceCard = ({ title, description, index, active, onClick }) => {
  const baseClasses = "relative h-[300px] w-full md:w-[300px] overflow-hidden cursor-pointer";
  const transformStyle = {
    transform: `perspective(1000px) rotateY(${(index - active) * 15}deg) translateZ(${active ? 0 : -100}px)`,
    borderRadius: '30px',
    transition: 'all 0.5s ease-out',
    opacity: active ? 1 : 0.7,
  };

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      style={transformStyle}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B998B] via-[#3CDFFF] to-[#1B998B] opacity-75" style={{ borderRadius: '30px' }} />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" style={{ borderRadius: '30px' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
        <motion.h3
          className="mb-4 text-2xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ t }) => {
  const [activeServiceCard, setActiveServiceCard] = useState(0);

  const services = [
    { title: t.services.audit, description: t.services.auditDesc },
    { title: t.services.accounting, description: t.services.accountingDesc },
    { title: t.services.tax, description: t.services.taxDesc },
    { title: t.services.legal, description: t.services.legalDesc },
    { title: t.services.social, description: t.services.socialDesc },
    { title: t.services.digital, description: t.services.digitalDesc }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.services.title}
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="w-full md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[400px] md:h-[600px]">
              <LargeScene3D />
            </div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap justify-center">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  index={index}
                  active={index === activeServiceCard}
                  onClick={() => setActiveServiceCard(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection

