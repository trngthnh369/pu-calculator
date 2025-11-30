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
    <div className="min-h-screen text-white" style={{ background: '#0B1121' }}>
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
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-140px)]">
          {/* Input Area - 61.8% */}
          <div className="flex-[1.618] flex flex-col gap-6">
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              className="w-full py-6 rounded-full font-bold text-xl flex items-center justify-center gap-3 glow-cyan-strong"
              style={{
                background: 'linear-gradient(to right, #00E5FF, #00B8D4)',
                color: '#0B1121'
              }}
>
              <Zap className="w-7 h-7" />
              TÍNH TOÁN
            </motion.button>
          </div>

          {/* Result Area - 38.2% */}
          <div className="flex-[1] flex flex-col gap-5">
            {result ? (
              <>
                <ResultCard
                  label="POLYOL (PART A)"
                  value={result.polyol}
                  unit="kg"
                  color="cyan"
                  delay={0}
                />
                <ResultCard
                  label="ISOCYANATE (PART B)"
                  value={result.isocyanate}
                  unit="kg"
                  color="yellow"
                  delay={100}
                />
                
                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl p-4 border"
                    style={{
                      background: '#151E32',
                      borderColor: '#2A3B55'
                    }}
>
                    <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>
                      DIỆN TÍCH
                    </div>
                    <div className="font-mono text-white text-lg font-bold">{result.area} m²</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-xl p-4 border"
                    style={{
                      background: '#151E32',
                      borderColor: '#2A3B55'
                    }}
>
                    <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>
                      THỂ TÍCH
                    </div>
                    <div className="font-mono text-white text-lg font-bold">{result.volume} m³</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl p-4 border"
                    style={{
                      background: '#151E32',
                      borderColor: '#2A3B55'
                    }}
>
                    <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>
                      KL THÀNH PHẨM
                    </div>
                    <div className="font-mono text-white text-lg font-bold">{result.finishedMass} kg</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="rounded-xl p-4 border"
                    style={{
                      background: '#151E32',
                      borderColor: '#2A3B55'
                    }}
>
                    <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>
                      KL CẦN DÙNG
                    </div>
                    <div className="font-mono text-white text-lg font-bold">{result.requiredMass} kg</div>
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                  style={{ color: '#2A3B55' }}>
                  <Calculator className="w-20 h-20 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Nhập thông số và nhấn TÍNH TOÁN</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}