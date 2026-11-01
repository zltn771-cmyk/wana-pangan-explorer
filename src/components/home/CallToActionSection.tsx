import { Link } from 'react-router-dom';
import { Compass, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export function CallToActionSection() {
  return (
    <section className="section-padding bg-deep text-white relative overflow-hidden">
      {/* Subtle organic pattern background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8FAF91_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container-base relative z-10 text-center max-w-4xl mx-auto">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-sage border border-white/20 mb-6">
          Bergabung Bersama Ekosistem Desa Hutan
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
          Ambil Bagian dalam Penguatan Ekonomi & Pelestarian Alam
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
          Dari secangkir kopi berpayung kanopi pohon hingga paket edukasi agroforestri,
          setiap langkah interaksi Anda turut merawat hutan dan menjamin ketahanan pangan masyarakat dataran tinggi.
        </p>

        {/* 3 Action Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          <Link
            to="/wisata"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-sage/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-sage mb-3">
                <Compass size={20} />
              </div>
              <h3 className="font-bold text-base text-white mb-1 group-hover:text-sage transition-colors">
                Wisata Kebun Hutan
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Kunjungi desa-desa agroforestri, nikmati panen kopi dan keasrian alam perbukitan.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sage">
              <span>Pesan Pengalaman</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/produk"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-amber-300/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-amber-300 mb-3">
                <ShoppingBag size={20} />
              </div>
              <h3 className="font-bold text-base text-white mb-1 group-hover:text-amber-300 transition-colors">
                Beli Produk Pangan
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Nikmati olahan kopi kurasi, gula aren alami, dan keripik rebung karya kelompok tani.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <span>Buka Marketplace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/konservasi"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-teal-300/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-teal-300 mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-base text-white mb-1 group-hover:text-teal-300 transition-colors">
                Dukung Konservasi
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Kenali program penanaman pohon pangan multi-manfaat dan perlindungan inang Rafflesia.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-300">
              <span>Pelajari Aksi</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Primary CTA Button */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4">
          <Link to="/wisata">
            <Button
              variant="primary"
              size="lg"
              className="bg-forest hover:bg-forest/80 text-white border border-sage/40 shadow-lg shadow-forest/50"
              rightIcon={<ArrowRight size={18} />}
            >
              Mulai Eksplorasi Sekarang
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20"
            >
              Masuk Dashboard Pengelola
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
