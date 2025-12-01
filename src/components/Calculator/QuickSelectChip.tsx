'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface QuickSelectChipProps {
  value: number;
  selected: boolean;
  onClick: () => void;
}

export default function QuickSelectChip({ value, selected, onClick }: QuickSelectChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`shrink-0 px-[4%] py-[1vh] rounded-full font-mono text-sm whitespace-nowrap transition-all duration-200 ${
        selected ? 'glow-cyan' : ''
      }`}
      style={{
        background: selected ? '#00E5FF' : '#0F172A',
        color: selected ? '#0B1121' : '#94A3B8',
        border: selected ? 'none' : '1px solid #2A3B55',
        fontWeight: selected ? 700 : 400
      }}>
      {value}
    </motion.button>
  );
}