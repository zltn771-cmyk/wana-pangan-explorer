// ============================================================
// types/index.ts — Semua TypeScript interface untuk WANA PANGAN
// ============================================================

// ── Product ──────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  asalWilayah: string; // contoh: "Kabupaten Kepahiang, Provinsi Bengkulu"
  produsen: string; // contoh: "Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)"
  bahanBaku: string; // contoh: "100% Biji Kopi Robusta Petik Merah Dataran Tinggi"
  bentukPengolahan: string; // contoh: "Sortasi buah merah, penjemuran meja para-para, sangrai medium-dark"
  desa?: string;
  kabupaten?: string;
  umkm?: string;
  description: string;
  longDescription: string;
  price: number; // simulasi
  stock: number; // simulasi
  unit: string;
  image: string;
  tags: string[];
  isSimulasi: true;
}

export type ProductCategory =
  | 'kopi'
  | 'gula-aren'
  | 'rebung'
  | 'kolang-kaling'
  | 'lainnya';

export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  'kopi': 'Kopi Robusta Bengkulu',
  'gula-aren': 'Gula Aren',
  'rebung': 'Olahan Rebung',
  'kolang-kaling': 'Kolang-kaling',
  'lainnya': 'Komoditas Bengkulu Lainnya',
};

// ── Cart ─────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ── Order ─────────────────────────────────────────────────────
export type OrderStatus = 'baru' | 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan';

export interface Order {
  id: string;
  items: CartItem[];
  total: number; // simulasi
  status: OrderStatus;
  customer: CustomerInfo;
  paymentMethod?: 'transfer' | 'cod' | string;
  shippingCost?: number;
  createdAt: string;
  isSimulasi: true;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

// ── Destination ───────────────────────────────────────────────
export interface Destination {
  id: string;
  name: string;
  desa: string;
  kabupaten: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  activities: Activity[];
  highlights: string[];
  capacity: number; // kuota harian simulasi
  duration: string;
  price: number; // simulasi
  guideAvailable: boolean;
  isSimulasi: true;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
}

// ── Booking ───────────────────────────────────────────────────
export type BookingStatus = 'menunggu' | 'dikonfirmasi' | 'selesai' | 'dibatalkan';

export interface Booking {
  id: string;
  destinationId: string;
  destinationName: string;
  customer: CustomerInfo;
  date: string;
  participants: number;
  activities: string[];
  totalPrice: number; // simulasi
  status: BookingStatus;
  createdAt: string;
  isSimulasi: true;
}

// ── Conservation Program ──────────────────────────────────────
export interface ConservationProgram {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  target: string;
  progress: number; // 0-100
  unit: string;
  category: ConservationCategory;
  image: string;
  activities: string[];
  isSimulasi: true;
}

export type ConservationCategory =
  | 'penanaman'
  | 'patroli'
  | 'rafflesia'
  | 'habitat'
  | 'edukasi';

export const CONSERVATION_CATEGORIES: Record<ConservationCategory, string> = {
  penanaman: 'Penanaman Pohon',
  patroli: 'Patroli Hutan',
  rafflesia: 'Konservasi Rafflesia',
  habitat: 'Pemulihan Habitat',
  edukasi: 'Edukasi Lingkungan',
};

// ── Conservation Contribution ─────────────────────────────────
export interface Contribution {
  id: string;
  programId: string;
  programName: string;
  contributor: string;
  amount: number; // simulasi
  note?: string;
  createdAt: string;
  isSimulasi: true;
}

// ── Lumbung Wana ──────────────────────────────────────────────
export type LumbungTransactionType =
  | 'pendapatan-wisata'
  | 'pendapatan-produk'
  | 'kontribusi-konservasi'
  | 'alokasi-pangan'
  | 'alokasi-konservasi'
  | 'pengeluaran-darurat';

export interface LumbungTransaction {
  id: string;
  type: LumbungTransactionType;
  description: string;
  amount: number; // simulasi
  fund: 'cadangan-pangan' | 'konservasi' | 'operasional';
  createdAt: string;
  isSimulasi: true;
}

export const LUMBUNG_FUND_LABELS: Record<LumbungTransaction['fund'], string> = {
  'cadangan-pangan': 'Cadangan Pangan',
  'konservasi': 'Dana Konservasi',
  'operasional': 'Operasional Desa',
};

// ── Food Reserve ──────────────────────────────────────────────
export interface FoodReserve {
  id: string;
  komoditas: string;
  quantity: number;
  unit: string;
  lastUpdated: string;
  isSimulasi: true;
}

// ── Toast ─────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}
