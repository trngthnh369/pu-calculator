/**
 * Type definitions for PU Calculator
 */

export type MoldType = 'circular' | 'saddle';

export interface CalculationParams {
  moldType: MoldType;
  thickness: number;      // mm
  outerDiameter: number;  // mm
  length: number;         // mm
  density: number;        // kg/m³
}

export interface CalculationResult {
  area: number;          // m² - 4 decimal places
  volume: number;        // m³ - 5 decimal places
  finishedMass: number;  // kg - 2 decimal places
  requiredMass: number;  // kg - 2 decimal places
  polyol: number;        // kg - 2 decimal places
  isocyanate: number;    // kg - 2 decimal places
}

export interface Preset {
  name: string;
  thickness: number;
  outerDiameter: number;
  length: number;
}

export interface PresetCategory {
  circular: Preset[];
  saddle: Preset[];
}