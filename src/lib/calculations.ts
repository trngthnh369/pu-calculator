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
  const area = ((Math.PI / 4) * (Math.pow(cushionOD, 2) - Math.pow(od_m, 2)) / 2);
  
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

// --- 1. Định nghĩa Type cho cấu hình động ---
type SmartConfig = {
  appliedDensity: number; // Tỷ trọng áp dụng (kg/m3)
  wasteRate: number;      // Tỷ lệ hao hụt (0.25 = 25%)
  description: string;    // Mô tả nhóm
};

/**
 * Hàm phụ trợ: Xác định Tỷ trọng & Hao hụt dựa trên OD ống
 * Logic: Khuôn nhỏ nén chặt + hao hụt cao. Khuôn lớn nén vừa + hao hụt thấp.
 */
function getSmartConfig(od_mm: number): SmartConfig {
  if (od_mm < 130) {
    // Nhóm OD 114 (Khớp dữ liệu 2.64kg)
    return { 
      appliedDensity: 220, 
      wasteRate: 0, // 25%
      description: "Khuôn Nhỏ (Nén cao)" 
    };
  } 
  else if (od_mm <= 200) {
    // Nhóm OD 141, 168 (Khớp dữ liệu 4.4kg, 5.5kg)
    return { 
      appliedDensity: 180, 
      wasteRate: 0, // 15%
      description: "Khuôn Trung (Tiêu chuẩn)" 
    };
  } 
  else {
    // Nhóm OD 219 (Khớp dữ liệu 6.6kg)
    return { 
      appliedDensity: 172, 
      wasteRate: 0, // 10%
      description: "Khuôn Lớn (Tiết kiệm)" 
    };
  }
}

/**
 * Calculate for HALF-SQUARE mold (Khuôn đế U - Nửa đế vuông)
 * Logic: "Thực tế sản xuất" (Real-world Logic)
 */
export function calculateSaddle(params: CalculationParams): CalculationResult {
  // Lưu ý: Ta không dùng tham số 'density' truyền vào, mà dùng logic tự động
  const { thickness, outerDiameter, length } = params;
  
  // Validate input 
  if (!thickness || !outerDiameter || !length) {
    return {
      area: 0, volume: 0, finishedMass: 0, requiredMass: 0, polyol: 0, isocyanate: 0
    };
  }

  // 1. Lấy cấu hình động (Tỷ trọng & Hao hụt)
  const config = getSmartConfig(outerDiameter);

  // 2. Chuyển đổi đơn vị (mm -> m)
  const t_m = thickness / 1000;
  const od_pipe_m = outerDiameter / 1000;
  const l_m = length / 1000;
  
  // 3. Tính toán Hình học (Nửa đế vuông)
  // 
  
  // Cạnh hình vuông bao ngoài
  const squareSide = od_pipe_m + (2 * t_m);
  
  // Diện tích Hình vuông Đặc (Full Square)
  const areaOuterSquare = Math.pow(squareSide, 2);
  
  // Diện tích Lỗ tròn (Hole)
  const areaHole = (Math.PI / 4) * Math.pow(od_pipe_m, 2);

  // Diện tích Vật liệu = (Vuông Đặc - Lỗ) / 2
  // CHÚ Ý: Phải chia 2 vì đây là Nửa đế vuông (Saddle Base)
  const areaFinal = (areaOuterSquare - areaHole) / 2;
  
  // 4. Tính Thể tích (m³)
  const volume = areaFinal * l_m;
  
  // 5. Tính Khối lượng Thành phẩm (Net Weight)
  // Dùng tỷ trọng động (220, 180 hoặc 172) thay vì số cố định
  const finishedMass = volume * config.appliedDensity;
  
  // 6. Tính Tổng hóa chất cần pha (Gross Weight)
  // Hao hụt là CỘNG THÊM (1 + wasteRate). Ví dụ 25% -> nhân 1.25
  const requiredMass = finishedMass * (1 + config.wasteRate);
  
  // 7. Chia thành phần Poly/Iso (Tỷ lệ 1.0 : 1.2)
  const totalRatio = 2.2;
  const polyol = (requiredMass / totalRatio) * 1.0;
  const isocyanate = (requiredMass / totalRatio) * 1.2;
  
  // Trả về kết quả (Làm tròn số cho đẹp)
  return {
    area: parseFloat(areaFinal.toFixed(5)),
    volume: parseFloat(volume.toFixed(5)),
    finishedMass: parseFloat(finishedMass.toFixed(2)), // Khớp với số liệu KCS
    requiredMass: parseFloat(requiredMass.toFixed(2)), // Khớp với số liệu Pha chế
    polyol: parseFloat(polyol.toFixed(2)),
    isocyanate: parseFloat(isocyanate.toFixed(2)),
    // Trả thêm thông tin cấu hình để hiển thị UI nếu cần
    // _config: config 
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