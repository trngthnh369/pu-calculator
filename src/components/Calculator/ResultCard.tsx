'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  color: 'cyan' | 'yellow';
  valueClassName?: string;
  delay?: number;
}

export default function ResultCard({ label, value, unit, color, valueClassName = 'text-6xl', delay = 0 }: ResultCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
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