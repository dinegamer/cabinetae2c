import React from 'react'
import { motion } from 'framer-motion'

interface PlaceholderSceneProps {
  className?: string
  sceneUrl: string
}

const PlaceholderScene: React.FC<PlaceholderSceneProps> = ({ className = "w-full h-full", sceneUrl }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-xl`}>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <motion.div
          className="text-2xl font-bold text-gray-800/60 text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          3D Scene Placeholder
        </motion.div>
        <motion.div
          className="text-sm text-gray-600/80 text-center break-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {sceneUrl}
        </motion.div>
      </div>
    </div>
  )
}

export default PlaceholderScene

