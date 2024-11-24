"use client";

import { memo } from 'react';
import { motion } from 'framer-motion';
import OptimizedSpline from './OptimizedSpline';
const CreditCard3D = () => {
  return (
    <motion.div 
      className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <OptimizedSpline
        scene="https://prod.spline.design/HLDqtijbAOIur2J6/scene.splinecode"
        className="w-full h-full"
      />{/* Placeholder for credit card 3D model */}
    </motion.div>
  );
};

export default memo(CreditCard3D);