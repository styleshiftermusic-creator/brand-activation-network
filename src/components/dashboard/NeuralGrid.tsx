'use client';

import React, { useState, useEffect, useRef } from 'react';

export function NeuralGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-30"
    >
      {/* The Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />
      
      {/* Subtle Crossing Glows */}
      <div 
        className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent top-1/4 animate-[pulse_4s_infinite]" 
        style={{ top: '20%' }}
      />
      <div 
        className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent left-1/3 animate-[pulse_6s_infinite]" 
        style={{ left: '33%' }}
      />
    </div>
  );
}
