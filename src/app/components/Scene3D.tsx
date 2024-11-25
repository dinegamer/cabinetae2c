"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SplineWrapper = dynamic(() => import('./SplineWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
  )
});

const Scene3D = () => {
  return (
    <div className="w-full h-[500px]"> {/* Explicit height */}
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-[#1B998B]/10 to-[#3CDFFF]/10 rounded-xl animate-pulse" />
      }>
        <SplineWrapper 
          scene="https://prod.spline.design/Xcmdx3H8HZub3SnB/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
};

export default React.memo(Scene3D);