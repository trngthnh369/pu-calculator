import React from 'react';

export const CircularIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <div className={`border-2 border-current rounded-full ${className}`} />
);

export const SaddleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <div className="flex gap-0.5">
    <div className={`w-3 border-2 border-current ${className}`} />
    <div className={`w-3 border-2 border-current rounded-r-full border-l-0 ${className}`} />
  </div>
);

export const ThicknessIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`w-5 h-2 bg-current`} />
  
);

export const DiameterIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`border-2 border-current rounded-full ${className}`} />
);

export const LengthIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`w-5 h-1 bg-current rounded-full`} />
);