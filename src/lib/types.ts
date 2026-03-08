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
  density: number;        // kg/m³ (manual density, used when useAutoDensity=false)
  lossRate: number;       // 0-1 range (e.g. 0.1 = 10%)
  useAutoDensity: boolean; // true = use smart density from reference data analysis
}

export interface CalculationResult {
  polyol: number;          // kg (after loss rate)
  isocyanate: number;      // kg (after loss rate)
  volume: number;          // m³
  calculationMethod: 'lookup' | 'calculated';
  basePoly: number;        // kg (before loss rate)
  baseIso: number;         // kg (before loss rate)
  appliedDensity: number;  // kg/m³ - actual density used
  densitySource: 'reference' | 'auto' | 'manual';
}