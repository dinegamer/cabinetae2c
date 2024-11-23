import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const OptimizedSpline = ({ scene, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const splineRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000); // Fallback timer
    return () => clearTimeout(timer);
  }, []);

  const handleLoad = (spline) => {
    setIsLoading(false);
    splineRef.current = spline;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      if (typeof spline.setZoom === 'function') {
        spline.setZoom(0.8);
      }
      if (typeof spline.setQuality === 'function') {
        spline.setQuality('low');
      }
    }

    // Instead of trying to access animations, we'll focus on optimizing performance
    if (typeof spline.setRenderMode === 'function') {
      spline.setRenderMode('lowQuality');
    }
  };

  const handleError = (error) => {
    console.error("Spline error:", error);
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#1B998B] dark:border-[#3CDFFF]"></div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 text-red-500">
          Une erreur s'est produite lors du chargement du contenu 3D. Veuillez rafraîchir la page.
        </div>
      ) : (
        <Spline
          scene={scene}
          className={`${className} ${isLoading ? 'hidden' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </>
  );
};

export default OptimizedSpline;

