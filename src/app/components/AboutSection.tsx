"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Clock, TrendingUp, Globe2 } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

interface AboutSectionProps {
  t: {
    language: 'fr' | 'en';
    about: {
      title: string;
      description: string;
      point1: string;
      point2: string;
      point3: string;
      commitments: string;
      trustedActor: string;
      trustedActorDesc: string;
      availability: string;
      availabilityDesc: string;
      skillsDevelopment: string;
      skillsDevelopmentDesc: string;
      environmentalActor: string;
      environmentalActorDesc: string;
    };
    international: {
      title: string;
      countries: { fr: string; en: string }[];
    };
  };
}

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

const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  const commitments = [
    {
      title: t.about.trustedActor,
      icon: Shield,
      description: t.about.trustedActorDesc,
    },
    {
      title: t.about.availability,
      icon: Clock,
      description: t.about.availabilityDesc,
    },
    {
      title: t.about.skillsDevelopment,
      icon: TrendingUp,
      description: t.about.skillsDevelopmentDesc,
    },
    {
      title: t.about.environmentalActor,
      icon: Globe2,
      description: t.about.environmentalActorDesc,
    },
  ];
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Who We Are Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t.about.description}
              </motion.p>
              <motion.ul
                className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <li>{t.about.point1}</li>
                <li>{t.about.point2}</li>
                <li>{t.about.point3}</li>
              </motion.ul>
            </div>
            <motion.div
              className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/local.jpg"
                alt="Façade AE2C"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Countries Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t.international.title}</h2>
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
                <span className="text-sm font-medium text-center text-gray-900 dark:text-white">{country.name[t.language]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t.about.commitments}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <commitment.icon className="w-8 h-8 text-[#1B998B] dark:text-[#3CDFFF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1B998B] dark:text-[#3CDFFF] mb-2">
                      {commitment.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{commitment.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

