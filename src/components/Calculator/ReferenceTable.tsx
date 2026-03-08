'use client';

import React, { useMemo, useState } from 'react';
import { filterReferenceData, ReferenceEntry } from '@/lib/referenceData';
import { MoldType } from '@/lib/types';
import { Search } from 'lucide-react';

interface ReferenceTableProps {
  moldType: MoldType;
  currentOD?: number;
  currentThickness?: number;
  currentLength?: number;
}

export default function ReferenceTable({ 
  moldType, 
  currentOD, 
  currentThickness, 
  currentLength 
}: ReferenceTableProps) {
  const [filterDN, setFilterDN] = useState<string>('');
  const [filterThickness, setFilterThickness] = useState<string>('');

  const data = useMemo(() => {
    return filterReferenceData(
      moldType,
      filterDN || undefined,
      filterThickness ? parseInt(filterThickness) : undefined
    );
  }, [moldType, filterDN, filterThickness]);

  const isHighlighted = (entry: ReferenceEntry) => {
    return (
      entry.od === currentOD &&
      entry.thickness === currentThickness &&
      entry.length === currentLength
    );
  };

  // Get unique DN and thickness values for filters
  const allData = useMemo(() => filterReferenceData(moldType), [moldType]);
  const uniqueDNs = useMemo(() => {
    const dns = new Set<string>();
    allData.forEach(e => dns.add(e.dn));
    return Array.from(dns);
  }, [allData]);
  
  const uniqueThicknesses = useMemo(() => {
    const thicknesses = new Set<number>();
    allData.forEach(e => thicknesses.add(e.thickness));
    return Array.from(thicknesses).sort((a, b) => a - b);
  }, [allData]);

  return (
    <div className="surface rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b" style={{ borderColor: '#2d2d4a' }}>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Search className="w-4 h-4" style={{ color: '#5e19e6' }} />
          Bảng dữ liệu tham chiếu
        </h3>
        
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterDN}
            onChange={(e) => setFilterDN(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500"
            style={{ background: '#12121f', border: '1px solid #2d2d4a' }}
          >
            <option value="">Tất cả DN</option>
            {uniqueDNs.map(dn => (
              <option key={dn} value={dn}>{dn}</option>
            ))}
          </select>
          <select
            value={filterThickness}
            onChange={(e) => setFilterThickness(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500"
            style={{ background: '#12121f', border: '1px solid #2d2d4a' }}
          >
            <option value="">Tất cả Chiều dày</option>
            {uniqueThicknesses.map(t => (
              <option key={t} value={t}>{t}mm</option>
            ))}
          </select>
          <span className="text-xs self-center ml-auto" style={{ color: '#64748b' }}>
            {data.length} kết quả
          </span>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-auto max-h-[400px] md:max-h-[500px]">
        <table className="ref-table w-full text-xs">
          <thead>
            <tr>
              <th className="px-3 py-2.5 text-left font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>DN</th>
              <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>OD</th>
              <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Dày</th>
              <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Dài</th>
              <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider" style={{ color: '#a78bfa' }}>Poly</th>
              <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider" style={{ color: '#e8d5a3' }}>ISO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr 
                key={entry.stt}
                className={isHighlighted(entry) ? 'highlighted' : ''}
              >
                <td className="px-3 py-2 text-left font-medium text-white">{entry.dn}</td>
                <td className="px-3 py-2 text-right font-mono" style={{ color: '#94A3B8' }}>{entry.od}</td>
                <td className="px-3 py-2 text-right font-mono" style={{ color: '#94A3B8' }}>{entry.thickness}</td>
                <td className="px-3 py-2 text-right font-mono" style={{ color: '#94A3B8' }}>{entry.length}</td>
                <td className="px-3 py-2 text-right font-mono font-semibold" style={{ color: '#a78bfa' }}>{entry.polyKg}</td>
                <td className="px-3 py-2 text-right font-mono font-semibold" style={{ color: '#e8d5a3' }}>{entry.isoKg}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center" style={{ color: '#64748b' }}>
                  Không có dữ liệu phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
