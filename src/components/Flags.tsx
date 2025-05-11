
import React from 'react';

interface FlagProps {
  className?: string;
}

export const FlagUS: React.FC<FlagProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 640 480" 
    className={className}
  >
    <path fill="#bd3d44" d="M0 0h640v480H0"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
    <rect width="364" height="259" fill="#192f5d"/>
    <marker id="a" markerHeight="30" markerWidth="30">
      <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z"/>
    </marker>
    <path fill="none" markerMid="url(#a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"/>
  </svg>
);

export const FlagRU: React.FC<FlagProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 640 480" 
    className={className}
  >
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#0039a6" d="M0 160h640v320H0z"/>
    <path fill="#d52b1e" d="M0 320h640v160H0z"/>
  </svg>
);

export const FlagAM: React.FC<FlagProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 640 480" 
    className={className}
  >
    <path fill="#d90012" d="M0 0h640v160H0z"/>
    <path fill="#0033a0" d="M0 160h640v160H0z"/>
    <path fill="#f2a800" d="M0 320h640v160H0z"/>
  </svg>
);

// Create an object with all flag components for easier access
export const Flags = {
  en: FlagUS,
  ru: FlagRU,
  am: FlagAM,
};
