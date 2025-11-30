'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  color: 'cyan' | 'yellow';
  delay?: number;
}

export default function ResultCard({ label, value, unit, color, delay = 0 }: ResultCardProps) {
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

  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50 shadow-cyan-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 shadow-yellow-500/30'
  };

  const textColor = color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-2xl p-7 border shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      <div className="text-sm text-gray-400 font-medium mb-3 uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-6xl font-mono font-bold ${textColor} mb-2 leading-none`}>
        {displayValue.toFixed(2)}
      </div>
      <div className="text-base text-gray-500 font-medium">{unit}</div>
    </motion.div>
  );
}