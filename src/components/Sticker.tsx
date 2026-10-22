import React, { useRef } from 'react';
import { animate } from 'animejs';

export type StickerType = 'star' | 'apple' | 'pencil' | 'heart' | 'stamp' | 'backpack' | 'sun' | 'award';

interface StickerProps {
  type?: StickerType;
  label: string;
  sublabel?: string;
  colorTheme?: 'yellow' | 'coral' | 'blue' | 'green' | 'purple' | 'amber';
  rotation?: number;
  className?: string;
  onClick?: () => void;
}

const themeStyles = {
  yellow: {
    bg: 'bg-amber-100 dark:bg-amber-950/80',
    border: 'border-amber-300 dark:border-amber-700',
    text: 'text-amber-950 dark:text-amber-100',
    badge: 'bg-amber-400 text-amber-950',
    dot: '#D97706',
  },
  coral: {
    bg: 'bg-rose-100 dark:bg-rose-950/80',
    border: 'border-rose-300 dark:border-rose-700',
    text: 'text-rose-950 dark:text-rose-100',
    badge: 'bg-rose-400 text-white',
    dot: '#E11D48',
  },
  blue: {
    bg: 'bg-sky-100 dark:bg-sky-950/80',
    border: 'border-sky-300 dark:border-sky-700',
    text: 'text-sky-950 dark:text-sky-100',
    badge: 'bg-sky-400 text-white',
    dot: '#0284C7',
  },
  green: {
    bg: 'bg-emerald-100 dark:bg-emerald-950/80',
    border: 'border-emerald-300 dark:border-emerald-700',
    text: 'text-emerald-950 dark:text-emerald-100',
    badge: 'bg-emerald-400 text-white',
    dot: '#059669',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-950/80',
    border: 'border-purple-300 dark:border-purple-700',
    text: 'text-purple-950 dark:text-purple-100',
    badge: 'bg-purple-400 text-white',
    dot: '#7C3AED',
  },
  amber: {
    bg: 'bg-orange-100 dark:bg-orange-950/80',
    border: 'border-orange-300 dark:border-orange-700',
    text: 'text-orange-950 dark:text-orange-100',
    badge: 'bg-orange-500 text-white',
    dot: '#EA580C',
  },
};

export const Sticker: React.FC<StickerProps> = ({
  type = 'star',
  label,
  sublabel,
  colorTheme = 'yellow',
  rotation = 0,
  className = '',
  onClick,
}) => {
  const stickerRef = useRef<HTMLDivElement>(null);
  const theme = themeStyles[colorTheme];

  const handleClick = () => {
    if (onClick) onClick();

    if (!stickerRef.current) return;
    const el = stickerRef.current;

    // Anime.js squish and pop animation on tap
    animate(el, {
      scale: [1, 0.9, 1.15, 1],
      rotate: [rotation, rotation - 6, rotation + 6, rotation],
      duration: 350,
      ease: 'outBack',
    });
  };

  const renderIcon = () => {
    switch (type) {
      case 'star':
        return (
          <svg className="w-5 h-5 text-amber-500 shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'apple':
        return (
          <svg className="w-5 h-5 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.66-.8 1.1-1.92.98-3.04-1 .04-2.17.67-2.83 1.44-.58.67-1.09 1.77-.96 2.87 1.11.09 2.15-.47 2.81-1.27z"/>
          </svg>
        );
      case 'pencil':
        return (
          <svg className="w-5 h-5 text-sky-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-5 h-5 text-rose-500 shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        );
      case 'stamp':
        return (
          <svg className="w-5 h-5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 22h14"/>
            <path d="M19.27 13.73A8 8 0 1 0 4.73 13.73"/>
            <path d="m9 17 2 2 4-4"/>
          </svg>
        );
      case 'backpack':
        return (
          <svg className="w-5 h-5 text-purple-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
            <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"/>
            <path d="M8 10h8"/>
          </svg>
        );
      case 'sun':
        return (
          <svg className="w-5 h-5 text-amber-500 shrink-0 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        );
      case 'award':
      default:
        return (
          <svg className="w-5 h-5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="6"/>
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  return (
    <div
      ref={stickerRef}
      onClick={handleClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`school-sticker ${theme.bg} ${theme.border} text-xs font-semibold tracking-wide inline-flex items-center gap-2 cursor-pointer shadow-md select-none transition-transform ${className}`}
      title="Adesivo escolar interativo - clique para comemorar!"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="p-1 rounded-full bg-white dark:bg-black/30 shadow-xs flex items-center justify-center">
        {renderIcon()}
      </div>
      <div className="flex flex-col text-left">
        <span className={`font-kiddy font-semibold ${theme.text} leading-tight`}>{label}</span>
        {sublabel && (
          <span className="font-handwritten text-xs text-[var(--text-muted)] -mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
