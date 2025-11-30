'use client';

import React, { useState, useEffect } from 'react';
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
    setShowResultOverlay(true);
  };

  // Show result overlay after calculation so users don't need to scroll
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (showResultOverlay) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return;
  }, [showResultOverlay]);

  // Close overlay on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowResultOverlay(false);
    };
    if (showResultOverlay) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return;
  }, [showResultOverlay]);

  const loadPreset = (preset: Preset) => {
    setThickness(preset.thickness);
    setOuterDiameter(preset.outerDiameter);
    setLength(preset.length);
    setShowPresets(false);
  };

  const currentPresets = moldType === 'circular' ? CIRCULAR_PRESETS : SADDLE_PRESETS;

  return (
    <div className="min-h-screen text-white overscroll-none" style={{ background: '#0B1121' }}>
      {/* Header */}
      <Header
        onSettingsClick={() => setShowSettings(!showSettings)}
        onPresetsClick={() => setShowPresets(!showPresets)}
        showSettings={showSettings}
        showPresets={showPresets}
      />

      {/* Result overlay (appears after calculation) */}
      {result && showResultOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setShowResultOverlay(false)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#0B1121] rounded-2xl p-6 border" style={{ borderColor: '#2A3B55' }}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-lg font-semibold">Kết quả</div>
                <button
                  onClick={() => setShowResultOverlay(false)}
                  className="p-2 rounded-md"
                  style={{ color: '#94A3B8' }}
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <ResultCard label="POLYOL (PART A)" value={result.polyol} unit="kg" color="cyan" delay={0} valueClassName="text-4xl" />
                <ResultCard label="ISOCYANATE (PART B)" value={result.isocyanate} unit="kg" color="yellow" delay={100} valueClassName="text-4xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-4 border" style={{ background: '#151E32', borderColor: '#2A3B55' }}>
                  <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>DIỆN TÍCH</div>
                  <div className="font-mono text-white text-lg font-bold">{result.area} m²</div>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: '#151E32', borderColor: '#2A3B55' }}>
                  <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>THỂ TÍCH</div>
                  <div className="font-mono text-white text-lg font-bold">{result.volume} m³</div>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: '#151E32', borderColor: '#2A3B55' }}>
                  <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>KL THÀNH PHẨM</div>
                  <div className="font-mono text-white text-lg font-bold">{result.finishedMass} kg</div>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: '#151E32', borderColor: '#2A3B55' }}>
                  <div className="text-xs uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>KL CẦN DÙNG</div>
                  <div className="font-mono text-white text-lg font-bold">{result.requiredMass} kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className="flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Input Area (full width now that inline results are removed) */}
          <div className="flex-1 flex flex-col gap-6">
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

          {/* Inline result panel removed — results now appear only in the overlay */}
        </div>
      </div>
    </div>
  );
}