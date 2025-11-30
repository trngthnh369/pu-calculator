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
    <div className="relative flex bg-gray-800/50 rounded-full p-1.5 backdrop-blur-sm border border-gray-700/50 shadow-lg">
      {/* Animated Background */}
      <motion.div
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full shadow-xl shadow-cyan-500/50"
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
        className={`relative z-10 flex-1 py-3.5 px-6 rounded-full transition-all duration-200 ${
          value === 'circular' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Khuôn tròn"
      >
        <div className="flex items-center justify-center gap-2">
          <CircularIcon />
          <span className="font-semibold text-base">Khuôn Tròn</span>
        </div>
      </button>
      
      {/* Saddle Button */}
      <button
        onClick={() => onChange('saddle')}
        className={`relative z-10 flex-1 py-3.5 px-6 rounded-full transition-all duration-200 ${
          value === 'saddle' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Khuôn chữ U"
      >
        <div className="flex items-center justify-center gap-2">
          <SaddleIcon />
          <span className="font-semibold text-base">Khuôn Chữ U</span>
        </div>
      </button>
    </div>
  );
}