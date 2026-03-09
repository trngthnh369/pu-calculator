import { CalculationParams, CalculationResult } from './types';
import { lookupReference } from './referenceData';

/**
 * Smart density config derived from reverse-engineering reference data.
 * 
 * IMPORTANT: These are TOTAL PU foam densities (Poly + ISO combined).
 * Formula: Total_weight = Volume × density
 *          Poly = Total / 2.2  (ratio Poly:ISO = 1:1.2)
 *          ISO  = Poly × 1.2
 * 
 * Empirical total densities by mold type + OD range:
 *   tron-small(≤50mm):   ~130 kg/m³
 *   tron-med(51-100mm):  ~105 kg/m³
 *   tron-large(101-200): ~102 kg/m³
 *   tron-xlarge(>200):   ~103 kg/m³
 *   vuong-small(≤50mm):  ~124 kg/m³
 *   vuong-med(51-100mm): ~112 kg/m³
 *   vuong-large(101-200):~92 kg/m³
 *   vuong-xlarge(>200):  ~90 kg/m³
 */
interface SmartDensityConfig {
  effectiveDensity: number;  // kg/m³ total PU foam density
  description: string;
}

function getSmartDensity(moldType: 'tron' | 'vuong', od_mm: number): SmartDensityConfig {
  if (moldType === 'tron') {
    if (od_mm <= 50) {
      return { effectiveDensity: 130, description: 'Ống nhỏ (≤50mm) - Nén cao' };
    } else if (od_mm <= 100) {
      return { effectiveDensity: 105, description: 'Ống vừa (51-100mm)' };
    } else if (od_mm <= 200) {
      return { effectiveDensity: 102, description: 'Ống lớn (101-200mm)' };
    } else {
      return { effectiveDensity: 103, description: 'Ống rất lớn (>200mm)' };
    }
  } else {
    // vuong
    if (od_mm <= 50) {
      return { effectiveDensity: 124, description: 'Ống nhỏ (≤50mm) - Nén cao' };
    } else if (od_mm <= 100) {
      return { effectiveDensity: 112, description: 'Ống vừa (51-100mm)' };
    } else if (od_mm <= 200) {
      return { effectiveDensity: 92, description: 'Ống lớn (101-200mm)' };
    } else {
      return { effectiveDensity: 90, description: 'Ống rất lớn (>200mm)' };
    }
  }
}

// Poly:ISO weight ratio = 1:1.2, so total factor = 1 + 1.2 = 2.2
const POLY_ISO_TOTAL_FACTOR = 2.2;

/**
 * Calculate volume for round (Tròn) mold
 * Formula: V = π × ((OD/2 + T)² - (OD/2)²) × L
 */
function calculateVolumeRound(od_mm: number, thickness_mm: number, length_mm: number): number {
  const innerR_m = (od_mm / 2) / 1000;
  const outerR_m = (od_mm / 2 + thickness_mm) / 1000;
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
 * 1. Exact match → use reference data directly ("Tra bảng")
 * 2. No match → calculate using volume × density → split by ratio ("Tính toán")
 * 3. Apply loss rate on final result
 * 
 * CRITICAL: density = total PU foam density (Poly + ISO combined)
 *   Total = Volume × density
 *   Poly  = Total / 2.2  (because Poly:ISO = 1:1.2, total factor = 2.2)
 *   ISO   = Poly × 1.2
 */
export function calculate(params: CalculationParams): CalculationResult {
  const { moldType, outerDiameter, thickness, length, density, lossRate, useAutoDensity } = params;
  
  // Always calculate volume for display
  const volume = moldType === 'tron'
    ? calculateVolumeRound(outerDiameter, thickness, length)
    : calculateVolumeSquare(outerDiameter, thickness, length);
  
  // 1. Try exact match lookup
  const refEntry = lookupReference(moldType, outerDiameter, thickness, length);
  
  if (refEntry) {
    const basePoly = refEntry.polyKg;
    const baseIso = refEntry.isoKg;
    const polyol = basePoly * (1 + lossRate);
    const isocyanate = baseIso * (1 + lossRate);
    
    return {
      polyol: parseFloat(polyol.toFixed(2)),
      isocyanate: parseFloat(isocyanate.toFixed(2)),
      volume: parseFloat(volume.toFixed(6)),
      calculationMethod: 'lookup',
      basePoly,
      baseIso,
      appliedDensity: parseFloat(((basePoly + baseIso) / volume).toFixed(1)),
      densitySource: 'reference',
    };
  }
  
  // 2. No match → Calculate from formula
  // Determine which density to use
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
  
  // CORRECT FORMULA:
  // density is TOTAL PU foam density (Poly + ISO combined)
  // Total weight = Volume × density
  // Then split by ratio: Poly = Total / 2.2, ISO = Poly × 1.2
  const totalWeight = volume * appliedDensity;
  const basePoly = totalWeight / POLY_ISO_TOTAL_FACTOR;
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