"use client";

import { memo } from 'react';
import { motion } from 'framer-motion';
import OptimizedSpline from './OptimizedSpline';

const Wave3D = () => {
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-[#1B998B] to-[#3CDFFF] opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.5 }}
      
    >
    <OptimizedSpline
        scene="https://prod.spline.design/2ZVMFIVOT4JiqV0Z/scene.splinecode"
        className="w-full h-full"
      />
      </motion.div>
  );
};

export default memo(Wave3D);