'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Preset } from '@/lib/types';

interface PresetsPanelProps {
  show: boolean;
  presets: Preset[];
  onSelectPreset: (preset: Preset) => void;
}

export default function PresetsPanel({ show, presets, onSelectPreset }: PresetsPanelProps) {
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
            <h3 className="text-sm text-gray-400 mb-4 font-medium">Khuôn Thường Dùng</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presets.map((preset) => (
                <motion.button
                  key={preset.name}
                  onClick={() => onSelectPreset(preset)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-800/70 hover:bg-gray-700 text-left p-0 rounded-xl border border-gray-700 transition-all duration-200 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="px-3 py-3">
                    <div className="font-mono text-sm text-cyan-400 mb-2 font-semibold">
                      {preset.name}
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      T: {preset.thickness} - OD: {preset.outerDiameter} - L: {preset.length} 
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}