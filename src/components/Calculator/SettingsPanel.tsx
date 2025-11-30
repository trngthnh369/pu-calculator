'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsPanelProps {
  show: boolean;
  density: number;
  onDensityChange: (value: number) => void;
}

export default function SettingsPanel({ show, density, onDensityChange }: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <label className="block text-sm text-gray-400 mb-3 font-medium">
              Tỷ trọng (kg/m³)
            </label>
            <input
              type="number"
              value={density}
              onChange={(e) => onDensityChange(parseFloat(e.target.value))}
              className="w-full max-w-xs bg-gray-800 text-white text-lg font-mono px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all hover:border-gray-600"
              min="100"
              max="300"
              step="5"
            />
            <p className="text-xs text-gray-500 mt-3">
              Mặc định: 150 kg/m³.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}