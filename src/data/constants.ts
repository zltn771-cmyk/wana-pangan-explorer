// ========================================================================
// constants.ts — Semua data numerik dan tekstual dari brief
// Setiap angka HARUS memiliki properti `source` untuk label sumber.
// JANGAN membuat/memperkirakan angka di luar file ini.
// ========================================================================

export interface DataPoint {
  label: string;
  value: number;
  source: string;
}

// ---------- Prevalensi Ketidakcukupan Pangan (PoU) 2025 ----------
export const pouData: DataPoint[] = [
  { label: "Kota Bengkulu", value: 6.06, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Mukomuko", value: 6.75, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Bengkulu Selatan", value: 8.33, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Bengkulu Tengah", value: 9.17, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Kepahiang", value: 9.53, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Kaur", value: 9.62, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Seluma", value: 10.37, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Bengkulu Utara", value: 10.39, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Lebong", value: 10.79, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
  { label: "Rejang Lebong", value: 11.61, source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)" },
];

export const pouNasional: DataPoint = {
  label: "Rata-rata nasional",
  value: 7.89,
  source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)",
};

// Data PoU tahun sebelumnya (tersedia untuk desa kandidat)
export const pouHistoris: Record<string, DataPoint> = {
  kepahiang2024: {
    label: "Kepahiang 2024",
    value: 13.7,
    source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)",
  },
  lebong2024: {
    label: "Lebong 2024",
    value: 12.38,
    source: "BPS via Databoks Katadata (Fadhlurrahman, 2026)",
  },
};

// ---------- Kemiskinan Maret 2026 ----------
export const kemiskinan = {
  persentase: {
    value: 11.83,
    unit: "%",
    periode: "Maret 2026",
    source: "BPS via Databoks (Darmawan, 2026)",
  },
  totalMiskin: {
    value: 250.11,
    unit: "ribu jiwa",
    source: "BPS via Databoks (Darmawan, 2026)",
  },
  miskinPerdesaan: {
    value: 158.62,
    unit: "ribu jiwa",
    source: "BPS via Databoks (Darmawan, 2026)",
  },
};

// ---------- Wisata Bengkulu 2024 ----------
export const wisata = {
  kunjungan: {
    value: 4318981,
    label: "Total kunjungan",
    source: "Laporan Kinerja Dinas Pariwisata Provinsi Bengkulu 2024",
  },
  wisman: {
    value: 3742,
    label: "Wisatawan mancanegara",
    source: "Laporan Kinerja Dinas Pariwisata Provinsi Bengkulu 2024",
  },
  desaWisata: {
    value: 310,
    label: "Desa wisata teridentifikasi",
    source: "Laporan Kinerja Dinas Pariwisata Provinsi Bengkulu 2024",
  },
  lamaTinggal: {
    value: 1.45,
    unit: "hari",
    label: "Lama tinggal wisatawan",
    source: "Laporan Kinerja Dinas Pariwisata Provinsi Bengkulu 2024",
  },
};

// ---------- Komponen Model ----------
export interface ModelComponent {
  id: string;
  title: string;
  subtitle: string;
  kegiatanInti: string[];
  dimensiPangan: string;
  sumberBukti: string;
}

export const modelComponents: ModelComponent[] = [
  {
    id: "mesin1",
    title: "Mesin 1",
    subtitle: "Wisata Kebun Hutan",
    kegiatanInti: [
      "Paket petik kopi",
      "Sadap nira aren",
      "Olah rebung",
      "Tanam pohon",
      "Penginapan rumah warga",
      "Kuota dan pemandu lokal",
    ],
    dimensiPangan: "Akses — lewat pendapatan di luar kopi",
    sumberBukti: "Uji coba Batu Ampar (Supardi, 2021)",
  },
  {
    id: "mesin2",
    title: "Mesin 2",
    subtitle: "Pangan Lokal Bernilai Tambah",
    kegiatanInti: [
      "Kopi dengan merek kolektif",
      "Gula aren dengan merek kolektif",
      "Rebung dengan merek kolektif",
      "Kolang-kaling dengan merek kolektif",
      "Wirausaha muda sebagai pendamping usaha",
    ],
    dimensiPangan: "Akses dan stabilitas",
    sumberBukti: "Oktoyoki et al. (2025)",
  },
  {
    id: "mesin3",
    title: "Mesin 3",
    subtitle: "Jasa Lingkungan",
    kegiatanInti: [
      "Iuran konservasi",
      "Patroli warga",
      "Pemulihan inang Rafflesia",
      "Penanaman pohon pangan",
      "Kelak pembayaran jasa lingkungan",
    ],
    dimensiPangan: "Ketersediaan jangka panjang",
    sumberBukti: "Pergub Bengkulu 20/2022; Wunder et al. (2020)",
  },
];

export const lumbungWana: ModelComponent = {
  id: "lumbung",
  title: "Lumbung Wana",
  subtitle: "Dana & Cadangan Pangan Desa",
  kegiatanInti: [
    "Dana desa untuk ketahanan pangan",
    "Cadangan pangan desa",
    "Kebun agroforestri dengan tanaman pangan sela",
  ],
  dimensiPangan: "Ketersediaan dan stabilitas",
  sumberBukti: "Batu Ampar (Supardi, 2021)",
};

// ---------- Kegiatan Wisata (untuk konfigurator) ----------
export interface ActivityOption {
  id: string;
  label: string;
  dimensi: string[]; // ketersediaan, akses, stabilitas
  etika: string; // pengingat kode etik relevan
}

export const activityOptions: ActivityOption[] = [
  {
    id: "petik-kopi",
    label: "Petik kopi",
    dimensi: ["akses"],
    etika: "Hormati adat dan aturan desa.",
  },
  {
    id: "sadap-nira",
    label: "Sadap nira aren",
    dimensi: ["akses", "ketersediaan"],
    etika: "Tidak mengambil tumbuhan/satwa tanpa izin.",
  },
  {
    id: "olah-rebung",
    label: "Olah rebung",
    dimensi: ["akses", "ketersediaan"],
    etika: "Hormati adat dan aturan desa.",
  },
  {
    id: "tanam-pohon",
    label: "Tanam pohon",
    dimensi: ["ketersediaan", "stabilitas"],
    etika: "Ikuti arahan pemandu lokal.",
  },
  {
    id: "rafflesia",
    label: "Pengamatan terbatas habitat Rafflesia",
    dimensi: ["stabilitas"],
    etika: "Rafflesia hanya pengamatan terbatas. Tidak menyentuh atau merusak.",
  },
  {
    id: "menginap",
    label: "Menginap di rumah warga",
    dimensi: ["akses"],
    etika: "Hormati adat dan aturan desa. Bawa pulang sampah.",
  },
];

// ---------- Desa Kandidat ----------
export interface DesaKandidat {
  nama: string;
  kabupaten: string;
  fakta: string[];
}

export const desaKandidatList: DesaKandidat[] = [
  {
    nama: "Belitar Seberang",
    kabupaten: "Rejang Lebong",
    fakta: [
      "Kabupaten Rejang Lebong memiliki PoU 11,61% (2025)",
    ],
  },
  {
    nama: "Sumber Urip",
    kabupaten: "Rejang Lebong",
    fakta: [
      "Kabupaten Rejang Lebong memiliki PoU 11,61% (2025)",
    ],
  },
  {
    nama: "Batu Ampar",
    kabupaten: "Kepahiang",
    fakta: [
      "Lokasi uji coba wisata kebun hutan (Supardi, 2021)",
      "Kabupaten Kepahiang memiliki PoU 9,53% (2025)",
    ],
  },
  {
    nama: "Ai Sempiang",
    kabupaten: "Kepahiang",
    fakta: [
      "Kabupaten Kepahiang memiliki PoU 9,53% (2025)",
    ],
  },
  {
    nama: "Rindu Hati",
    kabupaten: "Bengkulu Tengah",
    fakta: [
      "Kabupaten Bengkulu Tengah memiliki PoU 9,17% (2025)",
    ],
  },
];

// ---------- Peta Jalan ----------
export interface RoadmapPhase {
  phase: string;
  period: string;
  items: string[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Tahap 1",
    period: "Bulan 1–6",
    items: [
      "Pemetaan potensi desa dan sumber daya alam",
      "Pembentukan kelompok kerja desa",
      "Pelatihan dasar pemandu lokal",
      "Penyusunan kode etik pengunjung",
      "Uji coba paket wisata kebun hutan skala kecil",
    ],
  },
  {
    phase: "Tahap 2",
    period: "Bulan 7–18",
    items: [
      "Pengembangan produk pangan lokal bermerek kolektif",
      "Pelatihan wirausaha muda pendamping usaha",
      "Penerapan sistem kuota dan pemantauan kunjungan",
      "Pembentukan Lumbung Wana di desa percontohan",
      "Pemulihan habitat inang Rafflesia",
    ],
  },
  {
    phase: "Tahap 3",
    period: "Bulan 19–36",
    items: [
      "Perluasan ke desa kandidat lainnya",
      "Pengajuan pembayaran jasa lingkungan",
      "Evaluasi dampak terhadap dimensi ketahanan pangan",
      "Dokumentasi model untuk replikasi",
      "Penguatan jejaring pemasaran pangan lokal",
    ],
  },
];

// ---------- Indikator Keberhasilan ----------
export const indikatorKeberhasilan: string[] = [
  "Peningkatan keragaman sumber pendapatan rumah tangga desa",
  "Peningkatan ketersediaan pangan lokal sepanjang tahun",
  "Terjaganya tutupan hutan di wilayah desa kandidat",
  "Terbentuknya kelompok usaha desa yang aktif mengelola produk pangan lokal",
  "Terlaksananya sistem kuota pengunjung dan pemandu lokal",
  "Bertambahnya populasi atau terjaganya habitat inang Rafflesia",
];

// ---------- Risiko & Mitigasi ----------
export interface RiskCard {
  risiko: string;
  mitigasi: string;
}

export const riskCards: RiskCard[] = [
  {
    risiko: "Konflik pemanfaatan lahan antara konservasi dan produksi",
    mitigasi: "Pendekatan partisipatif sejak awal; pemetaan tata guna lahan bersama warga dan pihak kehutanan.",
  },
  {
    risiko: "Kunjungan wisata melebihi daya dukung lingkungan",
    mitigasi: "Penetapan kuota harian ketat; pemantauan berkala dampak ekologis.",
  },
  {
    risiko: "Ketergantungan pada satu komoditas (kopi)",
    mitigasi: "Diversifikasi produk pangan lokal (gula aren, rebung, kolang-kaling) sejak tahap awal.",
  },
  {
    risiko: "Rendahnya partisipasi masyarakat lokal",
    mitigasi: "Pelibatan tokoh adat dan pemuda desa; manfaat ekonomi langsung dirasakan oleh rumah tangga.",
  },
];

// ---------- Kode Etik Pengunjung ----------
export const kodeEtik: string[] = [
  "Tidak mengambil tumbuhan atau satwa dari kawasan hutan.",
  "Mematuhi kuota harian kunjungan yang ditetapkan desa.",
  "Wajib didampingi pemandu lokal selama di kawasan.",
  "Rafflesia hanya untuk pengamatan terbatas — tidak menyentuh atau merusak.",
  "Membawa pulang seluruh sampah pribadi.",
  "Menghormati adat istiadat dan aturan desa setempat.",
];

// ---------- Sumber Data ----------
export const sumberData: string[] = [
  "BPS via Databoks Katadata — Fadhlurrahman (2026): Prevalensi Ketidakcukupan Pangan (PoU) menurut kabupaten/kota di Bengkulu, 2024–2025.",
  "BPS via Databoks — Darmawan (2026): Angka kemiskinan Provinsi Bengkulu, Maret 2026.",
  "Laporan Kinerja Dinas Pariwisata Provinsi Bengkulu (2024): Statistik kunjungan wisatawan, desa wisata, dan lama tinggal.",
  "Supardi (2021): Uji coba wisata kebun hutan di Desa Batu Ampar, Kepahiang.",
  "Oktoyoki et al. (2025): Pengembangan produk pangan lokal bernilai tambah di dataran tinggi Bengkulu.",
  "Peraturan Gubernur Bengkulu Nomor 20 Tahun 2022: Jasa lingkungan dan konservasi.",
  "Wunder et al. (2020): Pembayaran jasa lingkungan — prinsip dan praktik.",
];
