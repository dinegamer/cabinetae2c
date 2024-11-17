import React, { useState } from 'react';
import OriginalSpline from '@splinetool/react-spline';

interface SplineProps {
  scene: string;
  [key: string]: any;  // Pour permettre d'autres props
}

const Spline: React.FC<SplineProps> = ({ scene, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg w-full h-full" />
        </div>
      )}
      
      <div className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <OriginalSpline 
          scene={scene}
          onLoad={() => setIsLoading(false)}
          {...props}
        />
      </div>
    </div>
  );
};

export default Spline;