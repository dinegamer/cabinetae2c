"use client";

import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

// Use PascalCase for type names
interface SplineWrapperProps {
  scene: string;
  className?: string;
  fallbackColor?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Separate interfaces into their own files or group at top
interface SplineRuntime {
  renderer?: THREE.WebGLRenderer;
  scene?: THREE.Scene;
  dispose: () => void;
}

interface SplineApp {
  runtime?: SplineRuntime;
  animation?: {
    animations: Array<{
      tracks?: Array<{
        name: string;
      }>;
    }>;
    stopAllAnimations?: () => void;
  };
}

// Use named function instead of anonymous arrow function
function SplineWrapper({ 
  scene, 
  className = "",
  fallbackColor = "from-[#1B998B]/10 to-[#3CDFFF]/10",
  onLoad,
  onError
}: SplineWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const splineRef = useRef<SplineApp | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const patchTHREE = () => {
      if (typeof window === 'undefined') return;
      
      const THREE = (window as any).THREE;
      if (!THREE?.PropertyBinding?.prototype) return;

      const createMorphTargetProxy = () => {
        return new Proxy([], {
          get: (target, prop) => {
            if (prop === 'length') return 0;
            return 0;
          },
          set: () => true
        });
      };

      const methods = ['bind', 'getValue', 'setValue'];
      methods.forEach(method => {
        const original = THREE.PropertyBinding.prototype[method];
        THREE.PropertyBinding.prototype[method] = function(...args: unknown[]) {
          try {
            return original.apply(this, args);
          } catch (error) {
            if (error instanceof Error && error.message?.includes('morphTargetInfluences')) {
              if (method === 'bind') return () => {};
              if (method === 'getValue') return createMorphTargetProxy();
              if (method === 'setValue') return true;
            }
            return undefined;
          }
        };
      });

      if (THREE.Object3D) {
        const originalAdd = THREE.Object3D.prototype.add;
        THREE.Object3D.prototype.add = function(...objects: THREE.Object3D[]) {
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
          if (splineRef.current.animation) {
            splineRef.current.animation.stopAllAnimations?.();
          }
          
          if (splineRef.current.runtime.scene) {
            splineRef.current.runtime.scene.traverse((object: THREE.Object3D) => {
              if ((object as any).animation) {
                (object as any).animation.stop?.();
              }
            });
          }

          splineRef.current.runtime.dispose();
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      }
    };
  }, []);

  const handleLoad = async (splineApp: SplineApp) => {
    try {
      if (!splineApp) return;
      
      splineRef.current = splineApp;

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

      if (splineApp.runtime?.scene) {
        const scene = splineApp.runtime.scene;
        scene.matrixAutoUpdate = false;
        scene.autoUpdate = false;

        scene.traverse((object: THREE.Object3D) => {
          if ((object as THREE.Mesh).isMesh) {
            object.matrixAutoUpdate = false;
            object.frustumCulled = true;
            (object as THREE.Mesh).castShadow = false;
            (object as THREE.Mesh).receiveShadow = false;
            
            if ((object as THREE.Mesh).material) {
              ((object as THREE.Mesh).material as THREE.Material).precision = 'lowp';
              ((object as THREE.Mesh).material as THREE.Material).fog = false;
            }
          }
        });
      }

      if (splineApp.animation?.animations) {
        splineApp.animation.animations = splineApp.animation.animations
          .filter((anim) => {
            if (!anim?.tracks) return false;
            return !anim.tracks.some((track) => 
              track.name.includes('morphTarget')
            );
          });
      }

      setIsLoaded(true);
      onLoad?.();
    } catch (err) {
      console.warn('Spline load error:', err);
      setError(true);
      if (err instanceof Error) {
        onError?.(err);
      }
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
}

// Single default export at the end
export default SplineWrapper;

