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
      className={`flex-shrink-0 px-4 py-2 rounded-full font-mono text-sm whitespace-nowrap transition-all duration-200 ${
        selected
          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-400'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-600'
      }`}
    >
      {value}
    </motion.button>
  );
}