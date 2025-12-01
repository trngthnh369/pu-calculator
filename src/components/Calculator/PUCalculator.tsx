'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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
  const [thickness, setThickness] = useState(25);
  const [outerDiameter, setOuterDiameter] = useState(21);
  const [length, setLength] = useState(1200);
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
    <div className="min-h-screen flex flex-col text-white overscroll-none" style={{ background: '#0B1121' }}>
      {/* Header */}
      <Header
        onSettingsClick={() => setShowSettings(!showSettings)}
        onPresetsClick={() => setShowPresets(!showPresets)}
        showSettings={showSettings}
        showPresets={showPresets}
      />

      {/* Result overlay (appears after calculation) */}
        <AnimatePresence>
          {result && showResultOverlay && (
            <motion.div
              key="result-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
              onClick={() => setShowResultOverlay(false)}
            >
              <motion.div
                key="result-panel"
                className="max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.98, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 8 }}
                transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              >
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

                  <motion.div
                    className="grid grid-cols-2 gap-3 mb-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } }
                    } as Variants}
                  >
                    <ResultCard label="POLYOL" value={result.polyol} unit="kg" color="cyan" delay={0} valueClassName="text-4xl" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.44 } } }} />
                    <ResultCard label="ISOCYANATE" value={result.isocyanate} unit="kg" color="yellow" delay={100} valueClassName="text-4xl" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.44 } } }} />
                  </motion.div>

                  <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.36 }}>
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
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

      {/* Main Content - responsive layout, chiếm toàn bộ phần còn lại của màn hình */}
      <div className="container mx-auto px-[5%] pt-[1.5vh] pb-[1.5vh] flex-1 flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row gap-[3%] min-h-0">
          {/* Input Area (full width now that inline results are removed) */}
          <div className="flex-1 flex flex-col gap-[3%]">
            {/* Mold Type Selector */}
            <SegmentedControl value={moldType} onChange={setMoldType} />

            {/* Parameter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5%] flex-1 py-[1vh]">
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
              className="w-full py-[2.5vh] rounded-full font-bold text-xl flex items-center justify-center gap-3 glow-cyan-strong"
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