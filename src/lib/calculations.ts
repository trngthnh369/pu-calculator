import { CalculationParams, CalculationResult } from './types';
import { lookupReference } from './referenceData';

/**
 * Hệ số K - reverse-engineered từ 136 dòng dữ liệu thực tế.
 * 
 * Công thức: Poly = V × density / K
 *            ISO  = Poly × 1.2
 * 
 * K bao gồm:
 *   1. Tỉ lệ Poly:ISO split (cơ bản = 2.2)
 *   2. Hiệu suất đổ khuôn (tăng theo chiều dày)
 * 
 * K tăng khi chiều dày tăng → foam dày giãn nở tốt hơn → cần ít nguyên liệu/m³ hơn.
 */

// K lookup tables: [thickness_mm, K_value]
const K_TABLE_TRON: [number, number][] = [
  [25, 2.34],
  [30, 2.70],
  [40, 2.90],
  [50, 3.21],
  [65, 3.35],   // interpolated
  [80, 3.50],   // interpolated
  [100, 3.63],
];

const K_TABLE_VUONG: [number, number][] = [
  [25, 2.56],
  [30, 2.81],
  [40, 2.93],
  [50, 3.57],
  [65, 3.60],   // interpolated
  [80, 3.65],   // interpolated
  [100, 3.67],
];

/**
 * Get K coefficient by interpolation for any thickness value.
 * For values outside the table range, clamp to nearest boundary.
 */
function getK(moldType: 'tron' | 'vuong', thickness_mm: number): number {
  const table = moldType === 'tron' ? K_TABLE_TRON : K_TABLE_VUONG;

  // Below minimum thickness
  if (thickness_mm <= table[0][0]) return table[0][1];
  // Above maximum thickness
  if (thickness_mm >= table[table.length - 1][0]) return table[table.length - 1][1];

  // Find the two surrounding entries and interpolate
  for (let i = 0; i < table.length - 1; i++) {
    const [t1, k1] = table[i];
    const [t2, k2] = table[i + 1];
    if (thickness_mm >= t1 && thickness_mm <= t2) {
      const ratio = (thickness_mm - t1) / (t2 - t1);
      return k1 + ratio * (k2 - k1);
    }
  }

  return table[table.length - 1][1]; // fallback
}

/**
 * Calculate volume for round (Tròn) mold
 * V = π × ((OD/2 + T)² - (OD/2)²) × L
 */
function calculateVolumeRound(od_mm: number, thickness_mm: number, length_mm: number): number {
  const innerR_m = (od_mm / 2) / 1000;
  const outerR_m = (od_mm / 2 + thickness_mm) / 1000;
  const length_m = length_mm / 1000;
  return Math.PI * (outerR_m * outerR_m - innerR_m * innerR_m) * length_m;
}

/**
 * Calculate volume for square (Vuông) mold
 * V = ((OD + 2T)² - π × (OD/2)²) × L
 */
function calculateVolumeSquare(od_mm: number, thickness_mm: number, length_mm: number): number {
  const squareSide_m = (od_mm + 2 * thickness_mm) / 1000;
  const holeRadius_m = (od_mm / 2) / 1000;
  const length_m = length_mm / 1000;
  return (squareSide_m * squareSide_m - Math.PI * holeRadius_m * holeRadius_m) * length_m;
}

/**
 * Main calculation function.
 * 
 * Strategy: Lookup-first, Calculate-fallback
 * 
 * 1. Exact match → use reference data ("Tra bảng")
 * 2. No match → calculate with K coefficient formula ("Tính toán"):
 *      Poly = V × density / K(thickness, moldType)
 *      ISO  = Poly × 1.2
 * 3. Apply loss rate on top
 */
export function calculate(params: CalculationParams): CalculationResult {
  const { moldType, outerDiameter, thickness, length, density, lossRate } = params;

  // Always calculate volume for display
  const volume = moldType === 'tron'
    ? calculateVolumeRound(outerDiameter, thickness, length)
    : calculateVolumeSquare(outerDiameter, thickness, length);

  // Get K coefficient for this thickness + mold type
  const K = getK(moldType, thickness);

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
      appliedDensity: density,
      kCoefficient: K,
    };
  }

  // 2. No match → Calculate with K coefficient
  // Poly = V × density / K
  // ISO  = Poly × 1.2
  const basePoly = volume * density / K;
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
    appliedDensity: density,
    kCoefficient: K,
  };
}