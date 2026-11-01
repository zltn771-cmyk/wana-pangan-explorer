import { ShieldCheck, Target, ArrowRight, HeartHandshake, Eye } from 'lucide-react';
import { Button, Badge, SimulasiLabel } from '@/components/ui';
import type { ConservationProgram } from '@/types';
import { CONSERVATION_CATEGORIES } from '@/types';

interface ConservationProgramCardProps {
  program: ConservationProgram;
  onOpenDetail: (program: ConservationProgram) => void;
  onOpenContribute: (program: ConservationProgram) => void;
}

export function ConservationProgramCard({
  program,
  onOpenDetail,
  onOpenContribute,
}: ConservationProgramCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      {/* Visual Header */}
      <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <Badge variant="forest" size="sm" className="bg-deep/85 text-white backdrop-blur-xs border-white/20">
            {CONSERVATION_CATEGORIES[program.category] || program.category}
          </Badge>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-xs">
            Rancangan Program
          </span>
        </div>

        {/* Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl font-bold leading-tight drop-shadow-xs">{program.name}</h3>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <p className="text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {program.description}
          </p>

          {/* Target Progress Bar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Target size={14} className="text-forest" />
                Target Rencana:
              </span>
              <strong className="text-slate-800 font-bold">{program.target}</strong>
            </div>

            {/* Progress track */}
            <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-700"
                style={{ width: `${program.progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>Progres percontohan: {program.progress}%</span>
              <SimulasiLabel text="Target Simulasi" />
            </div>
          </div>

          {/* Activities list preview */}
          <div className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Bentuk Kegiatan Lapangan:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {program.activities.slice(0, 3).map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                  <span className="truncate">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenDetail(program)}
            className="flex-1 justify-center text-xs"
            leftIcon={<Eye size={14} />}
          >
            Rincian Program
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenContribute(program)}
            className="flex-1 justify-center text-xs font-bold"
            leftIcon={<HeartHandshake size={14} />}
          >
            Dukung Aksi
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConservationProgramCard;
