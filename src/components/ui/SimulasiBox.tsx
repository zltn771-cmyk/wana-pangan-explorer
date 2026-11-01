// ============================================================
// components/ui/SimulasiBox.tsx — Banner peringatan simulasi
// ============================================================

import { AlertTriangle } from 'lucide-react';

interface SimulasiBoxProps {
  className?: string;
}

export function SimulasiBox({ className = '' }: SimulasiBoxProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 ${className}`}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      <p className="leading-relaxed">
        <strong className="font-semibold">Platform Simulasi Konsep</strong> —
        Seluruh data, transaksi, dan angka yang ditampilkan bersifat fiktif dan
        hanya digunakan untuk keperluan demonstrasi konsep{' '}
        <em>ecopreneurship</em> WANA PANGAN. Tidak ada transaksi nyata yang
        terjadi.
      </p>
    </div>
  );
}
