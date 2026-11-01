import { Link } from 'react-router-dom';
import { Compass, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const ACTIONS = [
  {
    to: '/wisata',
    icon: Compass,
    iconColor: 'text-sage',
    hoverBorder: 'hover:border-sage/60',
    label: 'Wisata Kebun Hutan',
    labelColor: 'group-hover:text-sage',
    desc: 'Kunjungi desa-desa agroforestri, nikmati panen kopi dan keasrian alam perbukitan.',
    cta: 'Pesan Pengalaman',
    ctaColor: 'text-sage',
  },
  {
    to: '/produk',
    icon: ShoppingBag,
    iconColor: 'text-amber-300',
    hoverBorder: 'hover:border-amber-300/60',
    label: 'Beli Produk Pangan',
    labelColor: 'group-hover:text-amber-300',
    desc: 'Nikmati kopi kurasi, gula aren alami, dan olahan rebung dari kebun hutan Bengkulu.',
    cta: 'Buka Marketplace',
    ctaColor: 'text-amber-300',
  },
  {
    to: '/konservasi',
    icon: ShieldCheck,
    iconColor: 'text-teal-300',
    hoverBorder: 'hover:border-teal-300/60',
    label: 'Dukung Konservasi',
    labelColor: 'group-hover:text-teal-300',
    desc: 'Kenali program penanaman pohon pangan dan perlindungan inang Rafflesia arnoldii.',
    cta: 'Pelajari Aksi',
    ctaColor: 'text-teal-300',
  },
];

export function CallToActionSection() {
  return (
    <section className="section-padding bg-deep text-white relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#90c490_1px,transparent_1px)] [background-size:28px_28px]" />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-forest/25 blur-3xl" />
      </div>

      <div className="container-base relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sage text-xs font-bold uppercase tracking-widest border-sage/25 mb-7 animate-fade-in">
          <Sparkles size={12} className="text-sage animate-pulse-soft" />
          Bergabung Bersama Ekosistem Desa Hutan
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-5 animate-fade-in-up font-display">
          Ambil Bagian dalam{' '}
          <span className="gradient-text-forest">Penguatan Ekonomi</span>
          <br />
          & Pelestarian Alam
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in delay-100">
          Dari secangkir kopi berpayung kanopi pohon hingga paket edukasi agroforestri,
          setiap interaksi Anda turut merawat hutan dan menjamin ketahanan pangan masyarakat dataran tinggi.
        </p>

        {/* 3 Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left animate-fade-in-up delay-150">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.to}
                to={a.to}
                className={`p-6 rounded-2xl glass border-white/10 ${a.hoverBorder} hover:bg-white/12 transition-all duration-300 group flex flex-col justify-between`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-forest flex items-center justify-center mb-4">
                    <Icon size={20} className={a.iconColor} />
                  </div>
                  <h3 className={`font-bold text-base text-white mb-2 transition-colors ${a.labelColor}`}>
                    {a.label}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">{a.desc}</p>
                </div>
                <div className={`mt-5 flex items-center gap-1.5 text-xs font-bold ${a.ctaColor}`}>
                  <span>{a.cta}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
          <Link to="/wisata">
            <button className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-forest-mid to-forest text-white font-bold text-base shadow-xl shadow-forest/40 hover:brightness-110 hover:scale-105 transition-all btn-glow">
              Mulai Eksplorasi Sekarang
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl glass text-white font-bold text-base border-white/25 hover:bg-white/18 transition-all">
              Masuk Dashboard Pengelola
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
