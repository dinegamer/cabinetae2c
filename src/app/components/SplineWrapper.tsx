"use client";

import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SplineWrapperProps {
  scene: string;
  className?: string;
  fallbackColor?: string;
}

const SplineWrapper: React.FC<SplineWrapperProps> = ({ 
  scene, 
  className = "",
  fallbackColor = "from-[#1B998B]/10 to-[#3CDFFF]/10"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const splineRef = useRef<any>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const patchTHREE = () => {
      if (typeof window === 'undefined') return;
      
      const THREE = (window as any).THREE;
      if (!THREE?.PropertyBinding?.prototype) return;

      // Create a proxy for morphTargetInfluences
      const createMorphTargetProxy = () => {
        return new Proxy([], {
          get: (target, prop) => {
            if (prop === 'length') return 0;
            return 0;
          },
          set: () => true
        });
      };

      // Patch PropertyBinding prototype
      const methods = ['bind', 'getValue', 'setValue'];
      methods.forEach(method => {
        const original = THREE.PropertyBinding.prototype[method];
        THREE.PropertyBinding.prototype[method] = function(...args: any[]) {
          try {
            return original.apply(this, args);
          } catch (error: any) {
            if (error.message?.includes('morphTargetInfluences')) {
              if (method === 'bind') return () => {};
              if (method === 'getValue') return createMorphTargetProxy();
              if (method === 'setValue') return true;
            }
            return undefined;
          }
        };
      });

      // Patch Object3D
      if (THREE.Object3D) {
        const originalAdd = THREE.Object3D.prototype.add;
        THREE.Object3D.prototype.add = function(...objects: any[]) {
          objects.forEach(object => {
            if (object && !object.morphTargetInfluences) {
              object.morphTargetInfluences = createMorphTargetProxy();
            }
          });
          return originalAdd.apply(this, objects);
        };
      }
    };

    patchTHREE();

    return () => {
      if (splineRef.current?.runtime) {
        try {
          // Stop all animations
          if (splineRef.current.animation) {
            splineRef.current.animation.stopAllAnimations?.();
          }
          
          // Clear any ongoing animations
          if (splineRef.current.runtime.scene) {
            splineRef.current.runtime.scene.traverse((object: any) => {
              if (object.animation) {
                object.animation.stop?.();
              }
            });
          }

          // Dispose of the runtime
          splineRef.current.runtime.dispose();
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      }
    };
  }, []);

  const handleLoad = async (splineApp: any) => {
    try {
      if (!splineApp) return;
      
      splineRef.current = splineApp;

      // Renderer optimizations
      if (splineApp.runtime?.renderer) {
        const renderer = splineApp.runtime.renderer;
        Object.assign(renderer, {
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true
        });
        renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
      }

      // Scene optimizations
      if (splineApp.runtime?.scene) {
        const scene = splineApp.runtime.scene;
        scene.matrixAutoUpdate = false;
        scene.autoUpdate = false;

        scene.traverse((object: any) => {
          if (object.isMesh) {
            object.matrixAutoUpdate = false;
            object.frustumCulled = true;
            object.castShadow = false;
            object.receiveShadow = false;
            
            if (object.material) {
              object.material.precision = 'lowp';
              object.material.fog = false;
            }
          }
        });
      }

      // Handle animations more gracefully
      if (splineApp.animation?.animations) {
        splineApp.animation.animations = splineApp.animation.animations
          .filter((anim: any) => {
            if (!anim?.tracks) return false;
            return !anim.tracks.some((track: any) => 
              track.name.includes('morphTarget')
            );
          });
      }

      setIsLoaded(true);
    } catch (err) {
      console.warn('Spline load error:', err);
      setError(true);
    }
  };

  if (error) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${fallbackColor} rounded-xl`}
          style={{ minHeight: '300px' }}
        />
      </div>
    );
  }

  return (
    <motion.div 
      ref={ref}
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '300px' }}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${fallbackColor} rounded-xl`}
      />
      {inView && (
        <Spline
          scene={scene}
          onLoad={handleLoad}
          style={{ 
            width: '100%', 
            height: '100%',
            minHeight: '300px',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            transform: 'translate3d(0,0,0)'
          }}
        />
      )}
    </motion.div>
  );
};

export default SplineWrapper;