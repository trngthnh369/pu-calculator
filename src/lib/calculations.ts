import { CalculationParams, CalculationResult } from './types';

/**
 * Calculate for circular mold (Khuôn đế tròn lõi tròn)
 */
export function calculateCircular(params: CalculationParams): CalculationResult {
  const { thickness, outerDiameter, length, density } = params;
  
  // Convert mm to m
  const t_m = thickness / 1000;
  const od_m = outerDiameter / 1000;
  const l_m = length / 1000;
  
  // Calculate cushion outer diameter
  const cushionOD = od_m + (2 * t_m);
  
  // Calculate area (m²)
  const area = (Math.PI / 4) * (Math.pow(cushionOD, 2) - Math.pow(od_m, 2));
  
  // Calculate volume (m³)
  const volume = area * l_m;
  
  // Calculate finished mass (kg)
  const finishedMass = volume * density;
  
  // Calculate required mass with 20% loss factor
  const requiredMass = finishedMass * 0.8;
  
  // Calculate polyol and isocyanate (ratio 1.0:1.2)
  const polyol = (requiredMass / 2.2) * 1.0;
  const isocyanate = (requiredMass / 2.2) * 1.2;
  
  return {
    area: parseFloat(area.toFixed(4)),
    volume: parseFloat(volume.toFixed(5)),
    finishedMass: parseFloat(finishedMass.toFixed(2)),
    requiredMass: parseFloat(requiredMass.toFixed(2)),
    polyol: parseFloat(polyol.toFixed(2)),
    isocyanate: parseFloat(isocyanate.toFixed(2))
  };
}

/**
 * Calculate for saddle mold (Khuôn đế vuông lõi tròn - U shape)
 */
export function calculateSaddle(params: CalculationParams): CalculationResult {
  const { thickness, outerDiameter, length, density } = params;
  
  // Convert mm to m
  const t_m = thickness / 1000;
  const od_m = outerDiameter / 1000;
  const l_m = length / 1000;
  
  // Step 1: Calculate square side
  const a = od_m + (2 * t_m);
  
  // Step 2: Calculate square area
  const squareArea = Math.pow(a, 2);
  
  // Step 3: Calculate circle area
  const circleArea = (Math.PI / 4) * Math.pow(od_m, 2);
  
  // Step 4: Calculate actual cross-sectional area (average of square and circle)
  const area = (circleArea + squareArea) / 2;
  
  // Calculate volume (m³)
  const volume = area * l_m;
  
  // Calculate finished mass (kg)
  const finishedMass = volume * density;
  
  // Calculate required mass with 20% loss factor
  const requiredMass = finishedMass * 0.8;
  
  // Calculate polyol and isocyanate (ratio 1.0:1.2)
  const polyol = (requiredMass / 2.2) * 1.0;
  const isocyanate = (requiredMass / 2.2) * 1.2;
  
  return {
    area: parseFloat(area.toFixed(4)),
    volume: parseFloat(volume.toFixed(5)),
    finishedMass: parseFloat(finishedMass.toFixed(2)),
    requiredMass: parseFloat(requiredMass.toFixed(2)),
    polyol: parseFloat(polyol.toFixed(2)),
    isocyanate: parseFloat(isocyanate.toFixed(2))
  };
}

/**
 * Main calculation function that routes to appropriate calculator
 */
export function calculate(params: CalculationParams): CalculationResult {
  if (params.moldType === 'circular') {
    return calculateCircular(params);
  } else {
    return calculateSaddle(params);
  }
}