import { Link } from 'react-router-dom';
import { Compass, ShoppingBag, ShieldCheck, Landmark, ArrowRight, Sparkles } from 'lucide-react';

const ECOSYSTEM_ELEMENTS = [
  {
    id: 'wisata',
    title: 'Wisata Kebun Hutan',
    tagline: 'Forest Agroecotourism',
    description:
      'Aktivitas wisata berbasis agroforestri — petik kopi, menyadap nira aren, mengenali tanaman hutan, dan edukasi lingkungan bersama petani lokal.',
    icon: Compass,
    link: '/wisata',
    linkText: 'Jelajahi Paket Wisata',
    gradient: 'from-emerald-500 to-forest',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/60',
    hoverBorder: 'hover:border-emerald-400',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-forest',
    tag: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    number: '01',
  },
  {
    id: 'pangan',
    title: 'Pangan Lokal Bernilai Tambah',
    tagline: 'Local Food Products',
    description:
      'Hilirisasi 4 komoditas unggulan Bengkulu — Kopi Robusta, Gula Aren, olahan Rebung, dan Kolang-kaling — untuk nilai tambah ekonomi masyarakat desa hutan.',
    icon: ShoppingBag,
    link: '/produk',
    linkText: 'Lihat Katalog Produk',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200/60',
    hoverBorder: 'hover:border-amber-400',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    tag: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
    number: '02',
  },
  {
    id: 'konservasi',
    title: 'Jasa Lingkungan & Konservasi',
    tagline: 'Environmental Services',
    description:
      'Pelestarian ekosistem melalui penanaman pohon pangan, patroli hutan, perlindungan sumber air, dan pemulihan inang bunga Rafflesia arnoldii.',
    icon: ShieldCheck,
    link: '/konservasi',
    linkText: 'Program Konservasi',
    gradient: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200/60',
    hoverBorder: 'hover:border-teal-400',
    iconBg: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    tag: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
    number: '03',
  },
  {
    id: 'lumbung',
    title: 'Lumbung Wana',
    tagline: 'Community Food Reserve',
    description:
      'Cadangan pangan desa dan alokasi dana darurat dari perputaran ecopreneurship — mewujudkan transparansi ketahanan pangan saat paceklik.',
    icon: Landmark,
    link: '/lumbung',
    linkText: 'Dashboard Lumbung',
    gradient: 'from-stone-500 to-stone-700',
    bg: 'bg-stone-50',
    border: 'border-stone-200/60',
    hoverBorder: 'hover:border-stone-400',
    iconBg: 'bg-gradient-to-br from-stone-400 to-stone-600',
    tag: { bg: 'bg-stone-100', text: 'text-stone-700', border: 'border-stone-300' },
    number: '04',
  },
];

export function EcosystemSection() {
  return (
    <section id="ekosistem" className="section-padding bg-beige relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-nature-dots opacity-60" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sage/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-forest/6 blur-3xl" />

      <div className="container-base relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/8 border border-forest/15 text-[11px] font-bold text-forest uppercase tracking-widest mb-5">
            <Sparkles size={12} />
            Empat Pilar Ecopreneurship
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-5 leading-tight">
            Ekosistem yang Menghidupkan
            <br className="hidden md:inline" />
            <span className="gradient-text-green"> Potensi Desa Hutan</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Wana Pangan merajut harmoni antara penciptaan nilai ekonomi masyarakat
            dan komitmen konservasi hutan dataran tinggi Bengkulu.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_ELEMENTS.map((elem, idx) => {
            const Icon = elem.icon;
            return (
              <div
                key={elem.id}
                className={`group card-nature border-2 ${elem.border} ${elem.hoverBorder} flex flex-col justify-between p-6 animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[10px] font-black tracking-widest uppercase ${elem.tag.text}`}>
                      Pilar {elem.number}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${elem.tag.bg} ${elem.tag.text} ${elem.tag.border}`}>
                      {elem.tagline}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${elem.iconBg} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
                    <Icon size={26} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-forest mb-3 leading-snug group-hover:text-forest-mid transition-colors">
                    {elem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {elem.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-slate-100/80">
                  <Link
                    to={elem.link}
                    className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-forest-mid group/link transition-colors"
                  >
                    <span>{elem.linkText}</span>
                    <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Synergy Banner */}
        <div className="mt-12 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-forest via-forest-mid to-forest p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* Background dots */}
            <div className="absolute inset-0 bg-nature-dots opacity-20" />
            <div className="relative text-center md:text-left">
              <h4 className="text-lg md:text-xl font-extrabold text-white mb-2">
                Mekanisme yang Berkelanjutan & Terintegrasi
              </h4>
              <p className="text-sm text-sage-light/85 max-w-xl leading-relaxed">
                Setiap pembelian produk dan partisipasi wisata menyisihkan kontribusi untuk
                dana konservasi dan cadangan Lumbung Wana masyarakat — terpisah dan transparan.
              </p>
            </div>
            <Link to="/lumbung" className="relative shrink-0">
              <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white text-forest font-bold text-sm shadow-xl hover:bg-beige transition-all duration-300 hover:scale-105">
                Pelajari Alur Lumbung
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcosystemSection;
