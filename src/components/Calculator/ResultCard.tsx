'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  color: 'cyan' | 'yellow';
  valueClassName?: string;
  delay?: number;
}

export default function ResultCard({ label, value, unit, color, valueClassName = 'text-6xl', delay = 0, variants }: ResultCardProps & { variants?: Variants }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Smooth animated number using requestAnimationFrame + easing
    let rafId: number | null = null;
    let timeoutId: number | null = null;

    const startAnim = () => {
      const duration = 700; // ms
      const from = 0;
      const to = value;
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const start = performance.now();

      const step = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(t);
        setDisplayValue(from + (to - from) * eased);
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        }
      };

      rafId = requestAnimationFrame(step);
    };

    timeoutId = window.setTimeout(startAnim, delay ?? 0);

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  const styles = {
    cyan: {
      background: '#151E32',
      borderColor: '#00E5FF',
      textColor: '#00E5FF',
      glowClass: 'glow-cyan'
    },
    yellow: {
      background: '#151E32',
      borderColor: '#FFD600',
      textColor: '#FFD600',
      glowClass: 'glow-yellow'
    }
  };

  const currentStyle = styles[color];

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.2, 0.8, 0.2, 1] } }
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`min-w-0 overflow-hidden rounded-2xl p-7 border transition-all duration-300 ${currentStyle.glowClass}`}
      style={{
        background: currentStyle.background,
        borderColor: currentStyle.borderColor
      }}
    >
      <div 
        className="text-xs uppercase tracking-wider font-medium mb-3"
        style={{ color: '#94A3B8' }}
>
        {label}
      </div>
      <div 
        className={`${valueClassName} font-mono font-bold mb-2 leading-none wrap-break-word whitespace-normal`}
        style={{ color: currentStyle.textColor }}>
        {displayValue.toFixed(2)}
      </div>
      <div className="text-base font-medium" style={{ color: '#94A3B8' }}>
        {unit}
      </div>
    </motion.div>
  );
}