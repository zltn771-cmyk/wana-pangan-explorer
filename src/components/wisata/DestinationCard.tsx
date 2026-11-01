import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, Compass, ArrowRight, TreePine } from 'lucide-react';
import { Button, Badge, SimulasiLabel } from '@/components/ui';
import type { Destination } from '@/types';
import { formatRupiah } from '@/utils/format';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      {/* Visual Header & Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="forest" size="sm" className="bg-deep/85 text-white backdrop-blur-xs border-white/20">
            <MapPin size={11} className="inline mr-1 text-sage" />
            Kab. {destination.kabupaten}
          </Badge>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/90 text-white backdrop-blur-xs shadow-xs">
            Desa Kandidat
          </span>
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl font-bold leading-tight drop-shadow-xs">{destination.name}</h3>
          <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
            <TreePine size={13} className="text-sage" />
            <span>Kawasan Agroforestri Bengkulu</span>
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {destination.description}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2 py-3 px-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-forest shrink-0" />
              <span>{destination.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-forest shrink-0" />
              <span>Kuota: {destination.capacity} org/hari</span>
            </div>
          </div>

          {/* Activities list preview */}
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Aktivitas Pilihan
            </p>
            <div className="space-y-1.5">
              {destination.activities.slice(0, 3).map((act) => (
                <div key={act.id} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                  <span className="truncate">{act.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">({act.duration})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-400">Mulai dari</div>
            <div className="text-base font-bold text-forest">
              {formatRupiah(destination.price)}
              <span className="text-xs font-normal text-slate-500"> / org</span>
            </div>
            <div className="mt-0.5">
              <SimulasiLabel text="Paket Simulasi" />
            </div>
          </div>

          <Link to={`/wisata/${destination.id}`}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight size={14} />}>
              Lihat Detail
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
