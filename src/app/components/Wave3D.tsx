import React from 'react';
import OptimizedSpline from './OptimizedSpline';

const Wave3D: React.FC = () => {
  return (
    <div className="w-full h-full relative z-0">
      <OptimizedSpline
        scene="https://prod.spline.design/2ZVMFIVOT4JiqV0Z/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default Wave3D;