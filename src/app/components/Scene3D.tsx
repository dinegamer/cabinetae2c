import React from 'react';
import OptimizedSpline from './OptimizedSpline';

const Scene3D: React.FC = () => {
  return (
    <div className="w-[400px] h-[400px] relative">
      <div className="absolute inset-0">
        <OptimizedSpline
          scene="https://prod.spline.design/Xcmdx3H8HZub3SnB/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Scene3D;