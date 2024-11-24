import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';

interface OptimizedSplineProps {
  scene: string;
  className?: string;
}

const OptimizedSpline: React.FC<OptimizedSplineProps> = ({ scene, className }) => {
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  const splineRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = isClient && typeof window !== 'undefined' && window.innerWidth < 768;

  const handleSplineLoad = (spline: any) => {
    splineRef.current = spline;
    if (isMobile) {
      if (spline.setZoom) spline.setZoom(0.8);
      if (spline.setQuality) spline.setQuality("low");
      if (spline.setPixelRatio) spline.setPixelRatio(1);
    }

    // Safely patch THREE.PropertyBinding if it exists
    if (spline.runtime && spline.runtime.THREE && spline.runtime.THREE.PropertyBinding) {
      const originalBind = spline.runtime.THREE.PropertyBinding.prototype.bind;
      spline.runtime.THREE.PropertyBinding.prototype.bind = function() {
        try {
          return originalBind.apply(this, arguments);
        } catch (error) {
          if (error.message.includes('morphTargetInfluences')) {
            console.warn('Caught morphTargetInfluences error, returning no-op function');
            return function() {};
          }
          throw error;
        }
      };
    }

    // Safely disable problematic animations if they exist
    if (spline.animation && Array.isArray(spline.animation.animations)) {
      spline.animation.animations.forEach((anim: any) => {
        if (anim.tracks) {
          anim.tracks = anim.tracks.filter((track: any) => 
            !track.name.includes('morphTargetInfluences')
          );
        }
      });
    }
  };

  if (!isClient) return null;

  return (
    <div ref={ref} className={className}>
      {inView && (
        <Spline
          scene={scene}
          style={{ width: '100%', height: '100%' }}
          onLoad={handleSplineLoad}
        />
      )}
    </div>
  );
};

export default OptimizedSpline;

