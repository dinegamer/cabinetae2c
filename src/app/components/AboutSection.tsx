"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

interface AboutSectionProps {
  t: {
    about: {
      whoWeAre: string;
      facadeAE2C: string;
      description: string;
      ambition: string;
      team: string;
      partners: string;
      commitments: {
        title: string;
        trustedActor: {
          title: string;
          description: string;
        };
        availability: {
          title: string;
          description: string;
        };
        skillsDevelopment: {
          title: string;
          description: string;
        };
        environmentalActor: {
          title: string;
          description: string;
        };
      };
    };
    international: {
      title: string;
    };
    language: 'fr' | 'en';
  };
}

const countries = [
  { name: { fr: "Mali", en: "Mali" }, flag: "/images/flags/flagOfMali.png" },
  { name: { fr: "Mauritanie", en: "Mauritania" }, flag: "/images/flags/flagOfMauritanie.jpg" },
  { name: { fr: "France", en: "France" }, flag: "/images/flags/flagOfFrance.png" },
  { name: { fr: "Sénégal", en: "Senegal" }, flag: "/images/flags/flagOfSenegal.png" },
  { name: { fr: "Burkina Faso", en: "Burkina Faso" }, flag: "/images/flags/flagOfBurkina.png" },
  { name: { fr: "Guinée", en: "Guinea" }, flag: "/images/flags/flagOfGuinea.png" },
  { name: { fr: "Niger", en: "Niger" }, flag: "/images/flags/flagOfNiger.jpeg" },
  { name: { fr: "Congo Brazzaville", en: "Congo Brazzaville" }, flag: "/images/flags/flagOfCongoBrazzaville.png" },
  { name: { fr: "Centrafrique", en: "Central African Republic" }, flag: "/images/flags/flagOfCentrafrique.jpeg" },
  { name: { fr: "Ghana", en: "Ghana" }, flag: "/images/flags/flagOfGhana.png" },
  { name: { fr: "Côte d'Ivoire", en: "Ivory Coast" }, flag: "/images/flags/flagOfCoteDivoire.jpg" },
  { name: { fr: "Bénin", en: "Benin" }, flag: "/images/flags/flagOfBenin.png" }
];

const waveFlag = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  20% { transform: translateY(-5px) rotate(5deg); }
  40% { transform: translateY(0) rotate(0deg); }
  60% { transform: translateY(-3px) rotate(-3deg); }
  80% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-1px) rotate(1deg); }
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
  const currentLanguage = t.language;
  const commitments = [
    {
      title: t.about.commitments.trustedActor.title,
      description: t.about.commitments.trustedActor.description,
      icon: "/engagements/engagement1.jpg",
    },
    {
      title: t.about.commitments.availability.title,
      description: t.about.commitments.availability.description,
      icon: "/engagements/engagement2.jpg",
    },
    {
      title: t.about.commitments.skillsDevelopment.title,
      description: t.about.commitments.skillsDevelopment.description,
      icon: "/engagements/engagement3.jpg",
    },
    {
      title: t.about.commitments.environmentalActor.title,
      description: t.about.commitments.environmentalActor.description,
      icon: "/engagements/engagement4.jpg",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Who We Are Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.about.whoWeAre}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/local.jpg"
                alt={t.about.facadeAE2C}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </motion.div>
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
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t.about.ambition}
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t.about.team}
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {t.about.partners}
              </motion.p>
            </div>
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
                      alt={`Drapeau ${country.name[currentLanguage]}`}
                      layout="fill"
                    />
                  </FlagContainer>
                </div>
                <span className="text-sm font-medium text-center text-gray-900 dark:text-white">{country.name[currentLanguage]}</span>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.about.commitments.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={commitment.icon}
                      alt={commitment.title}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1B998B] dark:text-[#3CDFFF] leading-tight">
                      {commitment.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {commitment.description}
                    </p>
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

