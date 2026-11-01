import { useState } from 'react';
import { modelComponents, lumbungWana, type ModelComponent } from '../data/constants';

// Ikon inline SVG untuk setiap komponen model
function TreeIcon({ className = 'w-8 h-8 text-forest' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2L6 9h3l-4 7h6v5h2v-5h6l-4-7h3L12 2z" />
    </svg>
  );
}

function CoffeeIcon({ className = 'w-8 h-8 text-coffee' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function LeafIcon({ className = 'w-8 h-8 text-earth' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function BarnIcon({ className = 'w-8 h-8 text-terracotta' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 20V9l9-6 9 6v11H3z" />
      <path d="M9 20v-7h6v7" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  );
}

export default function ModelSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Konfigurasi visual untuk masing-masing kartu komponen
  const getCardConfig = (id: string) => {
    switch (id) {
      case 'mesin1':
        return {
          containerClass: 'bg-forest/10 border-l-4 border-forest',
          icon: <TreeIcon className="w-8 h-8 text-forest shrink-0" />,
          accentText: 'text-forest-dark',
          flowText: 'Aliran Usaha 1 → Lumbung',
        };
      case 'mesin2':
        return {
          containerClass: 'bg-coffee/10 border-l-4 border-coffee',
          icon: <CoffeeIcon className="w-8 h-8 text-coffee shrink-0" />,
          accentText: 'text-coffee',
          flowText: 'Aliran Usaha 2 → Lumbung',
        };
      case 'mesin3':
        return {
          containerClass: 'bg-earth/10 border-l-4 border-earth',
          icon: <LeafIcon className="w-8 h-8 text-earth shrink-0" />,
          accentText: 'text-coffee',
          flowText: 'Aliran Jasa Lingkungan → Lumbung',
        };
      case 'lumbung':
      default:
        return {
          containerClass: 'bg-terracotta/10 border-l-4 border-terracotta',
          icon: <BarnIcon className="w-8 h-8 text-terracotta shrink-0" />,
          accentText: 'text-terracotta',
          flowText: 'Penyangga Ketahanan Pangan Desa',
        };
    }
  };

  const renderCard = (component: ModelComponent, extraClass = '') => {
    const isSelected = selectedId === component.id;
    const config = getCardConfig(component.id);

    return (
      <div
        key={component.id}
        onClick={() => toggleSelect(component.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSelect(component.id);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isSelected}
        className={`${config.containerClass} ${extraClass} rounded-r-xl shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer p-6 focus:outline-hidden focus:ring-2 focus:ring-forest/30`}
      >
        {/* Kepala Kartu: Ikon, Judul, Subjudul, dan Penanda Buka */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-white/70 shadow-xs shrink-0">
              {config.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${config.accentText}`}>
                  {component.title}
                </span>
                <span className="hidden sm:inline-block text-[11px] bg-white/80 px-2 py-0.5 rounded-full text-gray-600 font-medium border border-gray-200/50">
                  {config.flowText}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-dark mt-0.5">
                {component.subtitle}
              </h3>
            </div>
          </div>

          {/* Ikon Chevron Interaktif */}
          <div className="shrink-0 pt-1 text-gray-500">
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isSelected ? 'rotate-180 text-forest-dark' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Konten Terbuka dengan Transisi Halus (max-height & opacity) */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSelected
              ? 'max-h-[500px] opacity-100 mt-5 pt-4 border-t border-black/5'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-dark/80 mb-2">
              Kegiatan Inti:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-text-dark/90 leading-relaxed">
              {component.kegiatanInti.map((kegiatan, index) => (
                <li key={index}>{kegiatan}</li>
              ))}
            </ul>

            {/* Sorotan Dimensi Pangan */}
            <div className="mt-4 pt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-text-dark/70">
                Dimensi Pangan:
              </span>
              <span className="bg-forest text-cream px-3 py-1 rounded-full text-sm font-medium shadow-xs">
                {component.dimensiPangan}
              </span>
            </div>

            {/* Sumber Bukti */}
            <p className="mt-3 text-xs italic text-gray-500">
              Sumber bukti: {component.sumberBukti}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="model" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul & Subjudul Bagian */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-forest-dark text-3xl md:text-4xl font-bold tracking-tight">
            Model Wana Pangan
          </h2>
          <p className="mt-3 text-text-dark/80 text-base md:text-lg">
            Tiga mesin usaha terintegrasi dengan Lumbung Wana sebagai penyangga ketahanan pangan desa.
          </p>
          <p className="mt-1 text-xs text-coffee italic">
            Klik pada setiap kartu untuk mempelajari kegiatan inti, dimensi pangan, dan sumber buktinya.
          </p>
        </div>

        {/* Diagram Interaktif: Grid 2x2 Desktop dengan Lumbung Wana Membentang Penuh di Bawah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Mesin 1: Wisata Kebun Hutan */}
          {renderCard(modelComponents[0])}

          {/* Mesin 2: Pangan Lokal Bernilai Tambah */}
          {renderCard(modelComponents[1])}

          {/* Mesin 3: Jasa Lingkungan (Dipusatkan di baris tengah) */}
          {renderCard(
            modelComponents[2],
            'md:col-span-2 md:max-w-xl md:mx-auto w-full'
          )}

          {/* Garis / Panah Penghubung Arus Antara 3 Mesin dan Lumbung Wana */}
          <div
            className="md:col-span-2 flex flex-col items-center justify-center my-1 text-center"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-coffee bg-cream px-4 py-1.5 rounded-full border border-coffee/20 shadow-xs">
              <svg
                className="w-4 h-4 text-forest shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Iuran konservasi, pasokan produk, dan dividen surplus usaha</span>
              <svg
                className="w-4 h-4 text-terracotta shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Lumbung Wana: Penyangga Ketahanan Pangan Desa (Membentang Penuh di Bawah) */}
          {renderCard(lumbungWana, 'md:col-span-2')}
        </div>
      </div>
    </section>
  );
}
