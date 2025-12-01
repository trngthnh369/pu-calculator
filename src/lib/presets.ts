import { Preset } from './types';

/**
 * Preset configurations for common molds
 */

export const CIRCULAR_PRESETS: Preset[] = [
  { name: 'DN20-T25-L100', thickness: 25, outerDiameter: 21, length: 100 },
  { name: 'DN25-T30-L150', thickness: 30, outerDiameter: 27, length: 150 },
  { name: 'DN32-T35-L200', thickness: 35, outerDiameter: 34, length: 200 },
  { name: 'DN40-T40-L250', thickness: 40, outerDiameter: 42, length: 250 },
  { name: 'DN50-T45-L300', thickness: 45, outerDiameter: 49, length: 300 },
  { name: 'DN65-T50-L350', thickness: 50, outerDiameter: 60, length: 350 },
];

export const SADDLE_PRESETS: Preset[] = [
  { name: 'U-DN20-T30-L120', thickness: 30, outerDiameter: 21, length: 120 },
  { name: 'U-DN25-T35-L180', thickness: 35, outerDiameter: 27, length: 180 },
  { name: 'U-DN32-T40-L220', thickness: 40, outerDiameter: 34, length: 220 },
  { name: 'U-DN40-T45-L280', thickness: 45, outerDiameter: 42, length: 280 },
  { name: 'U-DN50-T50-L320', thickness: 50, outerDiameter: 49, length: 320 },
  { name: 'U-DN65-T55-L380', thickness: 55, outerDiameter: 60, length: 380 },
];

// Quick select options
export const THICKNESS_OPTIONS = [25, 30, 40, 50];
export const OD_OPTIONS = [21, 27, 34, 42, 49, 60.3, 76, 90];
export const LENGTH_OPTIONS = [1200]; 