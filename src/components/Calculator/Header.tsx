'use client';

import React from 'react';
import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header 
      className="border-b backdrop-blur-md sticky top-0 z-50"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        borderColor: '#2d2d4a'
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center glow-purple"
          style={{
            background: 'linear-gradient(135deg, #5e19e6, #7c3aed)'
          }}
        >
          <Calculator className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
            PU Calculator
          </h1>
          <p className="text-xs text-gray-400 hidden sm:block">
            Tính toán khối lượng Poly & ISO cho khuôn gối PU
          </p>
        </div>
      </div>
    </header>
  );
}