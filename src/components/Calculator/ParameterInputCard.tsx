'use client';

import React, { useState, useEffect } from 'react';
import QuickSelectChip from './QuickSelectChip';
import { ThicknessIcon, DiameterIcon, LengthIcon } from '@/components/ui/Icons';

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
  const [isHovered, setIsHovered] = useState(false);

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
      <div 
        className="rounded-2xl p-6 border h-full transition-all duration-300"
        style={{
          background: '#151E32',
          borderColor: isHovered ? '#00E5FF50' : '#2A3B55',
          boxShadow: isHovered ? '0 0 15px rgba(0, 229, 255, 0.3)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div style={{ color: '#00E5FF' }}>
              {(() => {
                if (icon) return icon;
                // Fallback mapping based on label
                if (label === 'Độ dày') return <ThicknessIcon className="w-5 h-5" />;
                if (label === 'Đường kính ngoài') return <DiameterIcon className="w-5 h-5" />;
                if (label === 'Chiều dài') return <LengthIcon className="w-5 h-5" />;
                return null;
              })()}
            </div>
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
              {label}
            </span>
          </div>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing) setTempValue(value.toString());
            }}
            className="p-1.5 rounded-lg transition-colors"
            style={{
              color: '#94A3B8',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00E5FF';
              e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Chỉnh sửa"  >
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
              className="w-full text-white text-5xl font-mono font-bold px-4 py-3 rounded-xl border-2 focus:outline-none glow-cyan"
              style={{
                background: '#0B1121',
                borderColor: '#00E5FF'
              }}
              autoFocus
            />
          </div>
        ) : (
          <div className="mb-5">
            <div className="text-5xl font-mono font-bold text-white leading-none">
              {value}
              <span className="text-2xl ml-2" style={{ color: '#00E5FF' }}>{unit}</span>
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