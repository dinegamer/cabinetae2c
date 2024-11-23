"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ChevronUp, Menu, X, Sun, Moon, Globe, MapPin, QrCode, Brain, MessageSquare, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Send, MessageCircle, Code } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import Spline from '@splinetool/react-spline'
import OptimizedSpline from './components/OptimizedSpline'
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
      training: "Capacity Building and Training"
    },
    team: { title: "Our Team" },
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
      training: "Renforcement de capacités et formation"
    },
    team: { title: "Notre Équipe" },
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
}

 function ExpertiseSection({ t }) {
  const [openCard, setOpenCard] = useState(null)
  const expertiseData = [
    { title: t.expertise.accounting, icon: "📊", content: t.expertise.accountingDesc },
    { title: t.expertise.audit, icon: "🔍", content: t.expertise.auditDesc },
    { title: t.expertise.studies, icon: "💼", content: t.expertise.studiesDesc },
    { title: t.expertise.information, icon: "💻", content: t.expertise.informationDesc },
    { title: t.expertise.training, icon: "🎓", content: t.expertise.trainingDesc }
  ]
  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <section id="expertise" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
    <div className="container mx-auto px-4">
      <motion.h2 
        className="mb-12 text-center text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t.expertise.title}
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expertiseData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#1B998B] to-[#3CDFFF] opacity-30 blur transition duration-1000 group-hover:opacity-100" />
            <div className="relative rounded-2xl bg-white p-0.5 shadow-xl dark:bg-gray-900">
              <div className="rounded-[14px] bg-white dark:bg-gray-900">
                <div
                  className="flex cursor-pointer items-center justify-between p-6"
                  onClick={() => toggleCard(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#1B998B] to-[#3CDFFF] text-2xl text-white">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                      {item.title}
                    </h3>
                  </div>
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    {openCard === index ? (
                      <ChevronUp className="h-5 w-5 text-[#1B998B]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#3CDFFF]" />
                    )}
                  </div>
                </div>
                {openCard === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800/50">
                      <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

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

function Navigation({ language, setLanguage, t, handleThemeChange, currentTheme }) {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)
 
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
      
      const sections = ["hero", "about", "services", "expertise", "team", "partners", "certifications", "careers", "international", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 2
 
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
 
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of fixed header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
    setIsOpen(false)
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
   )
  }
  

  const CreditCard3D = () => (
    <div className="w-full h-full relative z-10">
      <OptimizedSpline
        scene="https://prod.spline.design/HLDqtijbAOIur2J6/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
  const Scene3D = () => (
    <div className="w-[400px] h-[400px]">
      <OptimizedSpline
        scene="https://prod.spline.design/Xcmdx3H8HZub3SnB/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
  const LargeScene3D = () => (
    <div className="relative h-[600px]">
      <OptimizedSpline
        scene="https://prod.spline.design/DgY0ZSx5iybpShE2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );

  const Wave3D = () => (
    <div className="w-full h-full relative z-0">
      <OptimizedSpline
        scene="https://prod.spline.design/2ZVMFIVOT4JiqV0Z/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );

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

function TeamMember({ name, role, image, index }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4 h-32 w-32 overflow-hidden rounded-full shadow-lg">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">{role}</p>
    </motion.div>
  );
}
function AboutUsSection({ t }) {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.about.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg mb-4">{t.about.description}</p>
            <ul className="list-disc list-inside space-y-2">
              <li>{t.about.point1}</li>
              <li>{t.about.point2}</li>
              <li>{t.about.point3}</li>
            </ul>
          </motion.div>
          <motion.div 
            className="relative h-[400px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
                    <Scene3D />
                  </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
function ServicesSection({ t }) {
  const [activeServiceCard, setActiveServiceCard] = useState(0)

  const services = [
    { title: t.services.audit, description: t.services.auditDesc },
    { title: t.services.accounting, description: t.services.accountingDesc },
    { title: t.services.tax, description: t.services.taxDesc },
    { title: t.services.legal, description: t.services.legalDesc },
    { title: t.services.social, description: t.services.socialDesc },
    { title: t.services.digital, description: t.services.digitalDesc }
  ]

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
            <div className="relative h-[600px]">
            <div className="absolute inset-0">
                <LargeScene3D  />
              </div>
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
  )
}

function PartnersSection({ t }) {
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

function CertificationsSection({ t }) {
 const certifications = [
   { name: "ONECCAM", description: "Ordre National des Experts Comptables et Comptables Agréés du Mali",file: "certification2.jpg" },
   { name: "TomPro", description: "Logiciel pour la gestion de nos tomates",file: "certification1.jpg" },
   { name: "INES", description: "Certification Expert comptable de Paris",file: "certification4.png" },
   { name: "IFAC", description: "Federation internationnale de comptables",file: "certification3.jpg" },
 ]

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

function CareersAndTrainingSection({ t }) {
  const features = [
    {
      icon: <QrCode className="h-8 w-8" />,
      title: t.careers.recruitment,
      description: t.careers.recruitmentDesc
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: t.careers.training,
      description: t.careers.trainingDesc
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: t.careers.support,
      description: t.careers.supportDesc
    }
  ]
 
  return (
    <section id="careers" className="relative overflow-hidden bg-gradient-to-br from-white to-[#E6F4F1] dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#1B998B] to-[#3CDFFF] opacity-20 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            className="mb-4 text-5xl font-bold tracking-tight text-[#1B998B] dark:text-[#3CDFFF]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.careers.title}
          </motion.h2>
          <motion.p 
            className="mb-16 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.careers.subtitle}
          </motion.p>
        </div>
 
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-lg rounded-lg">
                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B998B]/10 dark:bg-[#3CDFFF]/10 text-[#1B998B] dark:text-[#3CDFFF]">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  <button className="mt-4 flex items-center text-[#1B998B] dark:text-[#3CDFFF] transition-all group-hover:translate-x-1">
                    {t.careers.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
 
        <motion.div 
          className="mt-24 rounded-2xl bg-white/80 dark:bg-gray-800/80 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="mb-6 text-2xl font-semibold">{t.careers.programs}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.careers.programsList.map((program, index) => (
              <div 
                key={index}
                className="flex items-center rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1B998B]/10 dark:bg-[#3CDFFF]/10 text-[#1B998B] dark:text-[#3CDFFF]">
                  {index + 1}
                </div>
                <span className="font-medium">{program}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
 )
}

function InternationalPresenceSection({ t }) {
  return (
    <section id="international" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.international.title}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {t.international.countries.map((country, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MapPin className="text-[#1B998B] dark:text-[#3CDFFF]" />
              <span className="text-lg font-semibold">{country}</span>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.international.description}
          </p>
        </motion.div>
      </div>
    </section>
    )
  }
  

function MapSection({ t }) {
  const handleOpenMaps = () => {
    const searchQuery = encodeURIComponent("AE2C Cabinet Hamdallaye ACI 2000 Bamako Mali");
    window.open(`https://www.google.com/maps/search/?api=1&query=${searchQuery}`, '_blank');
  };

  return (
    <section id="map" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-4xl font-bold text-center dark:text-white">{t.map.title}</h2>
        <div className="rounded-xl overflow-hidden shadow-xl">
          <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 bg-[#1B998B]/20 dark:bg-[#3CDFFF]/20 rounded-full animate-pulse" />
                    <MapPin size={48} className="text-[#1B998B] dark:text-[#3CDFFF] relative z-10" />
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-bold text-lg mb-2">AE2C Cabinet</h3>
                    <p className="text-gray-600 dark:text-gray-400">Bamako, Mali</p>
                    <button 
                      onClick={handleOpenMaps}
                      className="mt-4 w-full px-4 py-2 bg-[#1B998B] dark:bg-[#3CDFFF] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <MapPin size={20} />
                      {t.map.openInMaps}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#1B998B] dark:bg-[#3CDFFF] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#1B998B] dark:bg-[#3CDFFF] rounded-full opacity-50"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#1B998B] dark:bg-[#3CDFFF] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


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
              <Link href="#" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#1B998B] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#1B998B] transition-colors">
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



export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 300])
  const [language, setLanguage] = useState("fr")
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const scrollButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const videoRef = useRef(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)
 


  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 500)
    }, 4500)
  
    return () => clearTimeout(timer)
  }, [setTheme])

  

  
   const handleVideoEnd = () => {
    setVideoEnded(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
   }
  
   const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  
   const handleSubmit = (e) => {
     e.preventDefault();
     const formData = new FormData(e.target);
     const name = formData.get('name');
     const email = formData.get('email');
     const message = formData.get('message');
  
     const mailtoLink = `mailto:cae2c@ae2cmali.com?subject=Contact de ${name}&body=Message de: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
     window.location.href = mailtoLink;
   }
  
   const handleWhatsAppClick = () => {
     const whatsappNumber = "22366715797";
     const whatsappLink = `https://wa.me/${whatsappNumber}`;
     window.open(whatsappLink, '_blank');
   };
  


const teamMembers = [
  { 
    name: "M. Boubacar KANTE",
    role: "Gérant-Associé AE2C SARL", 
    image: "/membres/membre1.jpg" 
  },
  { 
    name: "M. Hammadoun TAMBOURA",
    role: "Directeur-Associé AE2C SARL", 
    image: "/membres/membre2.jpg" 
  },
  { 
    name: "M. Iliassa Cissé",
    role: "Directeur du Département Audit-Organisations et Système d’Information", 
    image: "/membres/membre3.jpg" 
  },
  { 
    name: "M. Djibril Doucoure",
    role: "Directeur du Département Étude-Développement et Suivi Évaluation", 
    image: "/membres/membre4.jpg" 
  },
  
];

 if (!mounted) return null
 

 return (
  <div className={`${theme} transition-colors duration-300`}>
     <TouchEffect />

     <AnimatePresence>
       {isLoading && (
         <motion.div
           className="fixed inset-0 z-50 flex items-center justify-center bg-black"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1, ease: "easeInOut" }}
         >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-0 pb-[56.25%] md:pb-[42.86%] lg:pb-[36%]">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  onEnded={handleVideoEnd}
                >
                  <source src="/logo/logo_video.mp4" type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
              </div>
              {videoEnded && (
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <Navigation 
              language={language} 
              setLanguage={setLanguage} 
              t={t}
              handleThemeChange={handleThemeChange}
              currentTheme={theme}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <section id="hero" className="relative min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F1] to-white dark:from-gray-800 dark:to-gray-900" />
          <div className="relative mx-auto max-w-6xl px-6 pt-32">
            <div className="grid gap-24 lg:grid-cols-2">
              <motion.div
                className="relative"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
              >
                <motion.h1
                  className="mb-12 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                >
                  {t.hero.title.split(' ').map((word, index) => (
                    <span key={index} className="inline-block mr-2">
                      {word}
                    </span>
                  ))}
                  <span className="text-[#1B998B] dark:text-[#3CDFFF]">SUCCES</span>
                </motion.h1>

                <motion.div 
                  className="relative h-[400px] w-full"
                  style={{ y: yOffset }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 2.1, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-[#1B998B]/20 dark:bg-[#3CDFFF]/20" />
                  <div className="absolute inset-0">
                    <CreditCard3D />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
              >
                <motion.h2 
                  className="mb-12 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                >
                  {t.hero.subtitle}
                </motion.h2>

                <motion.div 
                  className="relative mt-12"
                  style={{ y: yOffset }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 2.1, ease: "easeOut" }}
                >
                  <div className="relative mx-auto max-w-md rounded-2xl bg-gray-900 p-8 text-white dark:bg-white dark:text-gray-900">
                    <div className="mt-16 text-center">
                      <div className="text-3xl font-bold">1000+</div>
                      <div className="mt-2 text-gray-400 dark:text-gray-600">entreprises nous font confiance !</div>
                      <button className="mt-6 flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-gray-300 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200">
                        <span>En savoir plus</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>


         <section id="team" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.team.title}
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
         <ServicesSection t={t} />
         <AboutUsSection t={t} />
         <PartnersSection t={t} />
         <CertificationsSection t={t} />
         <CareersAndTrainingSection t={t} />
         <InternationalPresenceSection t={t} />
         <MapSection  t={t}/>
         <ExpertiseSection t={t} />
         

      <section id="contact" className="relative min-h-screen py-20">
      <div className="absolute inset-0">
        <Wave3D />
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <h2 className="mb-12 text-4xl font-bold text-center text-white dark:text-gray-900">{t.contact.title}</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#3CDFFF] dark:focus:ring-[#3CDFFF]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#3CDFFF] dark:focus:ring-[#3CDFFF]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.message}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#3CDFFF] dark:focus:ring-[#3CDFFF]"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1B998B] hover:bg-[#1B998B]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B998B] dark:bg-[#3CDFFF] dark:hover:bg-[#3CDFFF]/80 dark:focus:ring-[#3CDFFF]"
              >
                <Send className="w-4 h-4" />
                {t.contact.send}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </form>

          {/* Informations de contact */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-xl space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.contact.title}</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-[#1B998B] dark:text-[#3CDFFF]" />
          <div>
            <p className="text-gray-700 dark:text-gray-300">{t.contact.phone}</p>
            <p className="text-gray-900 dark:text-white">(+223) 20 28 23 81</p>
            <p className="text-gray-900 dark:text-white">(+223) 66 71 57 97</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="w-5 h-5 text-[#1B998B] dark:text-[#3CDFFF]" />
          <div>
            <p className="text-gray-700 dark:text-gray-300">{t.contact.email}</p>
            <a href="mailto:cae2c@ae2cmali.com" className="text-[#1B998B] dark:text-[#3CDFFF] hover:underline">
              cae2c@ae2cmali.com
            </a>
          </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
       </main>


       <Footer t={t} />

<motion.div
  className="fixed bottom-4 right-4 w-16 h-16 bg-[#1B998B] dark:bg-[#3CDFFF] rounded-full flex items-center justify-center cursor-pointer"
  style={{ opacity: scrollButtonOpacity }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  <ArrowRight className="text-white dark:text-gray-900 transform rotate-[-90deg]" />
</motion.div>
</motion.div>
</>
)}
</div>

 )
}