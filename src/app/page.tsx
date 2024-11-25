"use client"

import { useEffect, useRef, useState, Suspense  } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ChevronUp, Menu, X, Sun, Moon, Globe, MapPin, QrCode, Brain, MessageSquare, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Send, MessageCircle, Code } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import dynamic from 'next/dynamic'
const TeamSection = dynamic(() => import('./components/TeamSection'))
const ServicesSection = dynamic(() => import('./components/ServicesSection'))
const ExpertiseSection = dynamic(() => import('./components/ExpertiseSection'))
const AboutSection = dynamic(() => import('./components/AboutSection'))
const PartnersSection = dynamic(() => import('./components/PartnersSection'))
const CertificationsSection = dynamic(() => import('./components/CertificationsSection'))
const CareersSection = dynamic(() => import('./components/CareersSection'))
const InternationalSection = dynamic(() => import('./components/InternationalSection'))
const HeroSection = dynamic(() => import('./components/HeroSection'))

const MapSection = dynamic(() => import('./components/MapSection'))
const ContactSection = dynamic(() => import('./components/ContactSection'))

 const translations = {
  en: {
    nav: { 
      services: "Services", 
      expertise: "Expertise", 
      team: "Team", 
      contact: "Contact", 
      about: "About Us", 
      partners: "Partners", 
      certifications: "Certifications", 
      international: "International", 
      careers: "Careers & Training", 
      "who-we-are": "Who We Are",
      "banking-references": "Banking References" 
    },
    hero: { 
      title: "OUR EXPERTISE AT YOUR SERVICE FOR", 
      subtitle: "Accounting Expertise Firm",
      trustText: "companies trust us!",
      learnMore: "Learn More"
    },
    services: { 
      title: "Our Services",
      audit: "Audit & Consulting",
      accounting: "Accounting",
      tax: "Taxation",
      legal: "Legal",
      social: "Social",
      digital: "Digital",
      auditDesc: "In-depth expertise to optimize your processes",
      accountingDesc: "Precise management of your accounts",
      taxDesc: "Optimization of your tax situation",
      legalDesc: "Legal assistance for your company",
      socialDesc: "Human resources management",
      digitalDesc: "Digital solutions for your business"
    },
    expertise: { 
      title: "Our Expertise",
      accounting: "Accounting Expertise",
      audit: "Audit and Statutory Auditing",
      studies: "Studies and Consulting",
      information: "Information Systems",
      training: "Capacity Building and Training",
      accountingDesc: "Comprehensive accounting management and financial expertise for your business",
      auditDesc: "Specialized audit services and in-depth organizational performance assessment",
      studiesDesc: "Strategic studies and personalized support for SMEs",
      informationDesc: "Information systems solutions and digital transformation",
      trainingDesc: "Customized professional training in key management areas"
    },
    team: { 
      title: "Our Team",
      role: "Role",
      email: "Email",
      phone: "Phone",
      teamMembers: [
        {
          name: "Mr. Boubacar KANTE",
          role: "Partner – Managing Partner - Head of Quality Control\n\nChartered Accountant and Statutory Auditor qualified under the French Regime\n\nFinancial expert and former senior bank executive",
          email: "bkante@ae2cmali.com",
          phone: "66 71 57 97 / 20 28 23 81"
        },
        {
          name: "Mr. Hammadoun TAMBOURA",
          role: "Partner – Managing Director\n\nChartered Accountant and Statutory Auditor qualified under the French Regime\n\nDirector of the Expertise, Financial Engineering and Consulting department",
          email: "htamboura@ae2cmali.com",
          phone: "77 24 17 17 / 20 28 23 81"
        },
        {
          name: "Mr. Iliassa Cissé",
          role: "Technical and Operations Director\n\nCertified TechExpert\n\nDirector of the Audit, Information Systems and Organization department",
          email: "icisse@ae2cmali.com",
          phone: "20 28 23 81"
        },
        {
          name: "Mr. Djibril Doucoure",
          role: "Project Evaluation Expert\n\nDirector of the Studies-Development, Technical Assistance and Monitoring-Evaluation department",
          email: "ddoucoure@ae2cmali.com",
          phone: "20 28 23 81"
        }
      ]
    },
    contact: { 
      title: "Contact Us", 
      name: "Name", 
      email: "Email", 
      message: "Message",
      phone: "Phone:", 
      send: "Send" 
    },
    about: {
      title: "About AE2C",
      description: "AE2C is an audit, accounting, consulting and studies firm established in 2008. We have grown to become a trusted partner for businesses across various sectors.",
      point1: "Registered with the National Order of Chartered Accountants and Certified Accountants of Mali (ONECCAM)",
      point2: "Over 15 years of experience in financial services",
      point3: "International presence across multiple African countries"
    },
    partners: { 
      title: "Our references",
      subtitle: "Partner in agricultural development and economic growth",
      acdiVoca: "Partner in agricultural development and economic growth",
      unicef: "Partner for child development and protection",
      usaid: "United States Agency for International Development",
      unWomen: "UN Women",
      unWomenDesc: "Partner for gender equality and women's empowerment",
      icco: "International organization for development cooperation",
      helenKeller: "Partner in health and nutrition",
      africanDevBank: "African Development Bank",
      africanDevBankDesc: "Pan-African development finance institution",
      bsic: "Sahelo-Saharan Bank for Investment and Commerce",
      bnda: "National Bank for Agricultural Development"
    },
    certifications: { 
      title: "Our Certifications",
      subtitle: "Our Accreditations",
      description: "AE2C is proud to be recognized by the leading professional organizations in the sector."
    },
    international: { 
      title: "International Presence",
      description: "Our international presence allows us to offer services tailored to local needs while benefiting from global expertise.",
      countries: [
        "Mali", "Senegal", "Ivory Coast", "Burkina Faso", "Niger", "Guinea"
      ]
    },
    careers: { 
      title: "Careers and Training",
      subtitle: "Join our team and develop your professional skills",
      description: "Discover our career opportunities and our transparent recruitment process",
      recruitment: "Recruitment Process",
      recruitmentDesc: "Discover our career opportunities and our transparent recruitment process",
      training: "Professional Training",
      trainingDesc: "Continuous training programs to develop your skills",
      support: "Personalized Support",
      supportDesc: "Personalized follow-up throughout your journey",
      programs: "Our Training Programs",
      learnMore: "Learn More",
      programsList: [
        "Advanced Accounting",
        "Tax Management",
        "Audit and Control",
        "Team Management",
        "Business Law",
        "Digital Tools"
      ]
    },
    footer: {
      services: "Services",
      company: "Company",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      description: "Accounting expert and business management consultant",
      serviceLinks: {
        accounting: "Accounting Expertise",
        audit: "Audit",
        consulting: "Consulting",
        training: "Training"
      },
      companyLinks: {
        about: "About",
        careers: "Careers",
        partners: "Partners",
        contact: "Contact"
      },
      location: "Bamako, Mali",
      developedBy: "Designed and Developed by"
    },
    map: {
      title: "Our Location",
      openInMaps: "Open in Google Maps"
    }
  },
  fr: {
    nav: { 
      services: "Services", 
      expertise: "Expertise", 
      team: "Équipe", 
      contact: "Contact", 
      about: "À Propos", 
      partners: "Partenaires", 
      certifications: "Certifications", 
      international: "International", 
      careers: "Carrières & Formation", 
      "who-we-are": "Qui Sommes-Nous",
      "banking-references": "Références Bancaires"
    },
    hero: { 
      title: "NOTRE EXPERTISE AU SERVICE DE VOTRE", 
      subtitle: "Cabinet d'Expertise Comptable",
      trustText: "entreprises nous font confiance !",
      learnMore: "En savoir plus"
    },
    services: { 
      title: "Nos Services",
      audit: "Audit & Conseil",
      accounting: "Comptabilité",
      tax: "Fiscalité",
      legal: "Juridique",
      social: "Social",
      digital: "Digital",
      auditDesc: "Expertise approfondie pour optimiser vos processus",
      accountingDesc: "Gestion précise de vos comptes",
      taxDesc: "Optimisation de votre situation fiscale",
      legalDesc: "Assistance juridique pour votre entreprise",
      socialDesc: "Gestion des ressources humaines",
      digitalDesc: "Solutions numériques pour votre entreprise"
    },
    expertise: { 
      title: "Notre Expertise",
      accounting: "Expertise Comptable",
      audit: "Audit et commissariat aux comptes",
      studies: "Etudes et Conseils",
      information: "Système d'information",
      training: "Renforcement de capacités et formation",
      accountingDesc: "Gestion comptable complète et expertise financière pour votre entreprise",
      auditDesc: "Audit spécialisé et évaluation approfondie des performances organisationnelles",
      studiesDesc: "Études stratégiques et accompagnement personnalisé des PME/PMI",
      informationDesc: "Solutions de systèmes d'information et transformation digitale",
      trainingDesc: "Formation professionnelle sur mesure dans les domaines clés de gestion"
    },
    team: { 
      title: "Notre Équipe",
      role: "Rôle",
      email: "Email",
      phone: "Téléphone",
      teamMembers: [
        {
          name: "M. Boubacar KANTE",
          role: "Associé – Managing Partner - Responsable du Contrôle qualité\n\nExpert-comptable et Commissaire aux comptes diplômé Régime Français\n\nExpert financier et ancien cadre supérieur de Banque",
          email: "bkante@ae2cmali.com",
          phone: "66 71 57 97 / 20 28 23 81"
        },
        {
          name: "M. Hammadoun TAMBOURA",
          role: "Associé – Managing Director\n\nExpert-comptable et Commissaire aux comptes diplômé Régime Français\n\nDirecteur du département, Expertise, ingénierie financière et Conseils",
          email: "htamboura@ae2cmali.com",
          phone: "77 24 17 17 / 20 28 23 81"
        },
        {
          name: "M. Iliassa Cissé",
          role: "Directeur Technique et des Opérations\n\nTechExpert Certifié\n\nDirecteur du département Audit, Système d'information et Organisation",
          email: "icisse@ae2cmali.com",
          phone: "20 28 23 81"
        },
        {
          name: "M. Djibril Doucoure",
          role: "Expert en Evaluation de projet\n\nDirecteur du département Etudes-Développement, Assistance Technique et Suivi-Evaluation",
          email: "ddoucoure@ae2cmali.com",
          phone: "20 28 23 81"
        }
      ]
    },
    contact: { 
      title: "Contactez-nous", 
      name: "Nom", 
      email: "Email", 
      message: "Message", 
      phone: "Téléphone :",
      send: "Envoyer" 
    },
    about: {
      title: "À propos d'AE2C",
      description: "AE2C est un cabinet d'audit, d'expertise comptable, de conseil et d'études créé en 2008. Nous sommes devenus un partenaire de confiance pour les entreprises de divers secteurs.",
      point1: "Inscrit au Tableau de l'Ordre National des Experts Comptables et Comptables Agréés du Mali (ONECCAM)",
      point2: "Plus de 15 ans d'expérience dans les services financiers",
      point3: "Présence internationale dans plusieurs pays africains"
    },
    partners: { 
      title: "Nos Références",
      subtitle: "Partenaire en développement agricole et croissance économique",
      acdiVoca: "Partenaire en développement agricole et croissance économique",
      unicef: "Partenaire pour le développement et la protection de l'enfance",
      usaid: "Agence des États-Unis pour le développement international",
      unWomen: "ONU Femmes",
      unWomenDesc: "Partenaire pour l'égalité des sexes et l'autonomisation des femmes",
      icco: "Organisation internationale de coopération pour le développement",
      helenKeller: "Partenaire en santé et nutrition",
      africanDevBank: "Banque Africaine de Développement",
      africanDevBankDesc: "Institution financière de développement panafricaine",
      bsic: "Banque Sahélo-Saharienne pour l'Investissement et le Commerce",
      bnda: "Banque Nationale de Développement Agricole"
    },
    certifications: { 
      title: "Nos Certifications",
      subtitle: "Nos accréditations",
      description: "AE2C est fier d'être reconnu par les principales organisations professionnelles du secteur."
    },
    international: { 
      title: "Présence Internationale",
      description: "Notre présence internationale nous permet d'offrir des services adaptés aux besoins locaux tout en bénéficiant d'une expertise globale.",
      countries: [
        "Mali", "Sénégal", "Côte d'Ivoire", "Burkina Faso", "Niger", "Guinée"
      ]
    },
    careers: { 
      title: "Carrières et Formation",
      subtitle: "Rejoignez notre équipe et développez vos compétences professionnelles",
      description: "Découvrez nos opportunités de carrière et notre processus de recrutement transparent",
      recruitment: "Processus de recrutement",
      recruitmentDesc: "Découvrez nos opportunités de carrière et notre processus de recrutement transparent",
      training: "Formation professionnelle",
      trainingDesc: "Programmes de formation continue pour développer vos compétences",
      support: "Accompagnement personnalisé",
      supportDesc: "Un suivi personnalisé tout au long de votre parcours",
      programs: "Nos programmes de formation",
      learnMore: "Eh ouiii!!!",
      programsList: [
        "Comptabilité avancée",
        "Gestion fiscale",
        "Audit et contrôle",
        "Management d'équipe",
        "Droit des affaires",
        "Outils numériques"
      ]
    },
    footer: {
      services: "Services",
      company: "Entreprise",
      contact: "Contact",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      description: "Expert comptable et conseil en gestion d'entreprise",
      serviceLinks: {
        accounting: "Expertise Comptable",
        audit: "Audit",
        consulting: "Conseil",
        training: "Formation"
      },
      companyLinks: {
        about: "À propos",
        careers: "Carrières",
        partners: "Partenaires",
        contact: "Contact"
      },
      location: "Bamako, Mali",
      developedBy: "Réalisé et Développé par"
    },
    map: {
      title: "Notre Localisation",
      openInMaps: "Ouvrir dans Google Maps"
    }
  }
};


 

function TouchRipple({ x, y }) {
 return (
   <motion.div
     className="absolute pointer-events-none"
     initial={{ scale: 0, opacity: 0.35 }}
     animate={{ scale: 2, opacity: 0 }}
     exit={{ opacity: 0 }}
     style={{
       left: x - 50,
       top: y - 50,
       width: 100,
       height: 100,
       borderRadius: '50%',
       background: 'radial-gradient(circle, rgba(27,153,139,0.2) 0%, rgba(60,223,255,0.1) 50%, rgba(255,255,255,0) 70%)',
     }}
   />
 )
}

function TouchEffect() {
 const [ripples, setRipples] = useState([])

 useEffect(() => {
   const handleTouch = (e) => {
     const touch = e.touches[0]
     const newRipple = {
       id: Date.now(),
       x: touch.clientX,
       y: touch.clientY,
     }
     setRipples(prev => [...prev, newRipple])
     setTimeout(() => {
       setRipples(prev => prev.filter(r => r.id !== newRipple.id))
     }, 1000)
   }

   window.addEventListener('touchstart', handleTouch)
   return () => window.removeEventListener('touchstart', handleTouch)
 }, [])

 return (
   <div className="fixed inset-0 pointer-events-none z-50">
     <AnimatePresence>
       {ripples.map(ripple => (
         <TouchRipple key={ripple.id} x={ripple.x} y={ripple.y} />
       ))}
     </AnimatePresence>
   </div>
 )
}


// Optimized loading component
// Optimized loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B998B]" />
</div>
)

function Navigation({ language, setLanguage, t, handleThemeChange, currentTheme }) {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
      const sections = ["hero", "about", "services", "expertise", "team", "partners", "certifications", "careers", "international", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  }
  return (
    <motion.header 
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${hasScrolled ? "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/logo/svg/ae2c.svg"
            alt="AE2C Logo"
            width={120}
            height={60}
            className="transition-opacity"
            style={{ filter: 'none' }}
          />
        </motion.div>

        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {["about", "services", "expertise", "team", "partners", "certifications", "careers", "international", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-gray-600 dark:text-gray-300 hover:text-[#1B998B] dark:hover:text-[#3CDFFF] transition-colors capitalize ${
                activeSection === section ? "text-[#1B998B] dark:text-[#3CDFFF]" : ""
              }`}
            >
              {t.nav[section]}
            </button>
          ))}
        </motion.div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <Globe size={20} />
          </button>
        </div>

        <button
          className="z-50 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="text-gray-900 dark:text-white" /> : <Menu className="text-gray-900 dark:text-white" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-full bg-white dark:bg-gray-900 p-5 md:hidden"
          >
            {["about", "services", "expertise", "team", "partners", "certifications", "careers", "international", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full py-2 text-left text-gray-600 dark:text-gray-300 hover:text-[#1B998B] dark:hover:text-[#3CDFFF] capitalize ${
                  activeSection === section ? "text-[#1B998B] dark:text-[#3CDFFF]" : ""
                }`}
              >
                {t.nav[section]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
  


function ServiceCard({ title, description, index, active, onClick }) {
  const baseClasses = "relative h-[300px] w-[300px] overflow-hidden cursor-pointer";
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


function ExpertiseItem({ title, icon, index }) {
 return (
   <motion.div
     className="flex items-center space-x-4"
     initial={{ opacity: 0, x: -50 }}
     whileInView={{ opacity: 1, x: 0 }}
     transition={{ delay: index * 0.1 }}
   >
     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1B998B] dark:bg-[#3CDFFF] text-2xl text-white">
       {icon}
     </div>
     <span className="text-lg font-semibold">{title}</span>
   </motion.div>
 )
}

 

// Footer Component
function Footer({ t }) {
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
              className="mb-6 dark:invert"
            />
            <p className="text-gray-400 mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.services}</h3>
            <ul className="space-y-4">
              {Object.entries(t.footer.serviceLinks).map(([key, value]) => (
                <li key={key}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
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
                  <Link href={`#${key}`} className="text-gray-400 hover:text-white transition-colors">
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
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AE2C. {t.footer.rights}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.terms}
              </Link>
              <div className="text-gray-500 text-sm flex items-center">
                <Code size={16} className="mr-1" />
                {t.footer.developedBy} <a href="mailto:teenagerdine@gmail.com" className="ml-1 hover:text-[#1B998B] transition-colors">ShamsDigital</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Scroll to Top Button Component
function ScrollToTopButton({ scrollButtonOpacity }) {
  return (
    <motion.div
      className="fixed bottom-4 right-4 w-16 h-16 bg-[#1B998B] dark:bg-[#3CDFFF] rounded-full flex items-center justify-center cursor-pointer"
      style={{ opacity: scrollButtonOpacity }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowRight className="text-white dark:text-gray-900 transform rotate-[-90deg]" />
    </motion.div>
  );
}



export default function Component() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const [language, setLanguage] = useState("fr");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const scrollButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      requestAnimationFrame(() => setShowContent(true));
    }, 2000);

    return () => clearTimeout(timer);
  }, [setTheme]);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    requestAnimationFrame(() => setIsLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mailtoLink = `mailto:cae2c@ae2cmali.com?subject=Contact de ${formData.get('name')}&body=Message de: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0A%0D%0A${formData.get('message')}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/22366715797`, '_blank');
  };

  if (!mounted) return null;

  const t = translations[language];

  return (
    <div className={`${theme} transition-colors duration-300 overflow-x-hidden`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onEnded={handleVideoEnd}
                className="w-full h-full object-contain"
              >
                <source src="/logo/logo_video.mp4" type="video/mp4" />
              </video>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <main className="min-h-screen bg-white dark:bg-gray-900">
          <Navigation 
            language={language}
            setLanguage={setLanguage}
            t={t}
            handleThemeChange={handleThemeChange}
            currentTheme={theme}
          />

          <HeroSection t={t} yOffset={yOffset} />

          <Suspense fallback={<LoadingSpinner />}>
            <TeamSection t={t} />
            <ExpertiseSection t={t} />
            <ServicesSection t={t} />
            <AboutSection t={t} />
            <PartnersSection t={t} />
            <CertificationsSection t={t} />
            <CareersSection t={t} />
            <InternationalSection t={t} />
            <MapSection t={t} />
            <ContactSection t={t} handleSubmit={handleSubmit} handleWhatsAppClick={handleWhatsAppClick} />
          </Suspense>

          <Footer t={t} />

          <ScrollToTopButton scrollButtonOpacity={scrollButtonOpacity} />
        </main>
      )}
    </div>
  );
}