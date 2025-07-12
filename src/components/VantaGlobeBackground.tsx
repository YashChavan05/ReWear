import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';

interface VantaGlobeBackgroundProps {
  className?: string;
}

const getVantaColors = () => {
  const isDark = document.documentElement.classList.contains('dark');

  if (isDark) {
    // Dark mode: deep background, vibrant blue globe
    return {
      bgHex: '#0a0a0a',   // almost black background
      fgHex: '#00bfff',   // vibrant sky blue globe
      fgHex2: '#ffffff',  // white highlight
    };
  } else {
    // Light mode: soft background, ocean blue globe
    return {
      bgHex: '#f5faff',   // very light blue/gray
      fgHex: '#0077be',   // calm ocean blue globe
      fgHex2: '#00bfff',  // accent sky blue highlight
    };
  }
};


export default function VantaGlobeBackground({ className = '' }: VantaGlobeBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  // Helper to (re)initialize Vanta
  const setupVanta = () => {
    const { bgHex, fgHex, fgHex2 } = getVantaColors();
    if (vantaEffect.current) {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
    }
    if (vantaRef.current) {
      vantaEffect.current = GLOBE({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: fgHex,
        color2: fgHex2,
        backgroundColor: bgHex,
        size: 1.0,
        points: 8.0,
        maxDistance: 20.0,
        spacing: 22.0,
      });
    }
  };

  useEffect(() => {
    setupVanta();
    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      setupVanta();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      ref={vantaRef}
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      aria-hidden="true"
    />
  );
} 