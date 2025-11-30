'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoldType } from '@/lib/types';
import { CircularIcon, SaddleIcon } from '@/components/ui/Icons';

interface SegmentedControlProps {
  value: MoldType;
  onChange: (value: MoldType) => void;
}

export default function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <div 
      className="relative flex bg-gray-800/50 rounded-full p-1 backdrop-blur-sm border border-gray-700/50"
      style={{
        background: '#0F172A',
        borderColor: '#2A3B55'
      }}
>
      {/* Animated Background */}
      <motion.div
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full glow-cyan"
        style={{
          background: 'linear-gradient(to right, #00E5FF, #00B8D4)'
        }}
        initial={false}
        animate={{
          x: value === 'circular' ? '6px' : 'calc(100% + 6px)',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 350, 
          damping: 30,
          mass: 0.6
        }}
      />
      
      {/* Circular Button */}
      <button
        onClick={() => onChange('circular')}
        className="relative z-10 flex-1 py-3.5 px-6 rounded-full transition-all duration-200"
        style={{
          color: value === 'circular' ? '#0B1121' : '#94A3B8'
        }}
        aria-label="Khuôn tròn"
>
        <div className="flex items-center justify-center gap-2">
          <CircularIcon />
          <span className="font-semibold text-base uppercase tracking-wide">Khuôn Tròn</span>
        </div>
      </button>
      
      {/* Saddle Button */}
      <button
        onClick={() => onChange('saddle')}
        className="relative z-10 flex-1 py-3.5 px-6 rounded-full transition-all duration-200"
        style={{
          color: value === 'saddle' ? '#0B1121' : '#94A3B8'
        }}
        aria-label="Khuôn chữ U">
        <div className="flex items-center justify-center gap-2">
          <SaddleIcon />
          <span className="font-semibold text-base uppercase tracking-wide">Khuôn Chữ U</span>
        </div>
      </button>
    </div>
  );
}