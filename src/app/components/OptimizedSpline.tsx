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
    
    // Performance optimizations for mobile
    if (isMobile) {
      // Reduce quality and zoom for mobile
      spline.setZoom?.(0.8);
      spline.setQuality?.("low");
      spline.setPixelRatio?.(1);
    } else {
      // Desktop optimizations
      spline.setQuality?.("medium");
      spline.setPixelRatio?.(1.5);
    }

    // Enable WebGL optimizations
    if (spline.runtime?.renderer) {
      const renderer = spline.runtime.renderer;
      renderer.powerPreference = "high-performance";
      renderer.antialias = false;
      renderer.shadowMap.enabled = false;
      renderer.physicallyCorrectLights = false;
    }

    // Optimize animations
    if (spline.runtime?.scene) {
      const scene = spline.runtime.scene;
      scene.matrixAutoUpdate = false;
      scene.autoUpdate = false;
    }

    // Handle errors gracefully
    if (spline.runtime?.THREE?.PropertyBinding) {
      const THREE = spline.runtime.THREE;
      const originalBind = THREE.PropertyBinding.prototype.bind;
      
      THREE.PropertyBinding.prototype.bind = function() {
        try {
          return originalBind.apply(this, arguments);
        } catch (error: any) {
          if (error.message.includes('morphTargetInfluences')) {
            return () => {};
          }
          throw error;
        }
      };

      // Optimize getValue method
      const originalGetValue = THREE.PropertyBinding.prototype.getValue;
      THREE.PropertyBinding.prototype.getValue = function(...args: any[]) {
        try {
          return originalGetValue.apply(this, args);
        } catch (error: any) {
          return [];
        }
      };
    }

    // Disable problematic animations and optimize existing ones
    if (spline.animation?.animations) {
      spline.animation.animations = spline.animation.animations
        .filter((anim: any) => {
          if (!anim.tracks) return false;
          return anim.tracks.some((track: any) => !track.name.includes('morphTargetInfluences'));
        })
        .map((anim: any) => {
          if (anim.tracks) {
            anim.tracks = anim.tracks.filter((track: any) => !track.name.includes('morphTargetInfluences'));
          }
          return anim;
        });
    }

    // Force a single render update
    if (spline.runtime?.renderer && spline.runtime.scene && spline.runtime.camera) {
      spline.runtime.renderer.render(spline.runtime.scene, spline.runtime.camera);
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