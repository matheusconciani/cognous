import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UnderlineProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'squiggle' | 'sweep' | 'double' | 'smile';
  className?: string;
}

export const UnderlineMarker: React.FC<UnderlineProps> = ({
  children,
  color = '#F59E0B',
  variant = 'squiggle',
  className = '',
}) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength ? path.getTotalLength() : 120;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: 'power2.out',
      delay: 0.2,
    });
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      {variant === 'squiggle' && (
        <svg
          className="absolute -bottom-2 left-0 w-full h-3 overflow-visible pointer-events-none z-0"
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M2 7 C 20 2, 35 12, 55 6 C 75 1, 95 11, 118 5"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      )}

      {variant === 'sweep' && (
        <span
          className="absolute left-0 bottom-0.5 w-full h-3.5 -z-10 rounded-sm opacity-60 transform -rotate-1 origin-left"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}

      {variant === 'double' && (
        <svg
          className="absolute -bottom-2.5 left-0 w-full h-3.5 overflow-visible pointer-events-none z-0"
          viewBox="0 0 120 14"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M3 5 C 30 2, 70 8, 117 4"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M6 10 C 35 7, 75 13, 114 9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      )}

      {variant === 'smile' && (
        <svg
          className="absolute -bottom-2 left-0 w-full h-2.5 overflow-visible pointer-events-none z-0"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M2 2 Q 50 8, 98 2"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
};
