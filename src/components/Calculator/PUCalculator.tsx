'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Database, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { MoldType, CalculationParams, CalculationResult } from '@/lib/types';
import { calculate } from '@/lib/calculations';
import { DN_OD_MAP, getAvailableThicknesses, getAvailableLengths } from '@/lib/referenceData';

import Header from './Header';
import SegmentedControl from './SegmentedControl';
import DNSelector from './DNSelector';
import ResultCard from './ResultCard';
import ReferenceTable from './ReferenceTable';

export default function PUCalculator() {
  // Input states
  const [moldType, setMoldType] = useState<MoldType>('tron');
  const [selectedDN, setSelectedDN] = useState('DN50');
  const [outerDiameter, setOuterDiameter] = useState(60);
  const [thickness, setThickness] = useState(50);
  const [length, setLength] = useState(1200);
  const [density, setDensity] = useState(150);
  const [lossRate, setLossRate] = useState(0); // 0-100 display, stored as 0-1
  const [useAutoDensity, setUseAutoDensity] = useState(true);

  // Result state
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // UI states
  const [showTable, setShowTable] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Available options based on current selection
  const availableThicknesses = useMemo(
    () => getAvailableThicknesses(moldType, outerDiameter),
    [moldType, outerDiameter]
  );
  
  const availableLengths = useMemo(
    () => getAvailableLengths(moldType, outerDiameter, thickness),
    [moldType, outerDiameter, thickness]
  );

  // Handle mold type change
  const handleMoldTypeChange = useCallback((type: MoldType) => {
    setMoldType(type);
    setResult(null);
  }, []);

  // Handle DN change
  const handleDNChange = useCallback((dn: string) => {
    setSelectedDN(dn);
    setResult(null);
  }, []);

  // Handle OD change from DN selector
  const handleODChange = useCallback((od: number) => {
    setOuterDiameter(od);
    setResult(null);
  }, []);

  // Calculate
  const handleCalculate = useCallback(() => {
    const params: CalculationParams = {
      moldType,
      dn: selectedDN,
      outerDiameter,
      thickness,
      length,
      density,
      lossRate: lossRate / 100,
      useAutoDensity,
    };
    const calcResult = calculate(params);
    setResult(calcResult);
    
    // On mobile, scroll to results
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [moldType, selectedDN, outerDiameter, thickness, length, density, lossRate, useAutoDensity]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <Header />

      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ===== LEFT COLUMN: Calculator Inputs ===== */}
          <div className="w-full lg:w-[42%] space-y-4">
            {/* Mold Type Selector */}
            <SegmentedControl value={moldType} onChange={handleMoldTypeChange} />

            {/* DN Selector */}
            <div className="surface rounded-2xl p-4 space-y-4">
              <DNSelector
                moldType={moldType}
                selectedDN={selectedDN}
                onDNChange={handleDNChange}
                onODChange={handleODChange}
              />

              {/* OD Override */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
                  Đường kính ngoài (OD)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={outerDiameter}
                    onChange={(e) => {
                      setOuterDiameter(parseFloat(e.target.value) || 0);
                      setResult(null);
                    }}
                    className="flex-1 rounded-lg px-4 py-3 text-white font-mono font-semibold text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ background: '#12121f', border: '1px solid #2d2d4a' }}
                    min="10"
                    max="500"
                  />
                  <span className="text-sm font-medium" style={{ color: '#5e19e6' }}>mm</span>
                </div>
              </div>

              {/* Thickness */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
                  Chiều dày
                </label>
                <input
                  type="number"
                  value={thickness}
                  onChange={(e) => {
                    setThickness(parseFloat(e.target.value) || 0);
                    setResult(null);
                  }}
                  className="w-full rounded-lg px-4 py-3 text-white font-mono font-semibold text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ background: '#12121f', border: '1px solid #2d2d4a' }}
                  min="10"
                  max="200"
                />
                {/* Quick select chips */}
                {availableThicknesses.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {availableThicknesses.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setThickness(t); setResult(null); }}
                        className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                        style={{
                          background: thickness === t ? '#5e19e6' : '#12121f',
                          color: thickness === t ? '#fff' : '#94A3B8',
                          border: `1px solid ${thickness === t ? '#5e19e6' : '#2d2d4a'}`,
                        }}
                      >
                        {t}mm
                      </button>
                    ))}
                  </div>
                )}
                <span className="text-xs" style={{ color: '#5e19e6' }}>mm</span>
              </div>

              {/* Length */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
                  Chiều dài
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => {
                    setLength(parseFloat(e.target.value) || 0);
                    setResult(null);
                  }}
                  className="w-full rounded-lg px-4 py-3 text-white font-mono font-semibold text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ background: '#12121f', border: '1px solid #2d2d4a' }}
                  min="100"
                  max="3000"
                />
                {/* Quick select chips */}
                {availableLengths.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {availableLengths.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLength(l); setResult(null); }}
                        className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                        style={{
                          background: length === l ? '#5e19e6' : '#12121f',
                          color: length === l ? '#fff' : '#94A3B8',
                          border: `1px solid ${length === l ? '#5e19e6' : '#2d2d4a'}`,
                        }}
                      >
                        {l}mm
                      </button>
                    ))}
                  </div>
                )}
                <span className="text-xs" style={{ color: '#5e19e6' }}>mm</span>
              </div>
            </div>

            {/* Advanced Settings (Density & Loss Rate) */}
            <div className="surface rounded-2xl overflow-hidden">
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium"
                style={{ color: '#94A3B8' }}
              >
                <span>Cài đặt nâng cao</span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: '#2d2d4a' }}>
                      {/* Auto Density Toggle */}
                      <div className="flex items-center justify-between pt-3">
                        <div>
                          <label className="text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
                            Tỉ trọng tự động
                          </label>
                          <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                            Dùng tỉ trọng thực nghiệm theo loại khuôn + OD
                          </p>
                        </div>
                        <button
                          onClick={() => { setUseAutoDensity(!useAutoDensity); setResult(null); }}
                          className="relative w-12 h-6 rounded-full transition-colors"
                          style={{ background: useAutoDensity ? '#5e19e6' : '#2d2d4a' }}
                        >
                          <div
                            className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                            style={{ left: useAutoDensity ? '26px' : '2px' }}
                          />
                        </button>
                      </div>

                      {/* Manual Density Slider (only when auto is OFF) */}
                      {!useAutoDensity && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
                              Tỉ trọng thủ công
                            </label>
                            <span className="text-sm font-mono font-semibold" style={{ color: '#5e19e6' }}>
                              {density} kg/m³
                            </span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="250"
                            step="1"
                            value={density}
                            onChange={(e) => { setDensity(parseInt(e.target.value)); setResult(null); }}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs" style={{ color: '#64748b' }}>
                            <span>30</span>
                            <span>Mặc định: 150 kg/m³</span>
                            <span>250</span>
                          </div>
                        </div>
                      )}

                      {/* Loss Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
                            Hao hụt
                          </label>
                          <span className="text-sm font-mono font-semibold" style={{ color: '#e8d5a3' }}>
                            {lossRate}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          step="1"
                          value={lossRate}
                          onChange={(e) => { setLossRate(parseInt(e.target.value)); setResult(null); }}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs" style={{ color: '#64748b' }}>
                          <span>0%</span>
                          <span>Tỉ lệ hao hụt khi đổ khuôn</span>
                          <span>30%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Calculate Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              className="btn-primary w-full py-4 rounded-xl text-lg flex items-center justify-center gap-3"
            >
              <Zap className="w-6 h-6" />
              TÍNH TOÁN
            </motion.button>
          </div>

          {/* ===== RIGHT COLUMN: Results & Reference ===== */}
          <div className="w-full lg:w-[58%] space-y-4" id="results-section">
            {/* Results */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Method Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      result.calculationMethod === 'lookup' ? 'badge-lookup' : 'badge-calculated'
                    }`}>
                      {result.calculationMethod === 'lookup' ? (
                        <><Database className="w-3 h-3" /> Tra bảng</>
                      ) : (
                        <><Cpu className="w-3 h-3" /> Tính toán</>
                      )}
                    </span>
                    {lossRate > 0 && (
                      <span className="text-xs" style={{ color: '#e8d5a3' }}>
                        +{lossRate}% hao hụt
                      </span>
                    )}
                  </div>

                  {/* Main Results */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <ResultCard 
                      label="KL POLYOL" 
                      value={result.polyol} 
                      unit="kg" 
                      color="purple" 
                      delay={0} 
                    />
                    <ResultCard 
                      label="KL ISOCYANATE" 
                      value={result.isocyanate} 
                      unit="kg" 
                      color="gold" 
                      delay={100}
                    />
                  </div>

                  {/* Detail Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="surface rounded-xl p-3">
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>Thể tích</div>
                      <div className="font-mono text-sm font-semibold text-white">
                        {(result.volume * 1000000).toFixed(0)} cm³
                      </div>
                    </div>
                    <div className="surface rounded-xl p-3">
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>Tỉ trọng</div>
                      <div className="font-mono text-sm font-semibold text-white">
                        {result.appliedDensity} kg/m³
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                        {result.densitySource === 'reference' ? '📊 Từ bảng' : result.densitySource === 'auto' ? '🤖 Tự động' : '✏️ Thủ công'}
                      </div>
                    </div>
                    <div className="surface rounded-xl p-3">
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>Poly gốc</div>
                      <div className="font-mono text-sm font-semibold" style={{ color: '#a78bfa' }}>
                        {result.basePoly} kg
                      </div>
                    </div>
                    <div className="surface rounded-xl p-3">
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>ISO gốc</div>
                      <div className="font-mono text-sm font-semibold" style={{ color: '#e8d5a3' }}>
                        {result.baseIso} kg
                      </div>
                    </div>
                  </div>

                  {/* Params Summary */}
                  <div className="surface rounded-xl p-3 mb-4">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: '#94A3B8' }}>
                      <span>Khuôn: <b className="text-white">{moldType === 'tron' ? 'Tròn' : 'Vuông'}</b></span>
                      <span>{selectedDN} <b className="text-white">OD {outerDiameter}mm</b></span>
                      <span>Dày: <b className="text-white">{thickness}mm</b></span>
                      <span>Dài: <b className="text-white">{length}mm</b></span>
                      <span>Tỉ trọng: <b className="text-white">{result.appliedDensity} kg/m³</b> <span style={{ color: '#64748b' }}>({result.densitySource === 'reference' ? 'bảng' : result.densitySource === 'auto' ? 'tự động' : 'thủ công'})</span></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Welcome message when no results */}
            {!result && (
              <div className="surface rounded-2xl p-8 text-center" style={{ minHeight: 200 }}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" 
                  style={{ background: 'rgba(94, 25, 230, 0.1)', border: '1px solid rgba(94, 25, 230, 0.2)' }}>
                  <Zap className="w-8 h-8" style={{ color: '#5e19e6' }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Chọn thông số và bấm Tính Toán</h3>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Kết quả sẽ hiển thị ở đây. Ưu tiên tra bảng dữ liệu thực tế, 
                  nếu không có sẽ tự động tính theo công thức.
                </p>
              </div>
            )}

            {/* Reference Data Table */}
            <div>
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-between surface rounded-xl px-4 py-3 mb-2 surface-hover"
              >
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <Database className="w-4 h-4" style={{ color: '#5e19e6' }} />
                  Bảng dữ liệu tham chiếu ({moldType === 'tron' ? 'Tròn' : 'Vuông'})
                </span>
                {showTable ? <ChevronUp className="w-4 h-4" style={{ color: '#94A3B8' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#94A3B8' }} />}
              </button>
              <AnimatePresence>
                {showTable && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ReferenceTable
                      moldType={moldType}
                      currentOD={outerDiameter}
                      currentThickness={thickness}
                      currentLength={length}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}