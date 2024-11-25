import React from 'react';
import SplineWrapper from './SplineWrapper';

const Wave3D = () => {
  return (
    <SplineWrapper 
    scene="https://prod.spline.design/HCPzHfINZY9jqo65/scene.splinecode" 

      className="absolute inset-0"
      fallbackColor="from-[#1B998B] to-[#3CDFFF] opacity-50"
    />
  );
};

export default React.memo(Wave3D);