"use client";

import { memo } from 'react';
import { motion } from 'framer-motion';
import OptimizedSpline from './OptimizedSpline';

const Scene3D = () => {
  return (
    <motion.div 
      className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Placeholder for 3D scene */}
      <OptimizedSpline
          scene="https://prod.spline.design/Xcmdx3H8HZub3SnB/scene.splinecode"
          className="w-full h-full"
        />
    </motion.div>
  );
};

export default memo(Scene3D);