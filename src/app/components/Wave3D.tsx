import React from 'react';
import dynamic from 'next/dynamic';

const SplineWrapper = dynamic(() => import('@/components/SplineWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
  )
});

const Wave3D = () => {
  return (
    <SplineWrapper 
      scene="https://prod.spline.design/HCPzHfINZY9jqo65/scene.splinecode" 
      className="absolute inset-0"
      fallbackColor="from-[#1B998B] to-[#3CDFFF] opacity-50"
    />
  );
};

export default Wave3D;

