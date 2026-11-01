import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-deep text-white">
      {/* Background Image with Dark Forest Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80"
          alt="Lanskap perkebunan agroforestri dan perbukitan dataran tinggi Bengkulu"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-soft"
          style={{ animationDuration: '10s' }}
        />
        {/* Deep Green & Forest Gradient Overlays for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-forest/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/60" />
      </div>

      {/* Hero Content */}
      <div className="container-base relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Concept Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm text-sage font-medium mb-6 animate-fade-in">
          <Sparkles size={14} className="text-sage" />
          <span>Platform Digital Ecopreneurship Desa Hutan Bengkulu</span>
        </div>

        {/* Headline Utama */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-4xl text-white mb-6 animate-fade-in-up">
          Dari Hutan, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sage via-emerald-200 to-white bg-clip-text text-transparent">
            Tumbuh Kehidupan.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl font-normal leading-relaxed mb-10 delay-100 animate-fade-in-up">
          Wana Pangan menghubungkan potensi agroforestri, pangan lokal, dan konservasi untuk
          membangun ekosistem ekonomi desa hutan yang lebih berkelanjutan.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto delay-200 animate-fade-in-up">
          <a href="#ekosistem" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-forest/40 bg-forest hover:bg-forest/80 text-white border border-sage/30"
              rightIcon={<ArrowRight size={18} />}
            >
              Jelajahi Ekosistem
            </Button>
          </a>
          <Link to="/produk" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30"
              leftIcon={<ShoppingBag size={18} className="text-sage" />}
            >
              Temukan Produk Lokal
            </Button>
          </Link>
        </div>

        {/* Core Value Micro Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 pt-10 border-t border-white/10 w-full max-w-4xl text-left delay-300 animate-fade-in">
          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-sage text-xs font-semibold uppercase tracking-wider mb-1">
              <Compass size={14} />
              <span>Agroforestri</span>
            </div>
            <p className="text-sm font-bold text-white">4 Desa Kandidat</p>
            <p className="text-xs text-white/60">Kepahiang & Rejang Lebong</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-sage text-xs font-semibold uppercase tracking-wider mb-1">
              <ShoppingBag size={14} />
              <span>Pangan Lokal</span>
            </div>
            <p className="text-sm font-bold text-white">4 Komoditas Unggul</p>
            <p className="text-xs text-white/60">Kopi, Aren, Rebung, Kolang-kaling</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-sage text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck size={14} />
              <span>Konservasi</span>
            </div>
            <p className="text-sm font-bold text-white">Jasa Lingkungan</p>
            <p className="text-xs text-white/60">Pohon Pangan & Inang Rafflesia</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-sage text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Lumbung Wana</span>
            </div>
            <p className="text-sm font-bold text-white">Cadangan Pangan</p>
            <p className="text-xs text-white/60">Penguatan Ekonomi Desa</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
