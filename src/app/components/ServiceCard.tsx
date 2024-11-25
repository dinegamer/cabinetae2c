"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
  index: number
  active: boolean
  onClick: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, index, active, onClick }) => {
  return (
    <motion.div
      className="relative h-[250px] sm:h-[300px] w-full sm:w-[280px] overflow-hidden cursor-pointer transform-gpu rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      style={{
        opacity: active ? 1 : 0.7,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B998B] via-[#3CDFFF] to-[#1B998B] opacity-75" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-white">
        <h3 className="mb-3 text-xl sm:text-2xl font-bold">{title}</h3>
        <p className="text-sm sm:text-base text-center">{description}</p>
      </div>
    </motion.div>
  )
}

export default ServiceCard