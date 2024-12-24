"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

const waveFlag = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  20% {
    transform: translateY(-5px) rotate(5deg);
  }
  40% {
    transform: translateY(0) rotate(0deg);
  }
  60% {
    transform: translateY(-3px) rotate(-3deg);
  }
  80% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-1px) rotate(1deg);
  }
`;

const FlagContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: left;
  animation: ${waveFlag} 6s ease-in-out infinite;
`;

const FlagImage = styled(Image)`
  object-fit: cover;
  object-position: left;
`;

const countries = [
  {
    name: { fr: "Mali", en: "Mali" },
    flag: "/images/flags/flagOfMali.png",
  },
  {
    name: { fr: "Sénégal", en: "Senegal" },
    flag: "/images/flags/flagOfSenegal.png",
  },
  {
    name: { fr: "Côte d'Ivoire", en: "Ivory Coast" },
    flag: "/images/flags/flagOfCoteDivoire.jpg",
  },
  {
    name: { fr: "Burkina Faso", en: "Burkina Faso" },
    flag: "/images/flags/flagOfBurkina.png",
  },
  {
    name: { fr: "Niger", en: "Niger" },
    flag: "/images/flags/flagOfNiger.jpeg",
  },
  {
    name: { fr: "Guinée", en: "Guinea" },
    flag: "/images/flags/flagOfGuinea.png",
  },
];

interface InternationalSectionProps {
  t: {
    language: 'fr' | 'en';
    international: {
      title: string;
      countries: { fr: string; en: string }[];
    };
  };
}

const InternationalSection: React.FC<InternationalSectionProps> = ({ t }) => {
  return (
    <section id="international" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.international.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={country.name.fr}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-24 h-16 mb-4 overflow-hidden rounded-md">
                  <FlagContainer>
                    <FlagImage
                      src={country.flag}
                      alt={`Drapeau ${country.name.fr}`}
                      layout="fill"
                    />
                  </FlagContainer>
                </div>
                <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                  {country.name[t.language]}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InternationalSection

