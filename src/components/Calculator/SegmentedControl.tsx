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
      className="relative flex bg-gray-800/50 rounded-full px-[1%] py-[0.8%] backdrop-blur-sm border border-gray-700/50 w-full max-w-[90vw] md:max-w-[60vw] mx-auto"
      style={{
        background: '#0F172A',
        borderColor: '#2A3B55'
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute top-[12%] bottom-[12%] w-1/2 rounded-full glow-cyan"
        style={{
          background: 'linear-gradient(to right, #00E5FF, #00B8D4)'
        }}
        initial={false}
        animate={{
          x: value === 'circular' ? '0%' : '100%',
        }}
        transition={{
          type: 'tween',
          duration: 0.15,
          ease: [0.16, 1, 0.3, 1]
        }}
      />
      
      {/* Circular Button */}
      <button
        onClick={() => onChange('circular')}
        className="relative z-10 flex-1 py-[1.5vh] px-[3%] rounded-full transition-all duration-200"
        style={{
          color: value === 'circular' ? '#0B1121' : '#94A3B8'
        }}
        aria-label="Khuôn tròn"
      >
        <div className="flex items-center justify-center gap-2">
          <CircularIcon />
          <span className="font-semibold text-base uppercase tracking-wide">Đế Tròn</span>
        </div>
      </button>
      
      {/* Saddle Button */}
      <button
        onClick={() => onChange('saddle')}
        className="relative z-10 flex-1 py-[1.5vh] px-[3%] rounded-full transition-all duration-200"
        style={{
          color: value === 'saddle' ? '#0B1121' : '#94A3B8'
        }}
        aria-label="Khuôn chữ U">
        <div className="flex items-center justify-center gap-2">
          <SaddleIcon />
          <span className="font-semibold text-base uppercase tracking-wide">Đế Chữ U</span>
        </div>
      </button>
    </div>
  );
}