"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

interface AboutSectionProps {
  t: {
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
    };
    language: 'fr' | 'en'; // Get language from t prop
  };
}

const countries = [
  { name: { fr: "Mali", en: "Mali" }, flag: "/images/flags/flagOfMali.png" },
  { name: { fr: "Sénégal", en: "Senegal" }, flag: "/images/flags/flagOfSenegal.png" },
  { name: { fr: "Côte d'Ivoire", en: "Ivory Coast" }, flag: "/images/flags/flagOfCoteDivoire.jpg" },
  { name: { fr: "Burkina Faso", en: "Burkina Faso" }, flag: "/images/flags/flagOfBurkina.png" },
  { name: { fr: "Niger", en: "Niger" }, flag: "/images/flags/flagOfNiger.jpeg" },
  { name: { fr: "Guinée", en: "Guinea" }, flag: "/images/flags/flagOfGuinea.png" },
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
      title: "ACTEUR DE CONFIANCE",
      description: "AE2C agit dans le respect des normes professionnelles internationales et du code de déontologie de l'Ordre des Experts Comptables en particulier en respectant l'indépendance et la confidentialité",
      icon: "/engagements/engagement1.jpg",
    },
    {
      title: "DISPONIBILITE ET ECHANGES REGULIERS TOUT AU LONG DE LA MISSION",
      description: "AE2C est au côté de l'ensemble de ses mandants dans le respect des règles en apportant conseils et expertises techniques nécéssaires à la bonne réalisation des missions tout en restant à l'écoute",
      icon: "/engagements/engagement2.jpg",
    },
    {
      title: "MONTEE EN COMPETENCES POUR NOS SALARIES",
      description: "AE2C s'assure du développement des compétences, de la qualité de vie agréable dans les relations de travail pour l'ensemble des salariés et des partenaires.",
      icon: "/engagements/engagement3.jpg",
    },
    {
      title: "ACTEUR SOUCIEUX DE SON ENVIRONNEMENT",
      description: "AE2C s'engage dans la préservation des ressources de la planète et du respect de l'environnement en adoptant des solutions digitales et une energie propre. Le cabinet fonctionne totalement avec des panneaux solaires.",
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
            QUI SOMMES NOUS ?
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
                alt="Façade AE2C"
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
                AE2C est un cabinet d'expertise comptable, de Commissarait aux Comptes, de conseil et d'études et de Formation de droit malien crée en 2009, inscrit à l'Ordre des Expert-Comptable et des comptables agréés du Mali sous le N° B-09-017 et à vocation internationale.
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Le cabinet AE2C a pour ambition d'aider les dirigeants d'entreprise à décider en toute sécurité et d'accompagner les entrepreneurs à chaque étape de leur activité en apportant des solutions concrètes, en identifiant les forces et les faiblesses de votre organisation pour en faire des facteurs clés de succès.
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Le cabinet dispose d'une vingtaine de collaborateurs aux profils variés et complémentaires permettant d'apporter de la valeur ajoutée dans les différentes prestations en expertise comptable, en conseil et pour les missions d'audit confiées par nos clients.
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                En outre, Le cabinet s'appuie sur un réseau de parténaires pour élargir sa palette d'interventions, d'analyses et apporter les solutions concrètes aux besoins de ses clients.
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
            NOS ENGAGEMENTS
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

