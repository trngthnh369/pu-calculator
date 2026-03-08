'use client';

import React from 'react';
import { DN_OPTIONS, DN_OD_MAP } from '@/lib/referenceData';
import { MoldType } from '@/lib/types';
import { getAvailableDNs } from '@/lib/referenceData';

interface DNSelectorProps {
  moldType: MoldType;
  selectedDN: string;
  onDNChange: (dn: string) => void;
  onODChange: (od: number) => void;
}

export default function DNSelector({ moldType, selectedDN, onDNChange, onODChange }: DNSelectorProps) {
  const availableDNs = getAvailableDNs(moldType);

  const handleChange = (dn: string) => {
    onDNChange(dn);
    const defaultOD = DN_OD_MAP[dn];
    if (defaultOD) {
      onODChange(defaultOD);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-wider font-medium" style={{ color: '#94A3B8' }}>
        Đường kính danh nghĩa (DN)
      </label>
      <select
        value={selectedDN}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-lg px-4 py-3 text-white font-semibold text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
        style={{
          background: '#12121f',
          border: '1px solid #2d2d4a',
        }}
      >
        {DN_OPTIONS.map((dn) => {
          const available = availableDNs.includes(dn);
          const od = DN_OD_MAP[dn];
          return (
            <option key={dn} value={dn} style={{ background: '#1a1a2e' }}>
              {dn} (OD: {od}mm){!available ? ' ⚠' : ''}
            </option>
          );
        })}
      </select>
      {!availableDNs.includes(selectedDN) && (
        <p className="text-xs" style={{ color: '#e8d5a3' }}>
          ⚠ Không có dữ liệu tra bảng cho {selectedDN} loại khuôn {moldType === 'tron' ? 'tròn' : 'vuông'}
        </p>
      )}
    </div>
  );
}
