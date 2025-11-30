'use client';

import React from 'react';
import { Calculator, Settings, Package } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onPresetsClick: () => void;
  showSettings: boolean;
  showPresets: boolean;
}

export default function Header({ 
  onSettingsClick, 
  onPresetsClick, 
  showSettings, 
  showPresets 
}: HeaderProps) {
  return (
    <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50 bg-gray-900/90 shadow-lg">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Calculator className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">PU Calculator</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onPresetsClick}
            className={`p-3 rounded-xl transition-all duration-200 ${
              showPresets 
                ? 'bg-cyan-500/20 text-cyan-400 ring-2 ring-cyan-500/50' 
                : 'hover:bg-gray-800/70 text-gray-400 hover:text-white'
            }`}
            aria-label="Khuôn thường dùng"
          >
            <Package className="w-5 h-5" />
          </button>
          <button
            onClick={onSettingsClick}
            className={`p-3 rounded-xl transition-all duration-200 ${
              showSettings 
                ? 'bg-cyan-500/20 text-cyan-400 ring-2 ring-cyan-500/50' 
                : 'hover:bg-gray-800/70 text-gray-400 hover:text-white'
            }`}
            aria-label="Cài đặt"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}