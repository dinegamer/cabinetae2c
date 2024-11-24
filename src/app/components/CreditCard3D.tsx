import React from 'react';
import OptimizedSpline from './OptimizedSpline';

const CreditCard3D: React.FC = () => {
  return (
    <div className="w-full h-full relative z-10">
      <OptimizedSpline
        scene="https://prod.spline.design/HLDqtijbAOIur2J6/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default CreditCard3D;