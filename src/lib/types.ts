/**
 * Type definitions for PU Calculator
 */

export type MoldType = 'tron' | 'vuong';

export interface CalculationParams {
  moldType: MoldType;
  dn?: string;            // DN pipe size, e.g. 'DN50'
  outerDiameter: number;  // mm (OD)
  thickness: number;      // mm
  length: number;         // mm
  density: number;        // kg/m³ - tỉ trọng PU foam (mặc định 150)
  lossRate: number;       // 0-1 range (e.g. 0.1 = 10%)
}

export interface CalculationResult {
  polyol: number;          // kg (after loss rate)
  isocyanate: number;      // kg (after loss rate)
  volume: number;          // m³
  calculationMethod: 'lookup' | 'calculated';
  basePoly: number;        // kg (before loss rate)
  baseIso: number;         // kg (before loss rate)
  appliedDensity: number;  // kg/m³ - density used
  kCoefficient: number;    // K coefficient applied
}