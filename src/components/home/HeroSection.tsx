import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Leaf, Star, ChevronDown } from 'lucide-react';

const stats = [
  { label: 'Desa Kandidat', value: '4', sub: 'Kepahiang & Rejang Lebong' },
  { label: 'Komoditas Unggul', value: '4+', sub: 'Kopi, Aren, Rebung, Kolang-kaling' },
  { label: 'Program Konservasi', value: '3', sub: 'Jasa Lingkungan Aktif' },
  { label: 'Lumbung Wana', value: '1', sub: 'Cadangan Pangan Desa' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-canopy text-white">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=85"
          alt="Lanskap agroforestri Bengkulu"
          className="w-full h-full object-cover object-center animate-pulse-soft"
          style={{ animationDuration: '12s' }}
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-canopy/98 via-deep/90 to-forest/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-canopy via-transparent to-canopy/50" />
        {/* Radial spotlight */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(26,92,58,0.15) 0%, transparent 70%)' }} />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-24 left-8 w-2 h-2 rounded-full bg-sage/40 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-16 w-3 h-3 rounded-full bg-sage/25 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-48 left-24 w-1.5 h-1.5 rounded-full bg-sage/35 animate-float" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-32 right-1/3 w-1 h-1 rounded-full bg-white/30 animate-float" style={{ animationDelay: '0.8s' }} />

      {/* Main Content */}
      <div className="container-base relative z-10 pt-28 pb-16 flex flex-col items-center text-center">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-sage/25 text-xs sm:text-sm text-sage font-semibold mb-8 animate-fade-in shadow-lg">
          <Leaf size={13} className="text-sage animate-leaf-wave" />
          <span>Platform Ecopreneurship Desa Hutan Bengkulu</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage/20 text-[10px] font-bold text-sage-light ml-1">
            <Star size={9} fill="currentColor" /> Prototipe
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] max-w-5xl mb-6 animate-fade-in-up">
          <span className="text-white">Dari Hutan,</span>
          <br />
          <span className="gradient-text-forest font-display italic">
            Tumbuh Kehidupan.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10 animate-fade-in-up delay-150">
          Menghubungkan potensi agroforestri, pangan lokal, dan konservasi untuk
          membangun ekosistem ekonomi desa hutan yang <em className="text-sage-light not-italic font-semibold">lebih berkelanjutan</em>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16 w-full sm:w-auto animate-fade-in-up delay-200">
          <a href="#ekosistem" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-forest-mid to-forest text-white shadow-xl shadow-forest/30 hover:shadow-forest/50 hover:brightness-110 transition-all duration-300 group btn-glow">
              Jelajahi Ekosistem
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
          <Link to="/produk" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base glass text-white hover:bg-white/20 transition-all duration-300 group border border-white/25">
              <ShoppingBag size={18} className="text-sage" />
              Produk Lokal Bengkulu
            </button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl animate-fade-in delay-300">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-4 md:p-5 text-left border-white/12 hover:bg-white/12 transition-all duration-300 group"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="text-2xl md:text-3xl font-extrabold text-white mb-0.5 stat-number group-hover:text-sage transition-colors">
                {s.value}
              </div>
              <div className="text-xs font-bold text-sage uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-[10px] text-white/50 leading-tight">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-fade-in delay-500">
        <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Gulir</span>
        <ChevronDown size={18} className="text-white/40 animate-float" />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]">
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#f7f3eb" />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
