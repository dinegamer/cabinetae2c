"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Menu, X, Sun, Moon, Globe, MapPin, QrCode, Brain, MessageSquare } from 'lucide-react'
import Image from "next/image"
import { useTheme } from "next-themes"
import Spline from '@splinetool/react-spline'


const translations = {
  en: {
    nav: { services: "Services", expertise: "Expertise", team: "Team", contact: "Contact", about: "About Us", clients: "Clients", certifications: "Certifications", international: "International", careers: "Careers & Training" },
    hero: { title: "OUR EXPERTISE AT YOUR SERVICE FOR SUCCESS", subtitle: "Accounting Expertise Firm" },
    services: { title: "Our Services" },
    expertise: { title: "Our Expertise" },
    team: { title: "Our Team" },
    contact: { title: "Contact Us", name: "Name", email: "Email", message: "Message", send: "Send" },
    about: {
      title: "About AE2C",
      description: "AE2C is an audit, accounting, consulting and studies firm established in 2008. We have grown to become a trusted partner for businesses across various sectors.",
      point1: "Registered with the National Order of Chartered Accountants and Certified Accountants of Mali (ONECCAM)",
      point2: "Over 15 years of experience in financial services",
      point3: "International presence across multiple African countries"
    },
    clients: { title: "Our Clients" },
    certifications: { title: "Our Certifications" },
    international: { title: "International Presence" },
    careers: { 
      title: "Careers and Training",
      subtitle: "Join our team and develop your professional skills",
      recruitment: "Recruitment Process",
      training: "Professional Training",
      support: "Personalized Support",
      programs: "Our Training Programs"
    },
    future: {
      title: "FUTURE",
      subtitle: "IMPROVEMENTS",
      description: "Upcoming updates to be implemented in storeSup"
    }
  },
  fr: {
    nav: { services: "Services", expertise: "Expertise", team: "Équipe", contact: "Contact", about: "À Propos", clients: "Clients", certifications: "Certifications", international: "International", careers: "Carrières & Formation" },
    hero: { title: "NOTRE EXPERTISE AU SERVICE DE VOTRE RÉUSSITE", subtitle: "Cabinet d'Expertise Comptable" },
    services: { title: "Nos Services" },
    expertise: { title: "Notre Expertise" },
    team: { title: "Notre Équipe" },
    contact: { title: "Contactez-nous", name: "Nom", email: "Email", message: "Message", send: "Envoyer" },
    about: {
      title: "À propos d'AE2C",
      description: "AE2C est un cabinet d'audit, d'expertise comptable, de conseil et d'études créé en 2008. Nous sommes devenus un partenaire de confiance pour les entreprises de divers secteurs.",
      point1: "Inscrit au Tableau de l'Ordre National des Experts Comptables et Comptables Agréés du Mali (ONECCAM)",
      point2: "Plus de 15 ans d'expérience dans les services financiers",
      point3: "Présence internationale dans plusieurs pays africains"
    },
    clients: { title: "Nos Clients" },
    certifications: { title: "Nos Certifications" },
    international: { title: "Présence Internationale" },
    careers: { 
      title: "Carrières et Formation",
      subtitle: "Rejoignez notre équipe et développez vos compétences professionnelles",
      recruitment: "Processus de recrutement",
      training: "Formation professionnelle",
      support: "Accompagnement personnalisé",
      programs: "Nos programmes de formation"
    },
    future: {
      title: "AMELIORATION",
      subtitle: "FUTURES",
      description: "Les mises à jour qui seront apportées ultérieurement à storeSup"
    }
  }
}

function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const prevPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const html = document.documentElement
    html.style.cursor = 'none'

    let frameId: number

    const updatePosition = (e: MouseEvent) => {
      if (!cursorRef.current) return
      
      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === "pointer")
      
      const newVelocity = {
        x: (e.clientX - prevPosition.current.x) * 0.1,
        y: (e.clientY - prevPosition.current.y) * 0.1
      }
      
      setVelocity(newVelocity)
      prevPosition.current = { x: e.clientX, y: e.clientY }
      
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    const animate = () => {
      if (cursorRef.current) {
        const deformX = velocity.x * 2
        const deformY = velocity.y * 2
        
        cursorRef.current.style.transform = `translate(${position.x - 16}px, ${position.y - 16}px) 
                                           scale(${1 + Math.abs(deformX) * 0.1}, ${1 + Math.abs(deformY) * 0.1})`
      }
      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", updatePosition)
    frameId = requestAnimationFrame(animate)

    return () => {
      html.style.cursor = 'auto'
      window.removeEventListener("mousemove", updatePosition)
      cancelAnimationFrame(frameId)
    }
  }, [position, velocity])

  return (
    <div 
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-8 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.2, 1.5, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            borderRadius: ["50%", "40%", "50%", "40%", "50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{
            filter: "blur(4px)",
            transform: `rotate(${i * 45}deg) translateX(${i * 2}px)`,
          }}
        />
      ))}
      <motion.div 
        className="h-8 w-8 rounded-full bg-white"
        animate={{
          scale: isPointer ? 1.5 : 1,
          borderRadius: isPointer ? "40%" : "50%",
        }}
        transition={{ duration: 0.3 }}
        style={{ filter: "blur(2px)" }}
      />
    </div>
  )
}

function Navigation({ language, setLanguage, t, handleThemeChange, currentTheme }) {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  // const { scrollY } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
      
      const sections = ["hero", "about", "services", "expertise", "team", "clients", "certifications", "careers", "international", "contact"]
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

  const scrollToSection = (sectionId: string) => {
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
    <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${hasScrolled ? "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80" : ""}`}>
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
            width={100}
            height={40}
            className="dark:invert"
          />
        </motion.div>

        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {["about", "services", "expertise", "team", "clients", "certifications", "careers", "international", "contact"].map((section) => (
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
            {["about", "services", "expertise", "team", "clients", "certifications", "careers", "international", "contact"].map((section) => (
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
    </header>
  )
}

// function PartnerSlider() {
//   return (
//     <div className="relative overflow-hidden py-10">
//       <motion.div
//         className="flex gap-8"
//         animate={{
//           x: [0, -1920],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         {[...Array(10)].map((_, i) => (
//           <Image
//             key={i}
//             src="/placeholder.svg"
//             alt="Logo partenaire"
//             width={120}
//             height={40}
//             className="object-contain"
//           />
//         ))}
//       </motion.div>
//     </div>
//   )
// }

const CreditCard3D = () => (
  <div className="w-full h-full relative z-10">
    <Spline
      scene="https://prod.spline.design/HLDqtijbAOIur2J6/scene.splinecode" 
    />
  </div>
)

const Wave3D = () => (
  <div className="w-full h-full relative z-0">
    <Spline
      scene="https://prod.spline.design/2ZVMFIVOT4JiqV0Z/scene.splinecode" 
    />
  </div>
)

const Sphere3D = () => (
  <div className="w-full h-full relative z-10">
    <Spline
      scene="https://prod.spline.design/m39dZ10VxmWw2zYH/scene.splinecode" 
    />
  </div>
)

const About3D = () => (
  <div className="w-full h-full relative z-10">
    <Spline
      scene="https://prod.spline.design/J1eQlyRpL7LaXzvs/scene.splinecode" 
    />
  </div>
)

function ServiceCard({ title, description, index, active, onClick }: { 
  title: string; 
  description: string; 
  index: number;
  active: boolean;
  onClick: () => void;
}) {
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

function ExpertiseItem({ title, icon, index }: { title: string; icon: string; index: number }) {
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

function TeamMember({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
    </motion.div>
  )
}

function AboutUsSection({ t }) {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-4xl font-bold text-center">{t.about.title}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">{t.about.description}</p>
            <ul className="list-disc list-inside space-y-2">
              <li>{t.about.point1}</li>
              <li>{t.about.point2}</li>
              <li>{t.about.point3}</li>
            </ul>
          </div>
          <div className="relative h-[400px]">
            <About3D />
          </div>
        </div>
      </div>
    </section>
  )
}

function ClientsSection({ t }) {
  const clients = [
    "Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6"
  ]

  return (
    <section id="clients" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-4xl font-bold text-center">{t.clients.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/placeholder.svg"
                alt={client}
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationsSection({ t }) {
  const certifications = [
    { name: "ONECCAM", description: "Ordre National des Experts Comptables et Comptables Agréés du Mali" },
    { name: "Certification 2", description: "Description de la certification 2" },
    { name: "Certification 3", description: "Description de la certification 3" },
    { name: "Certification 4", description: "Description de la certification 4" },
  ]
  

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-4xl font-bold text-center">{t.certifications.title}</h2>
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[300px]">
            {certifications.map((cert, index) => {
              const angle = (index / certifications.length) * 2 * Math.PI
              const x = Math.cos(angle) * 120
              const y = Math.sin(angle) * 120

              return (
                <motion.div
                  key={cert.name}
                  className="absolute w-24 h-24 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
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
                  <Image
                    src="/placeholder.svg"
                    alt={cert.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg font-semibold mb-2">Nos accréditations</p>
          <p className="text-gray-600 dark:text-gray-300">
            AE2C est fier d&apos;être reconnu par les principales organisations professionnelles du secteur.
          </p>
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
      description: "Découvrez nos opportunités de carrière et notre processus de recrutement transparent"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: t.careers.training,
      description: "Programmes de formation continue pour développer vos compétences"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: t.careers.support,
      description: "Un suivi personnalisé tout au long de votre parcours"
    }
  ]

  return (
    <section id="careers" className="relative overflow-hidden bg-gradient-to-br from-white to-[#E6F4F1] dark:from-gray-900 dark:to-gray-800 py-24">
      {/* Large gradient circle */}
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
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Training programs preview */}
        <motion.div 
          className="mt-24 rounded-2xl bg-white/80 dark:bg-gray-800/80 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="mb-6 text-2xl font-semibold">{t.careers.programs}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Comptabilité avancée",
              "Gestion fiscale",
              "Audit et contrôle",
              "Management d'équipe",
              "Droit des affaires",
              "Outils numériques"
            ].map((program, index) => (
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
  const countries = [
    "Mali", "Sénégal", "Côte d'Ivoire", "Burkina Faso", "Niger", "Guinée"
  ]

  return (
    <section id="international" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-4xl font-bold text-center">{t.international.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="text-[#1B998B] dark:text-[#3CDFFF]" />
              <span className="text-lg font-semibold">{country}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Notre présence internationale nous permet d&apos;offrir des services adaptés aux besoins locaux tout en bénéficiant d&apos;une expertise globale.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 300])
  const [activeServiceCard, setActiveServiceCard] = useState(0)
  const [language, setLanguage] = useState("fr")
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const scrollButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setTheme('light')
    }
  }, [mounted, setTheme])

  const handleThemeChange = () => {
    console.log('Theme')
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const services = [
    { title: "Audit & Conseil", description: "Expertise approfondie pour optimiser vos processus" },
    { title: "Comptabilité", description: "Gestion précise de vos comptes" },
    { title: "Fiscalité", description: "Optimisation de votre situation fiscale" },
    { title: "Juridique", description: "Assistance juridique pour votre entreprise" },
    { title: "Social", description: "Gestion des ressources humaines" },
    { title: "Digital", description: "Solutions numériques pour votre entreprise" }
  ]

  const teamMembers = [
    { name: "Directeur Général", role: "Gérant-Associé", image: "/membres/membre1.jpg" },
    { name: "Directeur Associé", role: "Directeur-Associé", image: "/membres/membre2.jpg" },
    { name: "Expert-Comptable", role: "Expert-Comptable", image: "/placeholder.svg" },
    { name: "Auditeur Senior", role: "Auditeur Senior", image: "/placeholder.svg" },
    { name: "Consultant Fiscal", role: "Consultant Fiscal", image: "/placeholder.svg" },
    { name: "Responsable RH", role: "Responsable RH", image: "/placeholder.svg" }
  ]

  if (!mounted) return null

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <LiquidCursor />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.h1
                className="mb-4 text-7xl font-bold text-[#1B998B]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1, 1.2, 1],
                  opacity: [0, 1, 1, 1],
                  rotateY: [0, 360, 720, 1080]
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                AE2C
              </motion.h1>
              <motion.p
                className="text-xl text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                Notre expertise au service de votre réussite
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation 
        language={language} 
        setLanguage={setLanguage} 
        t={t}
        handleThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <section id="hero" className="relative min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F1] to-white dark:from-gray-800 dark:to-gray-900" />
          <div className="relative mx-auto max-w-6xl px-6 pt-32">
            <div className="grid gap-24 lg:grid-cols-2">
              <motion.div
                className="relative"
                style={{ opacity, scale }}
              >
                <motion.h1
                  className="mb-12 text-6xl font-bold leading-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  {t.hero.title}{" "}
                  <span className="text-[#1B998B] dark:text-[#3CDFFF]">RÉUSSITE</span>
                </motion.h1>

                <motion.div 
                  className="relative h-[400px] w-full"
                  style={{ y: yOffset }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-[#1B998B]/20 dark:bg-[#3CDFFF]/20" />
                  <div className="absolute inset-0">
                    <CreditCard3D />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <h2 className="text-7xl font-bold leading-tight">
                  {t.hero.subtitle}
                </h2>

                <motion.div 
                  className="relative mt-12"
                  style={{ y: yOffset }}
                >
                  <div className="relative mx-auto max-w-md rounded-2xl bg-gray-900 p-8 text-white dark:bg-white dark:text-gray-900">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full h-32">
                      <Sphere3D />
                    </div>
                    <div className="mt-8 text-center">
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

        <AboutUsSection t={t} />

        {/* Services section */}
        <section id="services" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-4xl font-bold text-center">{t.services.title}</h2>
            <motion.div 
              className="flex flex-wrap justify-center gap-8"
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  index={index}
                  active={activeServiceCard === index}
                  onClick={() => setActiveServiceCard(index)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expertise section */}
        <section id="expertise" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-4xl font-bold text-center">{t.expertise.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                { title: "Expertise comptable", icon: "📊" },
                { title: "Audit financier", icon: "🔍" },
                { title: "Conseil fiscal", icon: "💼" },
                { title: "Gestion de patrimoine", icon: "💰" },
                { title: "Restructuration d'entreprise", icon: "🏗️" },
                { title: "Transformation digitale", icon: "💻" },
              ].map((item, index) => (
                <ExpertiseItem key={index} title={item.title} icon={item.icon} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Team section */}
        <section id="team" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-4xl font-bold text-center">{t.team.title}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        <ClientsSection t={t} />
        <CertificationsSection t={t} />
        <CareersAndTrainingSection t={t} />
        <InternationalPresenceSection t={t} />

        {/* Contact section */}
        <section id="contact" className="relative min-h-screen py-20">
          <div className="absolute inset-0">
            <Wave3D />
          </div>
          
          <div className="relative container mx-auto px-4 z-10">
            <h2 className="mb-12 text-4xl font-bold text-center text-white dark:text-gray-900">{t.contact.title}</h2>
            <div className="max-w-lg mx-auto">
              <form className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#3CDFFF] dark:focus:ring-[#3CDFFF]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#3CDFFF] dark:focus:ring-[#3CDFFF]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contact.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B998B] focus:ring-[#1B998B] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#3CDFFF] dark:focus:ring-[#3CDFFF]"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1B998B] hover:bg-[#1B998B]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B998B] dark:bg-[#3CDFFF] dark:hover:bg-[#3CDFFF]/80 dark:focus:ring-[#3CDFFF]"
                  >
                    {t.contact.send}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white dark:bg-gray-800 dark:text-gray-100 py-10">
        {/* Footer content */}
      </footer>

      <motion.div
        className="fixed bottom-4 right-4 w-16 h-16 bg-[#1B998B] dark:bg-[#3CDFFF] rounded-full flex items-center justify-center cursor-pointer"
        style={{ opacity: scrollButtonOpacity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowRight className="text-white dark:text-gray-900 transform rotate-[-90deg]" />
      </motion.div>
    </div>
  )
}