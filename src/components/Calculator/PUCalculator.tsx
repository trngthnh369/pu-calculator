'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap } from 'lucide-react';
import { MoldType, CalculationParams, CalculationResult, Preset } from '@/lib/types';
import { calculate } from '@/lib/calculations';
import { 
  CIRCULAR_PRESETS, 
  SADDLE_PRESETS,
  THICKNESS_OPTIONS,
  OD_OPTIONS,
  LENGTH_OPTIONS 
} from '@/lib/presets';

// Import components
import Header from './Header';
import SegmentedControl from './SegmentedControl';
import ParameterInputCard from './ParameterInputCard';
import ResultCard from './ResultCard';
import SettingsPanel from './SettingsPanel';
import PresetsPanel from './PresetsPanel';
import { ThicknessIcon, DiameterIcon, LengthIcon } from '@/components/ui/Icons';

export default function PUCalculator() {
  // States
  const [moldType, setMoldType] = useState<MoldType>('circular');
  const [thickness, setThickness] = useState(30);
  const [outerDiameter, setOuterDiameter] = useState(42);
  const [length, setLength] = useState(200);
  const [density, setDensity] = useState(150);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  // Handlers
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
      <Header
        onSettingsClick={() => setShowSettings(!showSettings)}
        onPresetsClick={() => setShowPresets(!showPresets)}
        showSettings={showSettings}
        showPresets={showPresets}
      />

      {/* Settings Panel */}
      <SettingsPanel
        show={showSettings}
        density={density}
        onDensityChange={setDensity}
      />

      {/* Presets Panel */}
      <PresetsPanel
        show={showPresets}
        presets={currentPresets}
        onSelectPreset={loadPreset}
      />

      {/* Main Content - Golden Ratio Layout */}
      <div className="container mx-auto px-6 py-8 min-h-[calc(100vh-89px)] flex flex-col gap-8">
        {/* Input Area - 61.8% */}
        <div className="flex-[618] flex flex-col gap-6">
          {/* Mold Type Selector */}
          <SegmentedControl value={moldType} onChange={setMoldType} />

          {/* Parameter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
            <ParameterInputCard
              label="Độ dày"
              unit="mm"
              value={thickness}
              options={THICKNESS_OPTIONS}
              onChange={setThickness}
              icon={<ThicknessIcon />}
            />
            <ParameterInputCard
              label="Đường kính ngoài"
              unit="mm"
              value={outerDiameter}
              options={OD_OPTIONS}
              onChange={setOuterDiameter}
              icon={<DiameterIcon />}
            />
            <ParameterInputCard
              label="Chiều dài"
              unit="mm"
              value={length}
              options={LENGTH_OPTIONS}
              onChange={setLength}
              icon={<LengthIcon />}
            />
          </div>

          {/* Calculate Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full font-bold text-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Zap className="w-7 h-7" />
            TÍNH TOÁN
          </motion.button>
        </div>

        {/* Result Area - 38.2% */}
        <div className="flex-[382] flex flex-col min-h-0">
          {result ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
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
              <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                >
                  <div className="text-gray-500 mb-1.5 text-xs">Diện tích</div>
                  <div className="font-mono text-white text-lg font-semibold">{result.area} m²</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                >
                  <div className="text-gray-500 mb-1.5 text-xs">Thể tích</div>
                  <div className="font-mono text-white text-lg font-semibold">{result.volume} m³</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                >
                  <div className="text-gray-500 mb-1.5 text-xs">KL Thành phẩm</div>
                  <div className="font-mono text-white text-lg font-semibold">{result.finishedMass} kg</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                >
                  <div className="text-gray-500 mb-1.5 text-xs">KL Cần dùng</div>
                  <div className="font-mono text-white text-lg font-semibold">{result.requiredMass} kg</div>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <Calculator className="w-20 h-20 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Nhập thông số và nhấn TÍNH TOÁN</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}