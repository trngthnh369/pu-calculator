/**
 * Reference data from real production measurements
 * Source: CSV dataset with 136 entries for Tròn (round) and Vuông (square) molds
 */

export interface ReferenceEntry {
  stt: number;
  moldType: 'tron' | 'vuong';
  dn: string;
  od: number;       // mm
  thickness: number; // mm
  length: number;    // mm
  polyKg: number;    // kg
  isoKg: number;     // kg
}

/**
 * Full reference dataset from real production
 */
export const REFERENCE_DATA: ReferenceEntry[] = [
  // === TRÒN (Round) ===
  { stt: 1, moldType: 'tron', dn: 'DN15', od: 21, thickness: 25, length: 1200, polyKg: 0.3, isoKg: 0.36 },
  { stt: 2, moldType: 'tron', dn: 'DN20', od: 27, thickness: 25, length: 1200, polyKg: 0.3, isoKg: 0.36 },
  { stt: 4, moldType: 'tron', dn: 'DN25', od: 34, thickness: 25, length: 1200, polyKg: 0.35, isoKg: 0.42 },
  { stt: 6, moldType: 'tron', dn: 'DN32', od: 42, thickness: 25, length: 1200, polyKg: 0.4, isoKg: 0.48 },
  { stt: 8, moldType: 'tron', dn: 'DN40', od: 49, thickness: 25, length: 1200, polyKg: 0.45, isoKg: 0.54 },
  { stt: 10, moldType: 'tron', dn: 'DN50', od: 60, thickness: 25, length: 760, polyKg: 0.3, isoKg: 0.36 },
  { stt: 14, moldType: 'tron', dn: 'DN15', od: 21, thickness: 30, length: 1200, polyKg: 0.35, isoKg: 0.42 },
  { stt: 15, moldType: 'tron', dn: 'DN20', od: 27, thickness: 30, length: 1200, polyKg: 0.4, isoKg: 0.48 },
  { stt: 17, moldType: 'tron', dn: 'DN25', od: 34, thickness: 30, length: 1200, polyKg: 0.4, isoKg: 0.48 },
  { stt: 18, moldType: 'tron', dn: 'DN32', od: 42, thickness: 30, length: 1200, polyKg: 0.45, isoKg: 0.54 },
  { stt: 20, moldType: 'tron', dn: 'DN32', od: 42, thickness: 35, length: 1200, polyKg: 0.5, isoKg: 0.6 },
  { stt: 21, moldType: 'tron', dn: 'DN40', od: 49, thickness: 30, length: 1200, polyKg: 0.5, isoKg: 0.6 },
  { stt: 22, moldType: 'tron', dn: 'DN50', od: 60, thickness: 30, length: 800, polyKg: 0.4, isoKg: 0.48 },
  { stt: 23, moldType: 'tron', dn: 'DN65', od: 76, thickness: 30, length: 1200, polyKg: 0.6, isoKg: 0.72 },
  { stt: 24, moldType: 'tron', dn: 'DN80', od: 90, thickness: 30, length: 1200, polyKg: 0.7, isoKg: 0.84 },
  { stt: 26, moldType: 'tron', dn: 'DN15', od: 21, thickness: 40, length: 1200, polyKg: 0.55, isoKg: 0.66 },
  { stt: 28, moldType: 'tron', dn: 'DN20', od: 27, thickness: 40, length: 1200, polyKg: 0.6, isoKg: 0.72 },
  { stt: 29, moldType: 'tron', dn: 'DN25', od: 34, thickness: 40, length: 1200, polyKg: 0.6, isoKg: 0.72 },
  { stt: 31, moldType: 'tron', dn: 'DN32', od: 42, thickness: 40, length: 1200, polyKg: 0.6, isoKg: 0.72 },
  { stt: 32, moldType: 'tron', dn: 'DN32', od: 42, thickness: 40, length: 1200, polyKg: 0.65, isoKg: 0.78 },
  { stt: 33, moldType: 'tron', dn: 'DN40', od: 49, thickness: 40, length: 1200, polyKg: 0.7, isoKg: 0.84 },
  { stt: 35, moldType: 'tron', dn: 'DN50', od: 60, thickness: 40, length: 800, polyKg: 0.8, isoKg: 0.96 },
  { stt: 37, moldType: 'tron', dn: 'DN65', od: 76, thickness: 40, length: 1200, polyKg: 0.8, isoKg: 0.96 },
  { stt: 38, moldType: 'tron', dn: 'DN80', od: 90, thickness: 40, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 39, moldType: 'tron', dn: 'DN100', od: 114, thickness: 40, length: 1200, polyKg: 1.2, isoKg: 1.44 },
  { stt: 41, moldType: 'tron', dn: 'DN125', od: 141, thickness: 40, length: 1200, polyKg: 1.4, isoKg: 1.68 },
  { stt: 42, moldType: 'tron', dn: 'DN150', od: 168, thickness: 40, length: 1200, polyKg: 1.5, isoKg: 1.8 },
  { stt: 43, moldType: 'tron', dn: 'DN200', od: 219, thickness: 40, length: 1200, polyKg: 2.0, isoKg: 2.4 },
  { stt: 44, moldType: 'tron', dn: 'DN250', od: 273, thickness: 40, length: 1200, polyKg: 2.4, isoKg: 2.88 },
  { stt: 49, moldType: 'tron', dn: 'DN15', od: 21, thickness: 50, length: 1200, polyKg: 0.65, isoKg: 0.78 },
  { stt: 51, moldType: 'tron', dn: 'DN20', od: 27, thickness: 50, length: 1200, polyKg: 0.7, isoKg: 0.84 },
  { stt: 52, moldType: 'tron', dn: 'DN25', od: 34, thickness: 50, length: 1200, polyKg: 0.7, isoKg: 0.84 },
  { stt: 53, moldType: 'tron', dn: 'DN32', od: 42, thickness: 50, length: 1200, polyKg: 0.8, isoKg: 0.96 },
  { stt: 54, moldType: 'tron', dn: 'DN40', od: 49, thickness: 50, length: 1200, polyKg: 0.9, isoKg: 1.08 },
  { stt: 55, moldType: 'tron', dn: 'DN40', od: 49, thickness: 135, length: 1200, polyKg: 2.5, isoKg: 3.0 },
  { stt: 56, moldType: 'tron', dn: 'DN40', od: 40, thickness: 50, length: 1200, polyKg: 0.9, isoKg: 1.08 },
  { stt: 57, moldType: 'tron', dn: 'DN50', od: 52, thickness: 50, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 58, moldType: 'tron', dn: 'DN50', od: 60, thickness: 50, length: 800, polyKg: 0.9, isoKg: 1.08 },
  { stt: 59, moldType: 'tron', dn: 'DN50', od: 60, thickness: 50, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 60, moldType: 'tron', dn: 'DN65', od: 76, thickness: 50, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 61, moldType: 'tron', dn: 'DN80', od: 90, thickness: 50, length: 1200, polyKg: 1.2, isoKg: 1.44 },
  { stt: 62, moldType: 'tron', dn: 'DN100', od: 114, thickness: 50, length: 1200, polyKg: 1.5, isoKg: 1.8 },
  { stt: 64, moldType: 'tron', dn: 'DN125', od: 141, thickness: 50, length: 1200, polyKg: 1.7, isoKg: 2.04 },
  { stt: 65, moldType: 'tron', dn: 'DN150', od: 168, thickness: 50, length: 1200, polyKg: 1.8, isoKg: 2.16 },
  { stt: 66, moldType: 'tron', dn: 'DN200', od: 219, thickness: 50, length: 1200, polyKg: 2.2, isoKg: 2.64 },
  { stt: 67, moldType: 'tron', dn: 'DN250', od: 273, thickness: 50, length: 1200, polyKg: 3.0, isoKg: 3.6 },
  { stt: 68, moldType: 'tron', dn: 'DN300', od: 323, thickness: 50, length: 1200, polyKg: 3.4, isoKg: 4.08 },
  { stt: 70, moldType: 'tron', dn: 'DN350', od: 356, thickness: 50, length: 1200, polyKg: 3.0, isoKg: 3.6 },
  { stt: 71, moldType: 'tron', dn: 'DN400', od: 406, thickness: 50, length: 1200, polyKg: 4.4, isoKg: 5.28 },
  { stt: 77, moldType: 'tron', dn: 'DN50', od: 60, thickness: 65, length: 800, polyKg: 0.9, isoKg: 1.08 },
  { stt: 85, moldType: 'tron', dn: 'DN200', od: 219, thickness: 80, length: 1200, polyKg: 3.8, isoKg: 4.56 },
  { stt: 86, moldType: 'tron', dn: 'DN125', od: 141, thickness: 100, length: 1100, polyKg: 3.4, isoKg: 4.08 },
  { stt: 87, moldType: 'tron', dn: 'DN150', od: 168, thickness: 100, length: 1100, polyKg: 3.6, isoKg: 4.32 },
  { stt: 88, moldType: 'tron', dn: 'DN200', od: 219, thickness: 100, length: 1100, polyKg: 4.4, isoKg: 5.28 },
  { stt: 89, moldType: 'tron', dn: 'DN250', od: 273, thickness: 100, length: 1100, polyKg: 6.0, isoKg: 7.2 },

  // === VUÔNG (Square) ===
  { stt: 97, moldType: 'vuong', dn: 'DN15', od: 21, thickness: 25, length: 1200, polyKg: 0.35, isoKg: 0.42 },
  { stt: 98, moldType: 'vuong', dn: 'DN20', od: 27, thickness: 25, length: 1200, polyKg: 0.4, isoKg: 0.48 },
  { stt: 99, moldType: 'vuong', dn: 'DN25', od: 34, thickness: 25, length: 1200, polyKg: 0.4, isoKg: 0.48 },
  { stt: 100, moldType: 'vuong', dn: 'DN32', od: 42, thickness: 25, length: 1200, polyKg: 0.45, isoKg: 0.54 },
  { stt: 101, moldType: 'vuong', dn: 'DN40', od: 49, thickness: 25, length: 1200, polyKg: 0.5, isoKg: 0.6 },
  { stt: 102, moldType: 'vuong', dn: 'DN50', od: 60, thickness: 25, length: 760, polyKg: 0.4, isoKg: 0.48 },
  { stt: 105, moldType: 'vuong', dn: 'DN15', od: 21, thickness: 30, length: 1200, polyKg: 0.4, isoKg: 0.48 },
  { stt: 106, moldType: 'vuong', dn: 'DN20', od: 27, thickness: 30, length: 1200, polyKg: 0.45, isoKg: 0.54 },
  { stt: 107, moldType: 'vuong', dn: 'DN25', od: 34, thickness: 30, length: 1200, polyKg: 0.5, isoKg: 0.6 },
  { stt: 108, moldType: 'vuong', dn: 'DN32', od: 42, thickness: 30, length: 1200, polyKg: 0.5, isoKg: 0.6 },
  { stt: 109, moldType: 'vuong', dn: 'DN40', od: 49, thickness: 30, length: 1200, polyKg: 0.6, isoKg: 0.72 },
  { stt: 110, moldType: 'vuong', dn: 'DN50', od: 60, thickness: 30, length: 800, polyKg: 0.5, isoKg: 0.6 },
  { stt: 111, moldType: 'vuong', dn: 'DN65', od: 76, thickness: 30, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 112, moldType: 'vuong', dn: 'DN80', od: 90, thickness: 30, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 113, moldType: 'vuong', dn: 'DN15', od: 21, thickness: 40, length: 1200, polyKg: 0.7, isoKg: 0.84 },
  { stt: 114, moldType: 'vuong', dn: 'DN20', od: 27, thickness: 40, length: 1200, polyKg: 0.8, isoKg: 0.96 },
  { stt: 115, moldType: 'vuong', dn: 'DN25', od: 34, thickness: 40, length: 1200, polyKg: 0.9, isoKg: 1.08 },
  { stt: 116, moldType: 'vuong', dn: 'DN32', od: 42, thickness: 40, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 117, moldType: 'vuong', dn: 'DN40', od: 49, thickness: 40, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 118, moldType: 'vuong', dn: 'DN50', od: 60, thickness: 40, length: 800, polyKg: 0.6, isoKg: 0.72 },
  { stt: 119, moldType: 'vuong', dn: 'DN65', od: 76, thickness: 40, length: 1200, polyKg: 1.2, isoKg: 1.44 },
  { stt: 120, moldType: 'vuong', dn: 'DN80', od: 90, thickness: 40, length: 1200, polyKg: 1.4, isoKg: 1.68 },
  { stt: 121, moldType: 'vuong', dn: 'DN100', od: 114, thickness: 40, length: 1200, polyKg: 1.6, isoKg: 1.92 },
  { stt: 122, moldType: 'vuong', dn: 'DN125', od: 141, thickness: 40, length: 1200, polyKg: 1.7, isoKg: 2.04 },
  { stt: 123, moldType: 'vuong', dn: 'DN150', od: 168, thickness: 40, length: 800, polyKg: 1.3, isoKg: 1.56 },
  { stt: 124, moldType: 'vuong', dn: 'DN200', od: 219, thickness: 40, length: 800, polyKg: 1.9, isoKg: 2.28 },
  { stt: 128, moldType: 'vuong', dn: 'DN15', od: 21, thickness: 50, length: 1200, polyKg: 0.8, isoKg: 0.96 },
  { stt: 130, moldType: 'vuong', dn: 'DN25', od: 34, thickness: 50, length: 1200, polyKg: 1.0, isoKg: 1.2 },
  { stt: 132, moldType: 'vuong', dn: 'DN40', od: 49, thickness: 50, length: 1200, polyKg: 1.2, isoKg: 1.44 },
  { stt: 134, moldType: 'vuong', dn: 'DN50', od: 60, thickness: 50, length: 1200, polyKg: 1.2, isoKg: 1.44 },
  { stt: 135, moldType: 'vuong', dn: 'DN65', od: 76, thickness: 50, length: 1200, polyKg: 1.5, isoKg: 1.8 },
  { stt: 136, moldType: 'vuong', dn: 'DN80', od: 90, thickness: 50, length: 1200, polyKg: 1.6, isoKg: 1.92 },
  { stt: 137, moldType: 'vuong', dn: 'DN100', od: 114, thickness: 50, length: 1200, polyKg: 1.8, isoKg: 2.16 },
  { stt: 138, moldType: 'vuong', dn: 'DN125', od: 141, thickness: 50, length: 1200, polyKg: 2.0, isoKg: 2.4 },
  { stt: 139, moldType: 'vuong', dn: 'DN150', od: 168, thickness: 50, length: 1200, polyKg: 2.5, isoKg: 3.0 },
  { stt: 140, moldType: 'vuong', dn: 'DN200', od: 219, thickness: 50, length: 1200, polyKg: 3.0, isoKg: 3.6 },
  { stt: 141, moldType: 'vuong', dn: 'DN250', od: 273, thickness: 50, length: 1200, polyKg: 4.0, isoKg: 4.8 },
  { stt: 142, moldType: 'vuong', dn: 'DN300', od: 323, thickness: 50, length: 1200, polyKg: 4.5, isoKg: 5.4 },
  { stt: 145, moldType: 'vuong', dn: 'DN400', od: 406, thickness: 50, length: 1200, polyKg: 6.0, isoKg: 7.2 },
  { stt: 152, moldType: 'vuong', dn: 'DN50', od: 60, thickness: 70, length: 610, polyKg: 1.0, isoKg: 1.2 },
  { stt: 153, moldType: 'vuong', dn: 'DN80', od: 90, thickness: 70, length: 610, polyKg: 1.2, isoKg: 1.44 },
  { stt: 154, moldType: 'vuong', dn: 'DN100', od: 114, thickness: 70, length: 610, polyKg: 1.4, isoKg: 1.68 },
  { stt: 155, moldType: 'vuong', dn: 'DN150', od: 168, thickness: 70, length: 610, polyKg: 1.9, isoKg: 2.28 },
  { stt: 156, moldType: 'vuong', dn: 'DN200', od: 219, thickness: 70, length: 610, polyKg: 2.2, isoKg: 2.64 },
  { stt: 157, moldType: 'vuong', dn: 'DN250', od: 273, thickness: 70, length: 610, polyKg: 2.9, isoKg: 3.48 },
  { stt: 158, moldType: 'vuong', dn: 'DN300', od: 323, thickness: 70, length: 610, polyKg: 3.3, isoKg: 3.96 },
  { stt: 159, moldType: 'vuong', dn: 'DN125', od: 141, thickness: 100, length: 1100, polyKg: 4.0, isoKg: 4.8 },
  { stt: 160, moldType: 'vuong', dn: 'DN150', od: 168, thickness: 100, length: 1100, polyKg: 5.0, isoKg: 6.0 },
  { stt: 161, moldType: 'vuong', dn: 'DN200', od: 219, thickness: 100, length: 1100, polyKg: 6.0, isoKg: 7.2 },
  { stt: 162, moldType: 'vuong', dn: 'DN250', od: 273, thickness: 100, length: 1100, polyKg: 8.0, isoKg: 9.6 },
  { stt: 163, moldType: 'vuong', dn: 'DN350', od: 356, thickness: 100, length: 600, polyKg: 11.0, isoKg: 13.2 },
  { stt: 164, moldType: 'vuong', dn: 'DN400', od: 406, thickness: 100, length: 1100, polyKg: 12.0, isoKg: 14.4 },
];

/**
 * DN → default OD mapping (most common OD for each DN)
 */
export const DN_OD_MAP: Record<string, number> = {
  'DN15': 21,
  'DN20': 27,
  'DN25': 34,
  'DN32': 42,
  'DN40': 49,
  'DN50': 60,
  'DN65': 76,
  'DN80': 90,
  'DN100': 114,
  'DN125': 141,
  'DN150': 168,
  'DN200': 219,
  'DN250': 273,
  'DN300': 323,
  'DN350': 356,
  'DN400': 406,
};

/**
 * All available DN sizes (ordered)
 */
export const DN_OPTIONS = [
  'DN15', 'DN20', 'DN25', 'DN32', 'DN40', 'DN50',
  'DN65', 'DN80', 'DN100', 'DN125', 'DN150', 'DN200',
  'DN250', 'DN300', 'DN350', 'DN400',
];

/**
 * Lookup reference data for exact match
 * Returns the first match (or null if none found)
 */
export function lookupReference(
  moldType: 'tron' | 'vuong',
  od: number,
  thickness: number,
  length: number
): ReferenceEntry | null {
  return REFERENCE_DATA.find(
    (entry) =>
      entry.moldType === moldType &&
      entry.od === od &&
      entry.thickness === thickness &&
      entry.length === length
  ) ?? null;
}

/**
 * Get available thicknesses for a given mold type and OD
 */
export function getAvailableThicknesses(moldType: 'tron' | 'vuong', od: number): number[] {
  const thicknesses = new Set<number>();
  REFERENCE_DATA.forEach((entry) => {
    if (entry.moldType === moldType && entry.od === od) {
      thicknesses.add(entry.thickness);
    }
  });
  return Array.from(thicknesses).sort((a, b) => a - b);
}

/**
 * Get available DNs for a given mold type
 */
export function getAvailableDNs(moldType: 'tron' | 'vuong'): string[] {
  const dns = new Set<string>();
  REFERENCE_DATA.forEach((entry) => {
    if (entry.moldType === moldType) {
      dns.add(entry.dn);
    }
  });
  return DN_OPTIONS.filter((dn) => dns.has(dn));
}

/**
 * Get available lengths for a given mold type, OD and thickness
 */
export function getAvailableLengths(moldType: 'tron' | 'vuong', od: number, thickness: number): number[] {
  const lengths = new Set<number>();
  REFERENCE_DATA.forEach((entry) => {
    if (entry.moldType === moldType && entry.od === od && entry.thickness === thickness) {
      lengths.add(entry.length);
    }
  });
  return Array.from(lengths).sort((a, b) => a - b);
}

/**
 * Filter reference data by mold type (for table display)
 */
export function filterReferenceData(
  moldType?: 'tron' | 'vuong',
  dn?: string,
  thickness?: number,
): ReferenceEntry[] {
  return REFERENCE_DATA.filter((entry) => {
    if (moldType && entry.moldType !== moldType) return false;
    if (dn && entry.dn !== dn) return false;
    if (thickness && entry.thickness !== thickness) return false;
    return true;
  });
}
