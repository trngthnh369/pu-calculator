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
    <header 
      className="border-b backdrop-blur-sm sticky top-0 z-50"
      style={{
        background: 'rgba(11, 17, 33, 0.9)',
        borderColor: '#2A3B55'
      }}
>
      <div className="container mx-auto px-[5%] py-[2vh] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-[10vw] h-[10vw] max-w-[48px] max-h-[48px] rounded-xl flex items-center justify-center glow-cyan"
            style={{
              background: 'linear-gradient(135deg, #00E5FF, #00B8D4)'
            }}
>
            <Calculator className="w-[60%] h-[60%]" style={{ color: '#0B1121' }} />
          </div>
          <h1 className="text-[3.5vw] md:text-2xl font-bold tracking-tight text-white">
            PU Calculator
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onPresetsClick}
            className={`p-3 rounded-xl transition-all duration-200 ${
              showPresets 
                ? 'glow-cyan' 
                : ''
            }`}
            style={{
              background: showPresets ? 'rgba(0, 229, 255, 0.2)' : 'transparent',
              color: showPresets ? '#00E5FF' : '#94A3B8',
              border: showPresets ? '1px solid #00E5FF' : '1px solid transparent'
            }}
            aria-label="Khuôn thường dùng"
>
            <Package className="w-5 h-5" />
          </button>
          <button
            onClick={onSettingsClick}
            className={`p-3 rounded-xl transition-all duration-200 ${
              showSettings 
                ? 'glow-cyan' 
                : ''
            }`}
            style={{
              background: showSettings ? 'rgba(0, 229, 255, 0.2)' : 'transparent',
              color: showSettings ? '#00E5FF' : '#94A3B8',
              border: showSettings ? '1px solid #00E5FF' : '1px solid transparent'
            }}
            aria-label="Cài đặt">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}