import { Link } from 'react-router-dom';
import { Compass, ShoppingBag, ShieldCheck, Landmark, ArrowRight } from 'lucide-react';
import { SectionHeader, Card } from '@/components/ui';

interface EcosystemElement {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Compass;
  link: string;
  linkText: string;
  colorScheme: {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    borderHover: string;
  };
}

const ECOSYSTEM_ELEMENTS: EcosystemElement[] = [
  {
    id: 'wisata',
    title: 'Wisata Kebun Hutan',
    tagline: 'Forest Agroecotourism',
    description:
      'Aktivitas wisata berbasis agroforestri yang menyajikan pengalaman petik kopi, menyadap nira aren, mengenali tanaman hutan, dan edukasi lingkungan hidup langsung bersama petani lokal.',
    icon: Compass,
    link: '/wisata',
    linkText: 'Jelajahi Paket Wisata',
    colorScheme: {
      iconBg: 'bg-emerald-100',
      iconColor: 'text-forest',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-forest',
      borderHover: 'hover:border-forest',
    },
  },
  {
    id: 'pangan',
    title: 'Pangan Lokal Bernilai Tambah',
    tagline: 'Local Food Products',
    description:
      'Pengolahan dan hilirisasi 4 komoditas unggulan agroforestri Bengkulu — Kopi Robusta Bengkulu, Gula Aren cetak dan semut, olahan Rebung bambu, serta Kolang-kaling buah aren — untuk meningkatkan nilai tambah ekonomi masyarakat desa.',
    icon: ShoppingBag,
    link: '/produk',
    linkText: 'Lihat Katalog Produk',
    colorScheme: {
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-800',
      badgeBg: 'bg-amber-50 border-amber-200',
      badgeText: 'text-amber-800',
      borderHover: 'hover:border-amber-600',
    },
  },
  {
    id: 'konservasi',
    title: 'Jasa Lingkungan & Konservasi',
    tagline: 'Environmental Services',
    description:
      'Kontribusi nyata pelestarian ekosistem melalui penanaman pohon pangan multi-manfaat, patroli mandiri hutan oleh warga, perlindungan sumber air bersih, dan pemulihan inang bunga Rafflesia arnoldii.',
    icon: ShieldCheck,
    link: '/konservasi',
    linkText: 'Pelajari Program Konservasi',
    colorScheme: {
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-800',
      badgeBg: 'bg-teal-50 border-teal-200',
      badgeText: 'text-teal-800',
      borderHover: 'hover:border-teal-600',
    },
  },
  {
    id: 'lumbung',
    title: 'Lumbung Wana',
    tagline: 'Community Food Reserve',
    description:
      'Mekanisme pengelolaan cadangan pangan desa dan alokasi dana darurat dari perputaran ekonomi ecopreneurship, mewujudkan transparansi tata kelola demi ketahanan pangan saat paceklik atau gagal panen.',
    icon: Landmark,
    link: '/lumbung',
    linkText: 'Buka Dashboard Lumbung',
    colorScheme: {
      iconBg: 'bg-stone-200',
      iconColor: 'text-stone-800',
      badgeBg: 'bg-stone-100 border-stone-300',
      badgeText: 'text-stone-800',
      borderHover: 'hover:border-stone-600',
    },
  },
];

export function EcosystemSection() {
  return (
    <section id="ekosistem" className="section-padding bg-beige relative">
      <div className="container-base">
        {/* Section Title Header */}
        <SectionHeader
          tag="Empat Pilar Ecopreneurship"
          title="Ekosistem yang Menghidupkan Potensi Desa Hutan"
          subtitle="Wana Pangan merajut harmoni antara penciptaan nilai ekonomi bagi masyarakat desa dan komitmen konservasi hutan dataran tinggi Bengkulu."
          align="center"
          className="mb-14"
        />

        {/* 4 Pillars Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_ELEMENTS.map((elem, idx) => {
            const Icon = elem.icon;
            return (
              <Card
                key={elem.id}
                variant="default"
                padding="lg"
                hover
                className={`flex flex-col justify-between transition-all duration-300 border-2 border-transparent ${elem.colorScheme.borderHover} shadow-sm`}
              >
                <div>
                  {/* Top Header Pill & Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${elem.colorScheme.badgeBg} ${elem.colorScheme.badgeText}`}
                    >
                      Pilar 0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-ink-light/60 tracking-wider">
                      {elem.tagline}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${elem.colorScheme.iconBg} ${elem.colorScheme.iconColor} shadow-xs`}
                  >
                    <Icon size={28} strokeWidth={2} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-forest mb-3 leading-snug">{elem.title}</h3>
                  <p className="text-sm text-ink-light/80 leading-relaxed mb-6">
                    {elem.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={elem.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-deep group transition-colors"
                  >
                    <span>{elem.linkText}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Ecosystem Synergy Callout Banner */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-white border border-sage/30 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base md:text-lg font-bold text-forest">
              Mekanisme yang Berkelanjutan & Terintegrasi
            </h4>
            <p className="text-xs md:text-sm text-ink-light/80 max-w-2xl">
              Setiap pembelian produk pangan lokal dan partisipasi paket wisata menyisihkan kontribusi
              terpisah untuk dana konservasi pohon pangan dan cadangan Lumbung Wana masyarakat desa.
            </p>
          </div>
          <Link to="/lumbung" className="shrink-0">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-5 py-2.5 rounded-xl bg-forest text-white hover:bg-deep transition-colors shadow-xs">
              Pelajari Alur Lumbung
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EcosystemSection;
