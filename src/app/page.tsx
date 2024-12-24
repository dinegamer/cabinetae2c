"use client"

import { useEffect, useRef, useState, Suspense  } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ChevronUp, Menu, X, Sun, Moon, Globe, MapPin, QrCode, Brain, MessageSquare, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Send, MessageCircle, Code } from 'lucide-react'

import { useTheme } from "next-themes"
import dynamic from 'next/dynamic'

const HeroSection = dynamic(() => import('./components/HeroSection'))
const NavigationSection = dynamic(() => import('./components/NavigationSection'))

const Footer = dynamic(() => import('./components/Footer'))


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
      // international: "International", 
      careers: "Careers & Training", 
      "who-we-are": "Who We Are",
      "banking-references": "Banking References" 
    },
    
    hero: {
      title: "OUR EXPERTISE AT YOUR SERVICE",
      subtitle: "Accounting Firm",
      trustText: "100 companies trust us!",
      learnMore: "Learn more"
    },
    discover: {
      firm: {
        title: "Discover our firm",
        description: "Recognized accounting expertise since 2009"
      },
      services: {
        title: "Discover our services",
        description: "Concrete solutions and recognized expertise"
      },
      teams: {
        title: "Discover our teams",
        description: "Experienced professionals at your service"
      },
      learnMore: "Learn more"
    },
    services: {
      title: "Our Services",
      sections: {
        expertiseComptable: {
          title: "ACCOUNTING AND FINANCIAL EXPERTISE",
          description: "AE2C MALI is here to manage your accounting, handle tax and social declarations, and provide operational financial management advice",
          subsections: {
            externalisation: {
              title: "If you wish to outsource your accounting, AE2C MALI offers",
              services: [
                "Maintain your accounting with simple digital tools",
                "Control and supervise your accounting",
                "Deliver your balance sheet, income statement and summary documents",
                "Present your accounts with advice"
              ]
            },
            accompagnement: {
              title: "If you need support for your internal accounting teams, AE2C MALI offers a review mission",
              services: [
                "Control and supervision of your accounting",
                "Delivery of your balance sheet, income statement and summary documents",
                "Account presentation and advisory meetings"
              ]
            },
            gestionSociale: {
              title: "AE2C MALI assists you in social management",
              services: [
                "Recruitment assistance",
                "Compliance assistance",
                "Preparation of payslips and related social declarations",
                "Employee departure management",
                "Assistance with INPS / AMO and ITS social declarations"
              ]
            }
          }
        },
        audit: {
          title: "AUDITS & STATUTORY AUDITING",
          description: "At the request of its clients, AE2C MALI carries out audit missions to provide enhanced comfort and confidence to partners. These audits will help detect the strengths and weaknesses of your company to turn them into key success factors.",
          subsections: {
            legal: {
              title: "LEGAL AUDIT / STATUTORY AUDITING",
              services: [
                "Statutory auditing",
                "Contribution auditing",
                "Transformation auditing",
                "Merger auditing",
                "Special benefits auditing",
                "Alert procedure",
                "Prevention of criminal acts",
                "Independent expert"
              ]
            },
            projets: {
              title: "PROJECT AND DEVELOPMENT PROGRAM AUDITS",
              services: [
                "Audit of NGO development projects, Associations, public sector",
                "Audit of development programs (World Bank financing, UN agency, US AID, international NGOs, AfDB, Governments...)",
                "Organizational, process and internal control audit"
              ]
            },
            contractuels: {
              title: "CONTRACTUAL AUDITS",
              services: [
                "Tax audit, Social audit",
                "Acquisition or disposal audit",
                "Other contractual audit missions (interim account audits, royalty audits, Risk and internal control review, Forecast data review, Attestations on accounting and financial data...)"
              ]
            },
            procedures: {
              title: "AGREED-UPON PROCEDURES MISSIONS",
              services: [
                "Assistance with physical inventories",
                "Contractual audit missions according to agreed procedures at companies, associations, public organizations"
              ]
            }
          }
        },
        organisation: {
          title: "ORGANIZATION, ACCOUNTING INFORMATION SYSTEM AND TRAINING",
          description: "AE2C MALI has strong technical expertise in computer management systems such as accounting software, organizational diagnostics, procedure manual development and training.",
          subsections: {
            logiciel: {
              title: "IMPLEMENTATION OF ACCOUNTING MANAGEMENT SOFTWARE (TomPro)",
              services: [
                "Accounting information system diagnosis",
                "TomPro solution proposal",
                "TomPro module configuration",
                "Implementation of information systems and computer systems",
                "Software handling training",
                "Technical assistance"
              ]
            },
            procedures: {
              title: "DEVELOPMENT OF PROCEDURE MANUALS AND ORGANIZATIONAL DIAGNOSIS",
              services: [
                "Adaptation of processes and systems to new regulatory constraints",
                "Analysis of organization and processes",
                "Development or revision of procedure manuals",
                "Organizational diagnosis and adapted organization proposal"
              ]
            }
          }
        },
        conseil: {
          title: "BUSINESS CONSULTING AND MANAGEMENT",
          description: "AE2C MALI is your trusted partner to advise you in the different stages of company life: activity management, financial advice, company valuation as well as social and tax consulting missions.",
          subsections: {
            creation: {
              title: "BUSINESS CREATION SUPPORT",
              services: [
                "Project understanding",
                "Analysis of the future entrepreneur's personal situation",
                "Business plan establishment and feasibility analysis",
                "Choice of legal status",
                "Choice of tax regime",
                "Administrative creation formalities"
              ]
            },
            gestion: {
              title: "BUSINESS MANAGEMENT CONSULTING & JUDICIAL EXPERTISE",
              services: [
                "Management consulting (Daily business management support)",
                "In-depth financial diagnosis and management optimization",
                "Assistance in developing strategic orientations",
                "Assistance in social policy analysis",
                "Financing search advice",
                "Asset or company valuation mission"
              ]
            }
          }
        },
        etudes: {
          title: "STUDIES, PROJECT MANAGEMENT AND INSTITUTIONAL SUPPORT",
          description: "With its expertise on several projects, AE2C Mali has developed a Studies, Evaluation and Technical Assistance department that supports important projects in Mali and the sub-region.",
          subsections: {
            assistance: {
              title: "STUDIES & TECHNICAL ASSISTANCE",
              services: [
                "Sectoral and thematic studies",
                "Assistance and support to organizations in design, implementation and deployment support",
                "Support to microfinance institutions",
                "Technical assistance to Associations and NGOs",
                "Training in project management"
              ]
            },
            evaluation: {
              title: "PROJECT EVALUATION AND TECHNICAL AUDIT",
              services: [
                "Ex-ante and ex-post evaluation of projects, development programs and public policies (NGOs, Public agencies...)",
                "Technical audit of projects, programs and public policies",
                "Performance audit"
              ]
            }
          }
        },
        formation: {
          title: "TRAINING AND CAPACITY BUILDING",
          description: "The firm's experts share their expertise and experiences to strengthen the capacity of client associations, NGOs, companies and public organizations.",
          services: [
            "Training on SYSCOHADA revised accounting standards and techniques, SYSCEBNL, IFRS...",
            "Training in banks, microfinance, associations and NGOs"
          ]
        }
      }
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
      title: "AE2C MALI MANAGEMENT TEAM",
      description: "The management team is composed of highly skilled professionals with many years of experience in the firm's areas of intervention.",
      teamSize: "The firm consists of about twenty employees coordinated by 2 Chartered Accountants qualified under the French DEC regime.",
      role: "Roles",
      email: "Email",
      phone: "Phone",
      teamMembers: [
        {
          name: "Mr. Boubacar KANTE",
          role: "Partner - Managing Partner & Head of Quality Control\n\nChartered Accountant and Statutory Auditor qualified under French regime\n\nFinancial Expert and former Bank Executive",
          email: "bkante@ae2cmali.com",
          phone: "66 71 57 97 / 20 28 23 81"
        },
        {
          name: "Mr. Hammadoun TAMBOURA",
          role: "Partner - Managing Director\n\nChartered Accountant and Statutory Auditor qualified under French regime\n\nDirector of Expertise, Financial Engineering and Consulting Department",
          email: "htamboura@ae2cmali.com",
          phone: "77 24 17 17 / 20 28 23 81"
        },
        {
          name: "Mr. Iliassa CISSE",
          role: "Technical and Operations Director\n\nCertified TechExpert\n\nDirector of Audit, Statutory Auditing, Information Systems and Organization Department",
          email: "icisse@ae2cmali.com",
          phone: "20 28 23 81"
        },
        {
          name: "Mr. Djibril DOUCOURE",
          role: "Project Evaluation and Technical Assistance Expert\n\nDirector of Studies-Development, Technical Assistance and Monitoring-Evaluation Department",
          email: "ddoucoure@ae2cmali.com",
          phone: "20 28 23 81"
        }
      ]
    },
    
    contact: {
      title: "Contact Us",
      description: "For information about our services, you can contact us at any time during our opening hours, one of our agents will assist you.",
      name: "Last Name",
      firstName: "First Name",
      email: "Email",
      phone: "Phone",
      postalCode: "Postal Code",
      company: "Company",
      needs: "Your Needs",
      message: "Message",
      send: "Send",
      address: "Address",
      addressValue: "Torokorobougou next to the Police Station",
      hours: "Hours",
      hoursValue: "8:30 AM to 5:00 PM",
      emailValue: "cae2c@ae2cmali.com",
      phoneValue: "(+223) 20 28 23 81 / (+223) 77 24 17 17"
    },
    about: {
      title: "About AE2C",
      description: "AE2C is an audit, accounting, consulting and studies firm established in 2008. We have grown to become a trusted partner for businesses across various sectors.",
      point1: "Registered with the National Order of Chartered Accountants and Certified Accountants of Mali (ONECCAM)",
      point2: "Over 15 years of experience in financial services",
      point3: "International presence across multiple African countries",
      commitments: "Our Commitments",
      trustedActor: "TRUSTED ACTOR",
      trustedActorDesc: "Respect for professional and ethical standards",
      availability: "AVAILABILITY AND REGULAR EXCHANGES",
      availabilityDesc: "Constant support and technical expertise",
      skillsDevelopment: "SKILLS DEVELOPMENT",
      skillsDevelopmentDesc: "Professional development and quality of work life",
      environmentalActor: "ENVIRONMENTAL ACTOR",
      environmentalActorDesc: "Digital solutions and clean energy (solar panels)",
    },
    partners: {
      title: "Our References",
      subtitle: "AE2C Mali has developed leading partnerships enabling intervention in various fields and best serving the clients who trust us",
      bankingPartnersTitle: "Our Banking References",
      otherPartnersTitle: "Other References",
      partners: [
        {
          name: "USAID",
          category: "Strategic Partner",
          description: "United States Agency for International Development"
        },
        {
          name: "TOMATE",
          category: "Software Solution",
          description: "TomPro integrated management solution"
        },
        {
          name: "Morana",
          category: "Partner Firm",
          description: "Accounting and auditing firm"
        },
        {
          name: "Morana Audit",
          category: "Partner Firm",
          description: "Specialized audit firm"
        },
        {
          name: "Enplus",
          category: "Technical Partner",
          description: "Engineering and consulting solutions"
        },
        {
          name: "Intecsup",
          category: "Training",
          description: "Higher education institute"
        }
      ]
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
      about: "Qui sommes-nous", 
      partners: "Partenaires", 
      certifications: "Certifications", 
      // international: "International", 
      careers: "Carrières & Formation", 
      "who-we-are": "Qui Sommes-Nous",
      "banking-references": "Références Bancaires"
    },
    hero: {
      title: "NOTRE EXPERTISE AU SERVICE DE VOTRE",
      subtitle: "Cabinet d'Expertise Comptable",
      trustText: "100 entreprises nous font confiance !",
      learnMore: "En savoir plus"
    },
    discover: {
      firm: {
        title: "Découvrez notre cabinet",
        description: "Expertise comptable reconnue depuis 2009"
      },
      services: {
        title: "Découvrez nos services",
        description: "Solutions concrètes et expertise reconnue"
      },
      teams: {
        title: "Découvrez nos équipes",
        description: "Professionnels expérimentés à votre service"
      },
      learnMore: "En savoir plus"
    },
    services: {
      title: "Nos Services",
      sections: {
        expertiseComptable: {
          title: "EXPERTISE COMPTABLE ET FINANCIÈRE",
          description: "Le cabinet AE2C MALI est là pour tenir votre comptabilité, effectuer les déclarations fiscales et sociales ainsi apporter du conseils opérationnels de direction financière",
          subsections: {
            externalisation: {
              title: "Vous souhaitez externaliser votre comptabilité, AE2C MALI vous propose de",
              services: [
                "Tenir votre comtabilité avec des outils digitaux simples",
                "Contrôler et superviser de votre comptabilité",
                "Remettre de votre bilan, votre compte de résultat et vos documents de synthèse",
                "Présenter vos comptes avec quelques conseils"
              ]
            },
            accompagnement: {
              title: "Vous souhaitez un accompagnement pour vos équipes qui tiennent votre comptabilité en interne, AE2C MALI vous propose une mission de révision",
              services: [
                "Contrôle et supervision de votre comptabilité",
                "Remise de votre bilan, votre compte de résultat et vos documents de synthèse",
                "Rendez-vous de présentation de vos comptes et de conseil"
              ]
            },
            gestionSociale: {
              title: "AE2C MALI vous accompagne dans la gestion sociale",
              services: [
                "Aide au recrutement",
                "Assistance au respect de la législation",
                "Établissement des bulletins de paie et des déclarations sociales y afférentes",
                "Gestion du départ d'un salarié",
                "Assistance aux déclarations sociales INPS / AMO et ITS"
              ]
            }
          }
        },
        audit: {
          title: "AUDITS & COMMISSARIAT AUX COMPTES",
          description: "À la demande de ses clients, AE2C MALI réalise des missions d'audits dans le but d'apporter un confort élargi et de la confiance aux partenaires. Ces audits aideront à détecter les forces et faiblesses de votre entreprise pour en faire des facteurs clés de succès.",
          subsections: {
            legal: {
              title: "AUDIT LÉGAL / COMMISSARIAT AUX COMPTES",
              services: [
                "Commissariat aux comptes",
                "Commissariat aux apports",
                "Commissarait à la transformation",
                "Commissariat à la fusion",
                "Commissariat aux avantages particuliers",
                "Procédure d'Alerte",
                "Prévention de faits délictueux",
                "Expert indépendant"
              ]
            },
            projets: {
              title: "AUDITS DE PROJETS ET PROGRAMMES DE DÉVELOPPEMENT",
              services: [
                "Audit des projets de développement ONG, Associations, secteur public",
                "Audit des programmes de développement (Financement Banque mondiale, agence de l'ONU, US AID, ONG internationales, BAD, Gouvernements...)",
                "Audit organisationel, des processus et du contrôle interne"
              ]
            },
            contractuels: {
              title: "AUDITS CONTRACTUELS",
              services: [
                "Audit fiscal, Audit social",
                "Audit d'acquisition ou de cession",
                "Autres missions d'audit contractuel (audits de comptes intermédiaires, audits de redevances, Revue des risques et du contrôle interne, Revue de données prévisionnelles, Attestations sur des données comptables et financières...)"
              ]
            },
            procedures: {
              title: "MISSIONS SELON LES PROCÉDURES CONVENUES",
              services: [
                "Assistance aux inventaires physiques",
                "Missions d'audit contractuel selon les procédures convenues au niveau des entreprises, associations, organismes publics"
              ]
            }
          }
        },
        organisation: {
          title: "ORGANISATION, SYSTÈME D'INFORMATION COMPTABLE ET FORMATION",
          description: "AE2C MALI dispose d'une forte expértise Technique d'assistance dans les systèmes de gestion informatiques comme les logiciels de comptabilité, le diagnostic organisationnel, l'élaboration de manuel de procédures et de la Formation.",
          subsections: {
            logiciel: {
              title: "MISE EN PLACE DE LOGICIEL DE GESTION COMPTABLE (TomPro)",
              services: [
                "Diagnostic du système d'information comptable",
                "Proposition de solution TomPro",
                "Paramétrage de module TomPro",
                "Mise en place de systèmes d'information et systèmes informatiques",
                "Formation sur la prise en charge du logiciel",
                "Assistance technique"
              ]
            },
            procedures: {
              title: "ÉLABORATION DE MANUELS DE PROCÉDURES ET DIAGNOSTIC ORGANISATIONNEL",
              services: [
                "Adaptation des processus et des systèmes aux nouvelles contraintes réglementaires",
                "Analyse de l'organisation et des processus",
                "Elaboration ou révision de manuels de procédures",
                "Diagnostic organisationnel et proposition d'organisation adapatée"
              ]
            }
          }
        },
        conseil: {
          title: "CONSEILS ET MANAGEMENT D'ENTREPRISE",
          description: "AE2C MALI est votre partenaire de confiance pour vous conseiller dans les différentes étapes de la vie de la société : pilotage de l'activité, conseils financiers, évaluation de société ainsi des missions de conseils dans le social et la fiscalité.",
          subsections: {
            creation: {
              title: "ACCOMPAGNEMENT À LA CRÉATION D'ENTREPRISE",
              services: [
                "Prise de connaissance du projet",
                "Analyse de la situation personnelle du futur entrepreneur",
                "Etablissement du business plan et analyse de faisabilité",
                "Choix du statut juridique",
                "Choix du régime fiscal",
                "Formalités administratives de création"
              ]
            },
            gestion: {
              title: "CONSEIL EN GESTION D'ENTREPRISE & EXPERTISE JUDICIAIRE",
              services: [
                "Conseils en gestion (Accompagnement au pilotage au quotidien de votre entreprise)",
                "Diagnostic financier approfondi et optimisation de la gestion",
                "Assistance à l'élaboration des orientations stratégiques",
                "Assistance à l'analyse de la politique sociale",
                "Conseils en recherche de financement",
                "Mission d'évaluation d'actifs ou d'entreprises"
              ]
            }
          }
        },
        etudes: {
          title: "ETUDES, GESTION DE PROJETS ET APPUI INSTITUTIONNEL",
          description: "Fort de son expertise sur plusieurs projets, AE2C Mali a developpé un département Etudes, Evaluation et Assistance technique qui accompagne des projets importants au Mali et dans la sous-région.",
          subsections: {
            assistance: {
              title: "ETUDES & ASSISTANCE TECHNIQUE",
              services: [
                "Etudes sectorielles et thematiques",
                "Assistance et appui aux organisations dans la conception, la mise en oeuvre et l'accompagnement dans le deploiement",
                "Appui aux institutions de micro-finance",
                "Assistance techniques aux Associations et ONG",
                "Formation dans la gestion de projets"
              ]
            },
            evaluation: {
              title: "EVALUATION DE PROJETS ET AUDIT TECHNIQUE",
              services: [
                "Evaluation ex-ante et ex-post de projets, programmes de développement et politiques publiques (ONG, Agences publiques...)",
                "Audit techniques de projets, programmes et politiques publiques",
                "Audit de performances"
              ]
            }
          }
        },
        formation: {
          title: "FORMATION ET RENFORCEMENT DE CAPACITÉS",
          description: "Les experts du cabinet partage leur expertise et expériences pour renforcer la capacité des clients associations, ONG, entreprises et organisismes publics.",
          services: [
            "Formation sur les normes et techniques comptables SYSCOHADA révisé, SYSCEBNL, IFRS...",
            "Formation dans les banques, micro-finances, associations et ONG"
          ]
        }
      }
    
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
      title: "EQUIPE D'ENCADREMENT DU CABINET AE2C MALI",
      description: "L'équipe d'encadrement est composée de profils très compétents ayant plusieurs années d'expériences dans les domaines d'intervention du cabinet.",
      teamSize: "Le cabinet est composé d'une vingtaine de collaborateurs coordonnés par 2 associés Expert-comptable diplômés du régime français DEC.",
      role: "Rôles",
      email: "Email",
      phone: "Téléphone",
      teamMembers: [
        {
          name: "M. Boubacar KANTE",
          role: "Associé - Managing Partner & Responsable du Contrôle qualité\n\nExpert-comptable et Commissaire aux comptes diplômé régime français\n\nExpert financier et ancien cadre de Banque",
          email: "bkante@ae2cmali.com",
          phone: "66 71 57 97 / 20 28 23 81"
        },
        {
          name: "M. Hammadoun TAMBOURA",
          role: "Associé - Managing Director\n\nExpert-comptable et Commissaire aux comptes diplômé régime français\n\nDirecteur du département Expertise, ingénierie financière et Conseils",
          email: "htamboura@ae2cmali.com",
          phone: "77 24 17 17 / 20 28 23 81"
        },
        {
          name: "M. Iliassa CISSE",
          role: "Directeur Technique et des Opérations\n\nTechExpert Certifié\n\nDirecteur du département Audit, Commissariat aux comptes, système d'information et Organisation",
          email: "icisse@ae2cmali.com",
          phone: "20 28 23 81"
        },
        {
          name: "M. Djibril DOUCOURE",
          role: "Expert en Evaluation de projet et Assistance Technique\n\nDirecteur du département Etudes-Développement, Assistance Technique et Suivi-Evaluation",
          email: "ddoucoure@ae2cmali.com",
          phone: "20 28 23 81"
        }
      ]
    },
    contact: {
      title: "Contactez-nous",
      description: "Pour demande d'infos concernant nos services, vous pouvez nous contactez à tout moment pendant nos heures d'ouverture, un de nos agents s'occupera de vous.",
      name: "Nom",
      firstName: "Prénom",
      email: "Email",
      phone: "Téléphone",
      postalCode: "Code Postal",
      company: "Société",
      needs: "Vos besoins",
      message: "Message",
      send: "Envoyer",
      address: "Adresse",
      addressValue: "Torokorobougou à coté du Commissariat de Police",
      hours: "Horaire",
      hoursValue: "08h30 à 17h",
      emailValue: "cae2c@ae2cmali.com",
      phoneValue: "(+223) 20 28 23 81 / (+223) 77 24 17 17"
    },
    about: {
      title: "Qui sommes-nous ?",
      description: "AE2C est un cabinet d'audit, d'expertise comptable, de conseil et d'études créé en 2008. Nous sommes devenus un partenaire de confiance pour les entreprises de divers secteurs.",
      point1: "Inscrit au Tableau de l'Ordre National des Experts Comptables et Comptables Agréés du Mali (ONECCAM)",
      point2: "Plus de 15 ans d'expérience dans les services financiers",
      point3: "Présence internationale dans plusieurs pays africains",
      commitments: "Nos Engagements",
      trustedActor: "ACTEUR DE CONFIANCE",
      trustedActorDesc: "Respect des normes professionnelles et déontologiques",
      availability: "DISPONIBILITE ET ECHANGES REGULIERS",
      availabilityDesc: "Accompagnement constant et expertise technique",
      skillsDevelopment: "MONTEE EN COMPETENCES",
      skillsDevelopmentDesc: "Développement professionnel et qualité de vie au travail",
      environmentalActor: "ACTEUR ENVIRONNEMENTAL",
      environmentalActorDesc: "Solutions digitales et énergie propre (panneaux solaires)",
    },
    partners: {
      title: "Nos Références",
      subtitle: "AE2C Mali a développé des partenariats de premier plan permettant d'intervenir dans divers domaines et de servir au mieux les clients qui nous font confiance",
      bankingPartnersTitle: "Nos Références Bancaires",
      otherPartnersTitle: "Autres Références",
      partners: [
        {
          name: "USAID",
          category: "Partenaire Stratégique",
          description: "Agence des États-Unis pour le développement international"
        },
        {
          name: "TOMATE",
          category: "Solution Logicielle",
          description: "Solution de gestion intégrée TomPro"
        },
        {
          name: "Morana",
          category: "Cabinet Partenaire",
          description: "Cabinet d'expertise comptable et d'audit"
        },
        {
          name: "Morana Audit",
          category: "Cabinet Partenaire",
          description: "Cabinet d'audit spécialisé"
        },
        {
          name: "Enplus",
          category: "Partenaire Technique",
          description: "Solutions d'ingénierie et de conseil"
        },
        {
          name: "Intecsup",
          category: "Formation",
          description: "Institut d'enseignement supérieur"
        }
      ]
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


 





// Optimized loading component
// Optimized loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B998B]" />
</div>
)






// Footer Component
// function Footer({ t }) {
//   return (
//     <footer className="bg-gray-900 text-white pt-20 pb-10">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//           <div>
//             <Image
//               src="/logo/svg/ae2c.svg"
//               alt="AE2C Logo"
//               width={120}
//               height={48}
//               className="mb-6"
//             />
//             <p className="text-gray-400 mb-6">
//               {t.footer.description}
//             </p>
//             <div className="flex space-x-4">
//               <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
//                 <Facebook size={20} />
//               </Link>
//               <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
//                 <Twitter size={20} />
//               </Link>
//               <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
//                 <Instagram size={20} />
//               </Link>
//               <Link href="https://www.linkedin.com/company/cabinetae2c-mali/?viewAsMember=true" className="text-gray-400 hover:text-[#1B998B] transition-colors">
//                 <Linkedin size={20} />
//               </Link>
//             </div>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-bold mb-6">{t.footer.services}</h3>
//             <ul className="space-y-4">
//               {Object.entries(t.footer.serviceLinks).map(([key, value]) => (
//                 <li key={key}>
//                   <Link href="#" className="text-gray-400 hover:text-white transition-colors">
//                     {value}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-bold mb-6">{t.footer.company}</h3>
//             <ul className="space-y-4">
//               {Object.entries(t.footer.companyLinks).map(([key, value]) => (
//                 <li key={key}>
//                   <Link href={`#${key}`} className="text-gray-400 hover:text-white transition-colors">
//                     {value}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-bold mb-6">{t.footer.contact}</h3>
//             <ul className="space-y-4">
//               <li className="flex items-center space-x-3 text-gray-400">
//                 <MapPin size={20} />
//                 <span>{t.footer.location}</span>
//               </li>
//               <li className="flex items-center space-x-3 text-gray-400">
//                 <Phone size={20} />
//                 <span>(+223) 20 28 23 81 / 66 71 57 97</span>
//               </li>
//               <li className="flex items-center space-x-3 text-gray-400">
//                 <Mail size={20} />
//                 <span>cae2c@ae2cmali.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-gray-400 text-sm">
//               © {new Date().getFullYear()} AE2C. {t.footer.rights}
//             </p>
//             <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
//               <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
//                 {t.footer.privacy}
//               </Link>
//               <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
//                 {t.footer.terms}
//               </Link>
//               <div className="text-gray-500 text-sm flex items-center">
//                 <Code size={16} className="mr-1" />
//                 {t.footer.developedBy} <a href="mailto:teenagerdine@gmail.com" className="ml-1 hover:text-[#1B998B] transition-colors">ShamsDigital</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
          <NavigationSection 
            language={language}
            setLanguage={setLanguage}
            t={t}
            handleThemeChange={handleThemeChange}
            currentTheme={theme}
          />

          <HeroSection t={t} yOffset={0} />

          <Footer t={t} />

          <ScrollToTopButton scrollButtonOpacity={scrollButtonOpacity} />
        </main>
      )}
    </div>
  );
}