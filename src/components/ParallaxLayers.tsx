import { useEffect, useRef, useState } from 'react';

interface ParallaxLayersProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxLayers({ children, className = '' }: ParallaxLayersProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getParallaxTransform = (depth: number, baseX: number = 0, baseY: number = 0) => {
    const scrollFactor = scrollY * 0.1;
    const mouseX = (mousePosition.x - 0.5) * depth * 0.5;
    const mouseY = (mousePosition.y - 0.5) * depth * 0.5;
    
    return {
      transform: `translateZ(-${depth}px) translateX(${baseX + mouseX}px) translateY(${baseY + scrollFactor}px) rotateX(${mouseY * 0.1}deg) rotateY(${mouseX * 0.1}deg)`,
      opacity: Math.max(0.02, 0.15 - (depth * 0.02))
    };
  };

  return (
    <div ref={containerRef} className={`parallax-container ${className}`}>
      {/* Parallax Layer 1 - Geometric Patterns */}
      <div 
        className="parallax-layer parallax-layer-1"
        style={getParallaxTransform(100, 0, 0)}
      >
        <div className="parallax-geometric" />
      </div>

      {/* Parallax Layer 2 - Lines */}
      <div 
        className="parallax-layer parallax-layer-2"
        style={getParallaxTransform(200, 20, 10)}
      >
        <div className="parallax-lines" />
      </div>

      {/* Parallax Layer 3 - Dots */}
      <div 
        className="parallax-layer parallax-layer-3"
        style={getParallaxTransform(300, -15, 20)}
      >
        <div className="parallax-dots" />
      </div>

      {/* Parallax Layer 4 - Waves */}
      <div 
        className="parallax-layer parallax-layer-4"
        style={getParallaxTransform(400, 25, -10)}
      >
        <div className="parallax-waves" />
      </div>

      {/* Parallax Layer 5 - Circles */}
      <div 
        className="parallax-layer parallax-layer-5"
        style={getParallaxTransform(500, -20, 15)}
      >
        <div className="parallax-circles" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Individual Parallax Layer Component
export function ParallaxLayer({ 
  depth = 100, 
  children, 
  className = '',
  baseX = 0,
  baseY = 0
}: { 
  depth?: number; 
  children: React.ReactNode;
  className?: string;
  baseX?: number;
  baseY?: number;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = layerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getTransform = () => {
    const scrollFactor = scrollY * 0.1;
    const mouseX = (mousePosition.x - 0.5) * depth * 0.5;
    const mouseY = (mousePosition.y - 0.5) * depth * 0.5;
    
    return {
      transform: `translateZ(-${depth}px) translateX(${baseX + mouseX}px) translateY(${baseY + scrollFactor}px) rotateX(${mouseY * 0.1}deg) rotateY(${mouseX * 0.1}deg)`,
      opacity: Math.max(0.02, 0.15 - (depth * 0.02))
    };
  };

  return (
    <div 
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={getTransform()}
    >
      {children}
    </div>
  );
}

// Global Parallax Background Component
export function GlobalParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getGlobalTransform = (depth: number, baseX: number = 0, baseY: number = 0) => {
    const scrollFactor = scrollY * 0.05;
    const mouseX = (mousePosition.x - 0.5) * depth * 0.3;
    const mouseY = (mousePosition.y - 0.5) * depth * 0.3;
    
    return {
      transform: `translateZ(-${depth}px) translateX(${baseX + mouseX}px) translateY(${baseY + scrollFactor}px) rotateX(${mouseY * 0.05}deg) rotateY(${mouseX * 0.05}deg)`,
      opacity: Math.max(0.01, 0.1 - (depth * 0.015))
    };
  };

  return (
    <>
      {/* Global Parallax Layer 1 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={getGlobalTransform(100, 0, 0)}
      >
        <div className="parallax-geometric" />
      </div>

      {/* Global Parallax Layer 2 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={getGlobalTransform(200, 30, 20)}
      >
        <div className="parallax-lines" />
      </div>

      {/* Global Parallax Layer 3 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={getGlobalTransform(300, -25, 40)}
      >
        <div className="parallax-dots" />
      </div>

      {/* Global Parallax Layer 4 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={getGlobalTransform(400, 40, -20)}
      >
        <div className="parallax-waves" />
      </div>

      {/* Global Parallax Layer 5 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={getGlobalTransform(500, -35, 30)}
      >
        <div className="parallax-circles" />
      </div>
    </>
  );
} 