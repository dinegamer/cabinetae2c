import React from 'react';
import OptimizedSpline from './OptimizedSpline';

const LargeScene3D: React.FC = () => {
  return (
    <div className="relative h-[600px]">
      <OptimizedSpline
        scene="https://prod.spline.design/DgY0ZSx5iybpShE2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default LargeScene3D;