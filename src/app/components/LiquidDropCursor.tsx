"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function LiquidDropCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsPointer(window.getComputedStyle(e.target as Element).cursor === 'pointer')
    }
    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return (
    <motion.div 
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50"
      animate={{ 
        x: position.x - 16, 
        y: position.y - 16,
        scale: isPointer ? 1.2 : 1
      }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-8 rounded-full"
          style={{
            background: `radial-gradient(circle, #1B998B${i === 0 ? '40' : '20'} 0%, transparent 70%)`,
          }}
          initial={{ scale: 0.1, opacity: 0.8 }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      <motion.div 
        className="h-8 w-8 rounded-full bg-[#F2C94C]"
        style={{ mixBlendMode: 'difference' }}
      />
    </motion.div>
  )
}