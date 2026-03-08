import { CalculationParams, CalculationResult } from './types';
import { lookupReference } from './referenceData';

/**
 * Empirical density config derived from reverse-engineering reference data.
 * 
 * Analysis method: For each reference entry, compute:
 *   empirical_density = polyKg / theoretical_volume
 * Then group by moldType + OD range and average.
 * 
 * Results:
 *   tron-small(≤50mm):   ~59 kg/m³
 *   tron-med(51-100mm):  ~48 kg/m³
 *   tron-large(101-200): ~46 kg/m³
 *   tron-xlarge(>200):   ~47 kg/m³
 *   vuong-small(≤50mm):  ~56 kg/m³
 *   vuong-med(51-100mm): ~51 kg/m³
 *   vuong-large(101-200):~42 kg/m³
 *   vuong-xlarge(>200):  ~41 kg/m³
 * 
 * These effective densities capture all real-world factors:
 * foam expansion, mold geometry, pouring technique, waste.
 */
interface SmartDensityConfig {
  effectiveDensity: number;  // kg/m³ - already includes all factors
  description: string;
}

function getSmartDensity(moldType: 'tron' | 'vuong', od_mm: number): SmartDensityConfig {
  if (moldType === 'tron') {
    if (od_mm <= 50) {
      return { effectiveDensity: 59, description: 'Ống nhỏ (≤50mm) - Nén cao' };
    } else if (od_mm <= 100) {
      return { effectiveDensity: 48, description: 'Ống vừa (51-100mm)' };
    } else if (od_mm <= 200) {
      return { effectiveDensity: 46, description: 'Ống lớn (101-200mm)' };
    } else {
      return { effectiveDensity: 47, description: 'Ống rất lớn (>200mm)' };
    }
  } else {
    // vuong
    if (od_mm <= 50) {
      return { effectiveDensity: 56, description: 'Ống nhỏ (≤50mm) - Nén cao' };
    } else if (od_mm <= 100) {
      return { effectiveDensity: 51, description: 'Ống vừa (51-100mm)' };
    } else if (od_mm <= 200) {
      return { effectiveDensity: 42, description: 'Ống lớn (101-200mm)' };
    } else {
      return { effectiveDensity: 41, description: 'Ống rất lớn (>200mm)' };
    }
  }
}

/**
 * Calculate volume for round (Tròn) mold
 * Formula: V = π × ((OD/2 + T)² - (OD/2)²) × L
 */
function calculateVolumeRound(od_mm: number, thickness_mm: number, length_mm: number): number {
  const innerR = od_mm / 2;
  const outerR = innerR + thickness_mm;
  const innerR_m = innerR / 1000;
  const outerR_m = outerR / 1000;
  const length_m = length_mm / 1000;
  return Math.PI * (outerR_m * outerR_m - innerR_m * innerR_m) * length_m;
}

/**
 * Calculate volume for square (Vuông) mold
 * Formula: V = ((OD + 2T)² - π × (OD/2)²) × L
 */
function calculateVolumeSquare(od_mm: number, thickness_mm: number, length_mm: number): number {
  const squareSide_m = (od_mm + 2 * thickness_mm) / 1000;
  const holeRadius_m = (od_mm / 2) / 1000;
  const length_m = length_mm / 1000;
  return (squareSide_m * squareSide_m - Math.PI * holeRadius_m * holeRadius_m) * length_m;
}

/**
 * Main calculation function
 * Strategy: Lookup-first, Calculate-fallback with smart density
 * 
 * 1. Exact match in reference data → "Tra bảng" (use real production values)
 * 2. No match → calculate with empirical density per mold type + OD range → "Tính toán"
 * 3. Apply loss rate on top of result
 * 
 * When using manual density (user override), the user's density is used directly.
 * When using auto density (default), the empirical density from reference data analysis is used.
 */
export function calculate(params: CalculationParams): CalculationResult {
  const { moldType, outerDiameter, thickness, length, density, lossRate, useAutoDensity } = params;
  
  // 1. Try exact match lookup
  const refEntry = lookupReference(moldType, outerDiameter, thickness, length);
  
  if (refEntry) {
    const basePoly = refEntry.polyKg;
    const baseIso = refEntry.isoKg;
    const polyol = basePoly * (1 + lossRate);
    const isocyanate = baseIso * (1 + lossRate);
    
    const volume = moldType === 'tron'
      ? calculateVolumeRound(outerDiameter, thickness, length)
      : calculateVolumeSquare(outerDiameter, thickness, length);
    
    return {
      polyol: parseFloat(polyol.toFixed(2)),
      isocyanate: parseFloat(isocyanate.toFixed(2)),
      volume: parseFloat(volume.toFixed(6)),
      calculationMethod: 'lookup',
      basePoly,
      baseIso,
      appliedDensity: parseFloat((basePoly / volume).toFixed(1)),
      densitySource: 'reference',
    };
  }
  
  // 2. No match → Calculate from formula
  const volume = moldType === 'tron'
    ? calculateVolumeRound(outerDiameter, thickness, length)
    : calculateVolumeSquare(outerDiameter, thickness, length);
  
  // Use smart density (auto) or manual density
  let appliedDensity: number;
  let densitySource: 'auto' | 'manual';
  
  if (useAutoDensity) {
    const config = getSmartDensity(moldType, outerDiameter);
    appliedDensity = config.effectiveDensity;
    densitySource = 'auto';
  } else {
    appliedDensity = density;
    densitySource = 'manual';
  }
  
  const basePoly = volume * appliedDensity;
  const baseIso = basePoly * 1.2;
  
  const polyol = basePoly * (1 + lossRate);
  const isocyanate = baseIso * (1 + lossRate);
  
  return {
    polyol: parseFloat(polyol.toFixed(2)),
    isocyanate: parseFloat(isocyanate.toFixed(2)),
    volume: parseFloat(volume.toFixed(6)),
    calculationMethod: 'calculated',
    basePoly: parseFloat(basePoly.toFixed(2)),
    baseIso: parseFloat(baseIso.toFixed(2)),
    appliedDensity,
    densitySource,
  };
}