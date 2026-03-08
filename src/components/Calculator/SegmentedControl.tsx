'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoldType } from '@/lib/types';
import { Circle, Square } from 'lucide-react';

interface SegmentedControlProps {
  value: MoldType;
  onChange: (value: MoldType) => void;
}

export default function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <div 
      className="relative flex rounded-xl p-1 w-full"
      style={{
        background: '#12121f',
        border: '1px solid #2d2d4a'
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg glow-purple"
        style={{
          background: 'linear-gradient(135deg, #5e19e6, #7c3aed)',
          width: 'calc(50% - 4px)',
        }}
        initial={false}
        animate={{
          x: value === 'tron' ? 0 : '100%',
          marginLeft: value === 'tron' ? 0 : 4,
        }}
        transition={{
          type: 'tween',
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1]
        }}
      />
      
      {/* Tròn Button */}
      <button
        onClick={() => onChange('tron')}
        className="relative z-10 flex-1 py-3 px-4 rounded-lg transition-colors duration-200"
        style={{
          color: value === 'tron' ? '#fff' : '#94A3B8'
        }}
        aria-label="Khuôn tròn"
      >
        <div className="flex items-center justify-center gap-2">
          <Circle className="w-4 h-4" />
          <span className="font-semibold text-sm uppercase tracking-wide">Tròn</span>
        </div>
      </button>
      
      {/* Vuông Button */}
      <button
        onClick={() => onChange('vuong')}
        className="relative z-10 flex-1 py-3 px-4 rounded-lg transition-colors duration-200"
        style={{
          color: value === 'vuong' ? '#fff' : '#94A3B8'
        }}
        aria-label="Khuôn vuông"
      >
        <div className="flex items-center justify-center gap-2">
          <Square className="w-4 h-4" />
          <span className="font-semibold text-sm uppercase tracking-wide">Vuông</span>
        </div>
      </button>
    </div>
  );
}