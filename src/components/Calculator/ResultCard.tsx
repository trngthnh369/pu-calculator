'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  color: 'purple' | 'gold';
  delay?: number;
}

export default function ResultCard({ label, value, unit, color, delay = 0 }: ResultCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let timeoutId: number | null = null;

    const startAnim = () => {
      const duration = 600;
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

    timeoutId = window.setTimeout(startAnim, delay);

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  const styles = {
    purple: {
      borderColor: '#5e19e6',
      textColor: '#a78bfa',
      glowClass: 'glow-purple',
      gradient: 'linear-gradient(135deg, rgba(94, 25, 230, 0.12), rgba(124, 58, 237, 0.06))',
    },
    gold: {
      borderColor: '#e8d5a3',
      textColor: '#e8d5a3',
      glowClass: 'glow-gold',
      gradient: 'linear-gradient(135deg, rgba(232, 213, 163, 0.1), rgba(232, 213, 163, 0.04))',
    }
  };

  const s = styles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: [0.2, 0.8, 0.2, 1] }}
      className={`rounded-2xl border overflow-hidden ${s.glowClass}`}
      style={{
        background: s.gradient,
        borderColor: s.borderColor,
      }}
    >
      <div className="px-5 py-5 md:px-6 md:py-6">
        <div 
          className="text-xs uppercase tracking-widest font-medium mb-2"
          style={{ color: '#94A3B8' }}
        >
          {label}
        </div>
        <div 
          className="text-3xl md:text-4xl font-mono font-bold leading-none mb-1"
          style={{ color: s.textColor }}
        >
          {displayValue.toFixed(2)}
        </div>
        <div className="text-sm font-medium" style={{ color: '#64748b' }}>
          {unit}
        </div>
      </div>
    </motion.div>
  );
}