import { Link } from 'react-router-dom';
import { Leaf, Heart, MapPin, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Beranda', to: '/' },
  { label: 'Wisata Kebun Hutan', to: '/wisata' },
  { label: 'Produk Pangan Lokal', to: '/produk' },
  { label: 'Jasa Lingkungan & Konservasi', to: '/konservasi' },
  { label: 'Lumbung Wana', to: '/lumbung' },
  { label: 'Dashboard Pengelola', to: '/dashboard' },
];

const DESA_KANDIDAT = [
  { desa: 'Batu Ampar', kabupaten: 'Kab. Kepahiang' },
  { desa: 'Belitar Seberang', kabupaten: 'Kab. Rejang Lebong' },
  { desa: 'Sumber Urip', kabupaten: 'Kab. Rejang Lebong' },
  { desa: 'Ai Sempiang', kabupaten: 'Kab. Kepahiang' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-canopy text-white relative overflow-hidden" aria-label="Footer situs">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[30px]">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z" fill="#f7f3eb" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-forest/20 blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-sage/8 blur-3xl -translate-y-1/2" />
      </div>

      <div className="container-base relative pt-20 pb-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {/* Brand Column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 select-none w-fit group" aria-label="Beranda WANA PANGAN">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage via-forest to-deep shadow-xl shadow-forest/40 group-hover:scale-105 transition-transform">
                <Leaf className="h-6 w-6 text-white" strokeWidth={2.2} />
              </span>
              <div>
                <div className="text-[10px] font-semibold tracking-[0.2em] text-sage/70 uppercase">Platform Ecopreneurship</div>
                <div className="text-xl font-extrabold tracking-wide leading-none">
                  <span className="gradient-text-forest">WANA</span>{' '}
                  <span className="text-white">PANGAN</span>
                </div>
              </div>
            </Link>

            <p className="font-semibold italic text-sage text-sm leading-snug">
              "Dari Hutan, Tumbuh Kehidupan."
            </p>

            <p className="text-xs leading-relaxed text-white/55">
              Prototipe ekosistem ecopreneurship desa hutan Bengkulu — menghubungkan agroforestri,
              pangan lokal, dan konservasi untuk pembangunan berkelanjutan.
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-950/50 border border-amber-700/30 text-[10px] leading-relaxed text-amber-300/85">
              ⚠ Prototipe simulasi — data dan transaksi bersifat ilustrasi pengembangan.
              Belum terhubung sistem pembayaran atau autentikasi nyata.
            </div>
          </div>

          {/* Nav Column */}
          <div>
            <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-sage/80">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-[13px] text-white/55 hover:text-sage transition-colors duration-200"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-sage" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desa Kandidat Column */}
          <div>
            <div className="mb-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-sage/80">
                Desa Kandidat
              </h4>
              <span className="text-[10px] text-sage/60 font-medium">Model Potensi Pengembangan</span>
            </div>
            <ul className="flex flex-col gap-3">
              {DESA_KANDIDAT.map(({ desa, kabupaten }) => (
                <li key={desa} className="flex items-start gap-2.5 pb-2.5 border-b border-white/6 last:border-0">
                  <MapPin size={12} className="text-sage/50 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[13px] font-semibold text-white/80">{desa}</p>
                    <p className="text-[10px] text-white/40">{kabupaten}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-sage/80">
              Tentang Model
            </h4>
            <p className="text-[12px] leading-relaxed text-white/55 mb-3">
              Mengintegrasikan 4 pilar sirkular:{' '}
              <span className="text-sage/85 font-semibold">Ekowisata Agroforestri</span>,{' '}
              <span className="text-sage/85 font-semibold">Pangan Lokal</span>,{' '}
              <span className="text-sage/85 font-semibold">Jasa Lingkungan</span>, dan{' '}
              <span className="text-sage/85 font-semibold">Lumbung Wana</span> sebagai penyangga ketahanan pangan.
            </p>
            <p className="text-[11px] leading-relaxed text-white/40">
              Kandidat desa dipilih berdasarkan karakteristik lanskap agroforestri kopi, gula aren, rebung, dan habitat Rafflesia arnoldii di Kepahiang & Rejang Lebong.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-white/35">
            © {year} WANA PANGAN. Hak cipta dilindungi.
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-white/30">
            Dibuat dengan <Heart className="h-3 w-3 text-red-400/70 fill-current" /> untuk ekosistem desa hutan Bengkulu
          </p>
        </div>
      </div>
    </footer>
  );
}
