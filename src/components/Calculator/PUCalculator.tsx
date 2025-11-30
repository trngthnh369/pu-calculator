'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Settings, Zap, Package } from 'lucide-react';
import { MoldType, CalculationParams, CalculationResult, Preset } from '@/lib/types';
import { calculate } from '@/lib/calculations';
import { 
  CIRCULAR_PRESETS, 
  SADDLE_PRESETS,
  THICKNESS_OPTIONS,
  OD_OPTIONS,
  LENGTH_OPTIONS 
} from '@/lib/presets';

// ==================== SUB COMPONENTS ====================

// Segmented Control Component
const SegmentedControl: React.FC<{
  value: MoldType;
  onChange: (value: MoldType) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="relative flex bg-gray-800/50 rounded-full p-1 backdrop-blur-sm border border-gray-700/50">
      <AnimatePresence mode="wait">
        <motion.div
          layoutId="activeSegment"
          className="absolute inset-y-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full shadow-lg shadow-cyan-500/50"
          initial={false}
          animate={{
            x: value === 'circular' ? 4 : '100%',
            width: 'calc(50% - 8px)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </AnimatePresence>
      
      <button
        onClick={() => onChange('circular')}
        className={`relative z-10 flex-1 py-3 px-6 rounded-full transition-colors ${
          value === 'circular' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-current rounded-full" />
          <span className="font-medium">Khuôn Tròn</span>
        </div>
      </button>
      
      <button
        onClick={() => onChange('saddle')}
        className={`relative z-10 flex-1 py-3 px-6 rounded-full transition-colors ${
          value === 'saddle' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-3 h-6 border-2 border-current" />
            <div className="w-3 h-6 border-2 border-current rounded-r-full border-l-0" />
          </div>
          <span className="font-medium">Khuôn Chữ U</span>
        </div>
      </button>
    </div>
  );
};

// Quick Select Chip Component
const QuickSelectChip: React.FC<{
  value: number;
  selected: boolean;
  onClick: () => void;
}> = ({ value, selected, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-mono text-sm whitespace-nowrap transition-all ${
        selected
          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
      }`}
    >
      {value}
    </motion.button>
  );
};

// Parameter Input Card Component
const ParameterInputCard: React.FC<{
  label: string;
  unit: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
  icon: React.ReactNode;
}> = ({ label, unit, value, options, onChange, icon }) => {
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
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="text-cyan-400">{icon}</div>
            <span className="text-sm text-gray-400 font-medium">{label}</span>
          </div>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing) setTempValue(value.toString());
            }}
            className="text-gray-500 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        
        {isEditing ? (
          <div className="mb-3">
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
              className="w-full bg-gray-900 text-white text-2xl font-mono font-bold px-3 py-2 rounded-lg border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              autoFocus
            />
          </div>
        ) : (
          <div className="mb-3">
            <div className="text-3xl font-mono font-bold text-white">
              {value}
              <span className="text-lg text-cyan-400 ml-1">{unit}</span>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
};

// Result Card with Counter Animation
const ResultCard: React.FC<{
  label: string;
  value: number;
  unit: string;
  color: 'cyan' | 'yellow';
  delay?: number;
}> = ({ label, value, unit, color, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50 shadow-cyan-500/20',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 shadow-yellow-500/20'
  };

  const textColor = color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-2xl p-6 border shadow-lg`}
    >
      <div className="text-sm text-gray-400 font-medium mb-2">{label}</div>
      <div className={`text-5xl font-mono font-bold ${textColor} mb-1`}>
        {displayValue.toFixed(2)}
      </div>
      <div className="text-sm text-gray-500">{unit}</div>
    </motion.div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function PUCalculator() {
  const [moldType, setMoldType] = useState<MoldType>('circular');
  const [thickness, setThickness] = useState(30);
  const [outerDiameter, setOuterDiameter] = useState(42);
  const [length, setLength] = useState(200);
  const [density, setDensity] = useState(150);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const handleCalculate = () => {
    const params: CalculationParams = {
      moldType,
      thickness,
      outerDiameter,
      length,
      density
    };

    const calcResult = calculate(params);
    setResult(calcResult);
  };

  const loadPreset = (preset: Preset) => {
    setThickness(preset.thickness);
    setOuterDiameter(preset.outerDiameter);
    setLength(preset.length);
    setShowPresets(false);
  };

  const currentPresets = moldType === 'circular' ? CIRCULAR_PRESETS : SADDLE_PRESETS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50 bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">PU Calculator</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPresets(!showPresets)}
              className={`p-2 rounded-lg transition-colors ${
                showPresets ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-gray-800/50'
              }`}
            >
              <Package className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${
                showSettings ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-gray-800/50'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <label className="block text-sm text-gray-400 mb-2">Tỷ trọng (kg/m³)</label>
              <input
                type="number"
                value={density}
                onChange={(e) => setDensity(parseFloat(e.target.value))}
                className="w-full max-w-xs bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presets Panel */}
      <AnimatePresence>
        {showPresets && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <h3 className="text-sm text-gray-400 mb-3">Khuôn Thường Dùng</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {currentPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset)}
                    className="bg-gray-800 hover:bg-gray-700 text-left p-3 rounded-lg border border-gray-700 transition-all hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="font-mono text-sm text-cyan-400 mb-1">{preset.name}</div>
                    <div className="text-xs text-gray-500">
                      T:{preset.thickness} OD:{preset.outerDiameter} L:{preset.length}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Golden Ratio Layout */}
      <div className="container mx-auto px-4 py-6 min-h-[calc(100vh-73px)] flex flex-col">
        {/* Input Area - 61.8% */}
        <div className="flex-[618] flex flex-col gap-6 pb-6">
          {/* Mold Type Selector */}
          <SegmentedControl value={moldType} onChange={setMoldType} />

          {/* Parameter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            <ParameterInputCard
              label="Độ dày"
              unit="mm"
              value={thickness}
              options={THICKNESS_OPTIONS}
              onChange={setThickness}
              icon={<div className="w-5 h-1 bg-current rounded-full" />}
            />
            <ParameterInputCard
              label="Đường kính ngoài"
              unit="mm"
              value={outerDiameter}
              options={OD_OPTIONS}
              onChange={setOuterDiameter}
              icon={<div className="w-5 h-5 border-2 border-current rounded-full" />}
            />
            <ParameterInputCard
              label="Chiều dài"
              unit="mm"
              value={length}
              options={LENGTH_OPTIONS}
              onChange={setLength}
              icon={<div className="w-5 h-2 bg-current" />}
            />
          </div>

          {/* Calculate Button - At Golden Ratio Point */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all flex items-center justify-center gap-3"
          >
            <Zap className="w-6 h-6" />
            TÍNH TOÁN
          </motion.button>
        </div>

        {/* Result Area - 38.2% */}
        <div className="flex-[382] flex flex-col">
          {result ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard
                label="POLYOL (Part A)"
                value={result.polyol}
                unit="kg"
                color="cyan"
                delay={0}
              />
              <ResultCard
                label="ISOCYANATE (Part B)"
                value={result.isocyanate}
                unit="kg"
                color="yellow"
                delay={100}
              />
              
              {/* Additional Info */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-gray-500 mb-1">Diện tích</div>
                  <div className="font-mono text-white">{result.area} m²</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-gray-500 mb-1">Thể tích</div>
                  <div className="font-mono text-white">{result.volume} m³</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-gray-500 mb-1">KL Thành phẩm</div>
                  <div className="font-mono text-white">{result.finishedMass} kg</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-gray-500 mb-1">KL Cần dùng</div>
                  <div className="font-mono text-white">{result.requiredMass} kg</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              <div className="text-center">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Nhập thông số và nhấn TÍNH TOÁN</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}