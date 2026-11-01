import type { LumbungTransaction, FoodReserve } from '@/types';

const SIMULASI = true as const;

// Semua angka adalah DATA SIMULASI
export const initialLumbungTransactions: LumbungTransaction[] = [
  { id: 'lt-001', type: 'pendapatan-wisata', description: 'Pendapatan wisata Batu Ampar – Oktober 2026', amount: 4500000, fund: 'operasional', createdAt: '2026-10-31', isSimulasi: SIMULASI },
  { id: 'lt-002', type: 'pendapatan-produk', description: 'Penjualan kopi & gula aren – Oktober 2026', amount: 3200000, fund: 'operasional', createdAt: '2026-10-28', isSimulasi: SIMULASI },
  { id: 'lt-003', type: 'kontribusi-konservasi', description: 'Iuran konservasi dari wisata – Oktober 2026', amount: 900000, fund: 'konservasi', createdAt: '2026-10-31', isSimulasi: SIMULASI },
  { id: 'lt-004', type: 'alokasi-pangan', description: 'Alokasi cadangan pangan desa – Oktober 2026', amount: 2000000, fund: 'cadangan-pangan', createdAt: '2026-10-25', isSimulasi: SIMULASI },
  { id: 'lt-005', type: 'pendapatan-wisata', description: 'Pendapatan wisata Belitar & Ai Sempiang – Sep 2026', amount: 3800000, fund: 'operasional', createdAt: '2026-09-30', isSimulasi: SIMULASI },
  { id: 'lt-006', type: 'pendapatan-produk', description: 'Penjualan rebung & kolang-kaling – Sep 2026', amount: 1500000, fund: 'operasional', createdAt: '2026-09-27', isSimulasi: SIMULASI },
  { id: 'lt-007', type: 'kontribusi-konservasi', description: 'Iuran konservasi dari wisata – Sep 2026', amount: 760000, fund: 'konservasi', createdAt: '2026-09-30', isSimulasi: SIMULASI },
  { id: 'lt-008', type: 'alokasi-pangan', description: 'Alokasi cadangan pangan desa – Sep 2026', amount: 1500000, fund: 'cadangan-pangan', createdAt: '2026-09-20', isSimulasi: SIMULASI },
  { id: 'lt-009', type: 'pendapatan-wisata', description: 'Pendapatan wisata semua destinasi – Ags 2026', amount: 5200000, fund: 'operasional', createdAt: '2026-08-31', isSimulasi: SIMULASI },
  { id: 'lt-010', type: 'pendapatan-produk', description: 'Penjualan semua produk – Ags 2026', amount: 4100000, fund: 'operasional', createdAt: '2026-08-29', isSimulasi: SIMULASI },
  { id: 'lt-011', type: 'kontribusi-konservasi', description: 'Iuran konservasi – Ags 2026', amount: 1040000, fund: 'konservasi', createdAt: '2026-08-31', isSimulasi: SIMULASI },
  { id: 'lt-012', type: 'alokasi-pangan', description: 'Alokasi cadangan pangan – Ags 2026', amount: 2500000, fund: 'cadangan-pangan', createdAt: '2026-08-20', isSimulasi: SIMULASI },
];

export const monthlyChartData = [
  { bulan: 'Jun', wisata: 2100000, produk: 1800000, konservasi: 420000, pangan: 800000 },
  { bulan: 'Jul', wisata: 3200000, produk: 2400000, konservasi: 640000, pangan: 1200000 },
  { bulan: 'Ags', wisata: 5200000, produk: 4100000, konservasi: 1040000, pangan: 2500000 },
  { bulan: 'Sep', wisata: 3800000, produk: 1500000, konservasi: 760000, pangan: 1500000 },
  { bulan: 'Okt', wisata: 4500000, produk: 3200000, konservasi: 900000, pangan: 2000000 },
];

export const foodReserves: FoodReserve[] = [
  { id: 'fr-001', komoditas: 'Beras', quantity: 450, unit: 'kg', lastUpdated: '2026-10-25', isSimulasi: SIMULASI },
  { id: 'fr-002', komoditas: 'Jagung', quantity: 200, unit: 'kg', lastUpdated: '2026-10-20', isSimulasi: SIMULASI },
  { id: 'fr-003', komoditas: 'Gula Aren', quantity: 80, unit: 'kg', lastUpdated: '2026-10-28', isSimulasi: SIMULASI },
  { id: 'fr-004', komoditas: 'Rebung Fermentasi', quantity: 150, unit: 'kg', lastUpdated: '2026-10-15', isSimulasi: SIMULASI },
  { id: 'fr-005', komoditas: 'Minyak Kelapa', quantity: 50, unit: 'liter', lastUpdated: '2026-10-10', isSimulasi: SIMULASI },
];

// Ringkasan untuk dashboard
export const lumbungSummary = {
  totalDanaOperasional: 25600000,
  totalDanaKonservasi:  3760000,
  totalCadanganPangan:  9800000,
  isSimulasi: SIMULASI,
};
