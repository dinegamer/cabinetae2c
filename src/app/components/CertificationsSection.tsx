import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CertificationsSectionProps {
  t: {
    certifications: {
      title: string
      subtitle: string
      description: string
    }
  }
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ t }) => {
  const certifications = [
    { name: "ONECCAM", description: "Ordre National des Experts Comptables et Comptables Agréés du Mali", file: "certification2.jpg" },
    { name: "TomPro", description: "Logiciel pour la gestion de nos tomates", file: "certification1.jpg" },
    { name: "INES", description: "Certification Expert comptable de Paris", file: "certification4.png" },
    { name: "IFAC", description: "Federation internationnale de comptables", file: "certification3.jpg" },
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.certifications.title}
        </motion.h2>
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[300px]">
            {certifications.map((cert, index) => {
              const angle = (index / certifications.length) * 2 * Math.PI;
              const x = Math.cos(angle) * 120;
              const y = Math.sin(angle) * 120;

              return (
                <motion.div
                  key={cert.name}
                  className="absolute w-24 h-24 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center cursor-pointer overflow-hidden p-2"
                  style={{ left: 'calc(50% - 3rem)', top: 'calc(50% - 3rem)' }}
                  initial={{ x, y }}
                  animate={{
                    x: [x, x + 10, x - 10, x],
                    y: [y, y - 10, y + 10, y],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/certification/${cert.file}`}
                      alt={cert.name}
                      width={96}
                      height={96}
                      className="rounded-full object-contain w-full h-full"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="mt-12 text-center">
          <motion.h3
            className="text-2xl font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.certifications.subtitle}
          </motion.h3>
          <motion.p
            className="text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.certifications.description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection

