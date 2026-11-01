// ============================================================
// components/layout/Footer.tsx — Footer profesional WANA PANGAN
// ============================================================

import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────
const EKSPLORASI_LINKS = [
  { label: 'Beranda', to: '/' },
  { label: 'Wisata Kebun Hutan', to: '/wisata' },
  { label: 'Produk Pangan Lokal', to: '/produk' },
  { label: 'Jasa Lingkungan & Konservasi', to: '/konservasi' },
  { label: 'Lumbung Wana', to: '/lumbung' },
  { label: 'Dashboard Pengelola', to: '/dashboard' },
] as const;

const DESA_KANDIDAT = [
  { desa: 'Batu Ampar', kabupaten: 'Kabupaten Kepahiang' },
  { desa: 'Belitar Seberang', kabupaten: 'Kabupaten Rejang Lebong' },
  { desa: 'Sumber Urip', kabupaten: 'Kabupaten Rejang Lebong' },
  { desa: 'Ai Sempiang', kabupaten: 'Kabupaten Kepahiang' },
] as const;

// ── Column: Logo + tagline ────────────────────────────────────
function ColBrand() {
  return (
    <div className="flex flex-col gap-4">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2.5 select-none w-fit"
        aria-label="Beranda WANA PANGAN"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage to-forest shadow-md">
          <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} />
        </span>
        <span className="text-lg font-bold tracking-tight text-white">
          WANA PANGAN
        </span>
      </Link>

      {/* Tagline */}
      <p className="font-semibold italic text-sage text-base leading-snug">
        "Dari Hutan, Tumbuh Kehidupan"
      </p>

      {/* Short description */}
      <p className="text-xs leading-relaxed text-white/65">
        WANA PANGAN menghubungkan potensi agroforestri, pangan lokal, dan konservasi
        untuk membangun ekosistem ekonomi desa hutan yang lebih berkelanjutan di dataran tinggi Bengkulu.
      </p>

      {/* Official Simulation Disclaimer */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] leading-relaxed text-amber-300/90">
        WANA PANGAN merupakan prototipe ekosistem usaha desa hutan. Data dan transaksi yang ditampilkan bersifat simulasi. Aplikasi belum terhubung dengan sistem pembayaran, autentikasi pengguna, maupun basis data pengelola desa.
      </div>
    </div>
  );
}

// ── Column: Eksplorasi ────────────────────────────────────────
function ColEksplorasi() {
  return (
    <div>
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
        Navigasi Ekosistem
      </h4>
      <ul className="flex flex-col gap-2">
        {EKSPLORASI_LINKS.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="text-xs text-white/65 transition-colors hover:text-sage"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Column: Desa Kandidat ─────────────────────────────────────
function ColDesaKandidat() {
  return (
    <div>
      <div className="mb-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-white">
          Desa Kandidat
        </h4>
        <span className="text-[10px] text-sage font-medium">Model Potensi Pengembangan</span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {DESA_KANDIDAT.map(({ desa, kabupaten }) => (
          <li key={desa} className="border-b border-white/5 pb-1.5 last:border-0">
            <p className="text-xs font-medium text-white/80">{desa}</p>
            <p className="text-[10px] text-white/45">{kabupaten}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Column: Tentang ───────────────────────────────────────────
function ColTentang() {
  return (
    <div>
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
        Tentang Model Ecopreneurship
      </h4>
      <p className="text-xs leading-relaxed text-white/65">
        Mengintegrasikan 4 pilar sirkular: <strong>Ekowisata Agroforestri</strong>, <strong>Pangan Lokal Bernilai Tambah</strong>, <strong>Jasa Lingkungan & Konservasi</strong>, serta <strong>Lumbung Wana</strong> sebagai penyangga ketahanan pangan saat paceklik.
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-white/50">
        Kandidat desa dipilih berdasarkan karakteristik lanskap agroforestri kopi, gula aren, rebung, dan habitat satwa/flora dilindungi seperti Rafflesia arnoldii di Kepahiang dan Rejang Lebong.
      </p>
    </div>
  );
}

// ── Main Footer ───────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep" aria-label="Footer situs">
      {/* Top separator */}
      <div className="h-px bg-white/8" />

      {/* Main grid */}
      <div className="container-base py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ColBrand />
          <ColEksplorasi />
          <ColDesaKandidat />
          <ColTentang />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-base flex flex-col items-center justify-between gap-3 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/45">
            © {currentYear} WANA PANGAN. Hak cipta dilindungi undang-undang.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/40 bg-amber-900/20 px-2.5 py-0.5 text-amber-300 font-medium">
              ⚠ Mode Prototipe Simulasi — Tanpa Transaksi Finansial Riil
            </span>
          </p>
          <p className="flex items-center gap-1 text-xs text-white/30">
            Dibuat dengan <Heart className="h-3 w-3 text-red-400" /> untuk
            ekosistem desa hutan Bengkulu
          </p>
        </div>
      </div>
    </footer>
  );
}
