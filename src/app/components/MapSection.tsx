import React from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface MapSectionProps {
  t: {
    map: {
      title: string
      openInMaps: string
    }
  }
}

const MapSection: React.FC<MapSectionProps> = ({ t }) => {
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
  )
}

export default MapSection

