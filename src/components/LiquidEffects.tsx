import { useEffect, useRef, useState } from 'react';

interface LiquidEffectsProps {
  children: React.ReactNode;
  className?: string;
}

export default function LiquidEffects({ children, className = '' }: LiquidEffectsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Cursor Follower */}
      <div
        className="cursor-follower"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px) scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0.8 : 0.3,
        }}
      />
      
      {/* Cursor Trail */}
      <div
        className="cursor-trail"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          opacity: isHovering ? 0.6 : 0.2,
        }}
      />

      {/* Liquid/Metaball Container */}
      <div ref={containerRef} className={`liquid-bg metaball-container cursor-responsive ${className}`}>
        {/* Enhanced Metaballs */}
        <div className="metaball animate-glow" />
        <div className="metaball animate-glow" style={{ animationDelay: '2s' }} />
        <div className="metaball animate-glow" style={{ animationDelay: '4s' }} />
        <div className="metaball animate-glow" style={{ animationDelay: '6s' }} />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}

// Individual Metaball Component
export function Metaball({ 
  size = 200, 
  delay = 0, 
  className = '' 
}: { 
  size?: number; 
  delay?: number; 
  className?: string; 
}) {
  return (
    <div
      className={`metaball ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// Liquid Background Component
export function LiquidBackground({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`liquid-bg ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 