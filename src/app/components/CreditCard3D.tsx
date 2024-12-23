import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SplineWrapper = dynamic(() => import('./SplineWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
  )
});

const CreditCard3D = () => {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
    }>
      <SplineWrapper 
        scene="https://prod.spline.design/HLDqtijbAOIur2J6/scene.splinecode"
        className="w-full h-full"
        fallbackColor="from-[#1B998B]/10 to-[#3CDFFF]/10"
      />
    </Suspense>
  );
};

export default React.memo(CreditCard3D);