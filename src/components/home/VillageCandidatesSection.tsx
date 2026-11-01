import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, TreePine, Users, Mountain } from 'lucide-react';
import { destinations } from '@/data/destinations';

export function VillageCandidatesSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nature-dots opacity-40" />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sage/10 blur-3xl" />

      <div className="container-base relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in-up">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-4">
              <Mountain size={12} />
              Desa Kandidat Pengembangan
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest mb-3 leading-tight">
              Potensi Agroforestri
              <br />
              <span className="gradient-text-green">Dataran Tinggi Bengkulu</span>
            </h2>
            <p className="text-slate-600 max-w-lg text-sm md:text-base leading-relaxed">
              Mengeksplorasi bentang alam, keragaman vegetasi kebun hutan, dan kearifan masyarakat lokal di Kabupaten Kepahiang dan Rejang Lebong.
            </p>
          </div>
          <Link
            to="/wisata"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-forest text-forest font-bold text-sm hover:bg-forest hover:text-white transition-all"
          >
            Lihat Seluruh Destinasi
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 animate-fade-in">
          <span className="shrink-0 mt-0.5 px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase tracking-wider">
            Catatan
          </span>
          <p className="leading-relaxed">
            Desa-desa ini merupakan <strong>kandidat potensi pengembangan</strong> berdasarkan kajian agroforestri dataran tinggi Bengkulu, bukan mitra resmi terikat secara kelembagaan.
          </p>
        </div>

        {/* Village Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((village, i) => (
            <div
              key={village.id}
              className="group card-nature flex flex-col overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden img-zoom">
                <img
                  src={village.image}
                  alt={`Potensi agroforestri ${village.name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Location badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold border border-white/20">
                    <MapPin size={9} className="text-sage" />
                    Kab. {village.kabupaten}
                  </span>
                </div>

                {/* Village name overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-extrabold text-lg text-white leading-tight drop-shadow-lg">
                    {village.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                  {village.description}
                </p>

                <div className="space-y-2 mb-5 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <TreePine size={13} className="text-forest shrink-0" />
                    <span className="truncate font-medium">{village.activities[0]?.name || 'Agroforestri Kebun Hutan'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={13} className="text-forest/60 shrink-0" />
                    <span>Kapasitas {village.capacity} orang/hari (simulasi)</span>
                  </div>
                </div>

                <Link
                  to="/wisata"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-forest/20 text-forest text-xs font-bold hover:bg-forest hover:text-white hover:border-forest group/btn transition-all duration-250"
                >
                  Jelajahi Potensi Desa
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VillageCandidatesSection;
