'use client';

import React, { useState, useEffect } from 'react';
import QuickSelectChip from './QuickSelectChip';

interface ParameterInputCardProps {
  label: string;
  unit: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
  icon: React.ReactNode;
}

export default function ParameterInputCard({
  label,
  unit,
  value,
  options,
  onChange,
  icon
}: ParameterInputCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());

  useEffect(() => {
    setTempValue(value.toString());
  }, [value]);

  const handleSave = () => {
    const num = parseFloat(tempValue);
    if (!isNaN(num) && num > 0) {
      onChange(num);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-full hover:border-gray-600/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-cyan-400">{icon}</div>
            <span className="text-sm text-gray-400 font-medium">{label}</span>
          </div>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing) setTempValue(value.toString());
            }}
            className="text-gray-500 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-gray-800/50"
            aria-label="Chỉnh sửa"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        
        {/* Value Display/Input */}
        {isEditing ? (
          <div className="mb-5">
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
                if (e.key === 'Escape') {
                  setIsEditing(false);
                  setTempValue(value.toString());
                }
              }}
              className="w-full bg-gray-900 text-white text-3xl font-mono font-bold px-4 py-3 rounded-xl border-2 border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all"
              autoFocus
            />
          </div>
        ) : (
          <div className="mb-5">
            <div className="text-4xl font-mono font-bold text-white leading-none">
              {value}
              <span className="text-xl text-cyan-400 ml-2">{unit}</span>
            </div>
          </div>
        )}
        
        {/* Quick Select Options */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
          {options.map((option) => (
            <QuickSelectChip
              key={option}
              value={option}
              selected={value === option}
              onClick={() => onChange(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}