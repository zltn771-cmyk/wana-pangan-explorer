// ============================================================
// hooks/useScrollTop.ts — Scroll ke atas saat navigasi halaman
// ============================================================

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Otomatis scroll ke atas setiap kali pathname berubah.
 * Gunakan di dalam komponen Layout utama.
 */
export function useScrollTop(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
}
