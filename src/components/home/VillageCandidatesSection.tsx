import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, TreePine, Users } from 'lucide-react';
import { SectionHeader, Badge, Button } from '@/components/ui';
import { destinations } from '@/data/destinations';

export function VillageCandidatesSection() {
  return (
    <section className="section-padding bg-white relative">
      <div className="container-base">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            tag="Desa Kandidat Pengembangan"
            title="Potensi Agroforestri Dataran Tinggi Bengkulu"
            subtitle="Mengeksplorasi bentang alam, keragaman vegetasi kebun hutan, dan kearifan masyarakat lokal di Kabupaten Kepahiang dan Rejang Lebong."
          />
          <div className="shrink-0">
            <Link to="/wisata">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight size={16} />}>
                Lihat Seluruh Destinasi
              </Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mb-8 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-900">
          <span className="font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] uppercase tracking-wide shrink-0">
            Catatan Status
          </span>
          <p>
            Desa-desa di bawah ini merupakan <strong>desa kandidat potensi pengembangan</strong>{' '}
            berdasarkan kajian esai agroforestri dataran tinggi Bengkulu, bukan mitra resmi terikat secara kelembagaan.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((village) => (
            <div
              key={village.id}
              className="group flex flex-col justify-between bg-beige/40 rounded-2xl overflow-hidden border border-sage/20 hover:border-forest/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={village.image}
                  alt={`Potensi agroforestri ${village.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Location Badge on Top */}
                <div className="absolute top-3 left-3">
                  <Badge variant="forest" size="sm" className="bg-deep/80 text-white backdrop-blur-xs border-white/20">
                    <MapPin size={12} className="inline mr-1 text-sage" />
                    Kab. {village.kabupaten}
                  </Badge>
                </div>

                {/* Village Title on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-lg leading-tight drop-shadow-xs">{village.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-ink-light/80 line-clamp-3 mb-4 leading-relaxed">
                    {village.description}
                  </p>

                  {/* Highlights / Activities list */}
                  <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-200/60">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <TreePine size={14} className="text-forest shrink-0" />
                      <span className="truncate">{village.activities[0]?.name || 'Agroforestri Kebun Hutan'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Users size={14} className="text-forest shrink-0" />
                      <span>Kapasitas {village.capacity} orang/hari (simulasi)</span>
                    </div>
                  </div>
                </div>

                {/* Footer Link Button */}
                <div className="pt-2">
                  <Link to="/wisata" className="block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-semibold justify-center group-hover:bg-forest group-hover:text-white transition-all"
                      rightIcon={<ArrowRight size={14} />}
                    >
                      Jelajahi Potensi Desa
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VillageCandidatesSection;
