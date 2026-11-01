import { Search, RotateCcw, Filter, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

export interface FilterState {
  search: string;
  kabupaten: string;
  activityType: string;
}

interface DestinationFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export function DestinationFilter({
  filters,
  onChange,
  onReset,
  totalResults,
}: DestinationFilterProps) {
  const isFiltered =
    filters.search !== '' || filters.kabupaten !== 'all' || filters.activityType !== 'all';

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/90 shadow-xs space-y-4 mb-8">
      {/* Top row: Search input & summary */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Cari nama desa, komoditas (kopi, aren, rebung)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
          />
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Menampilkan <strong className="text-forest font-bold">{totalResults}</strong> desa kandidat
          </span>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-xs text-slate-600 hover:text-red-600 h-8 px-2.5"
              leftIcon={<RotateCcw size={13} />}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs / Pills */}
      <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row gap-4 md:items-center justify-between text-xs">
        {/* Filter 1: Kabupaten */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <MapPin size={13} />
            Wilayah:
          </span>
          {['all', 'Kepahiang', 'Rejang Lebong'].map((kab) => (
            <button
              key={kab}
              type="button"
              onClick={() => onChange({ ...filters, kabupaten: kab })}
              className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
                filters.kabupaten === kab
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {kab === 'all' ? 'Semua Wilayah' : `Kab. ${kab}`}
            </button>
          ))}
        </div>

        {/* Filter 2: Jenis Aktivitas Utama */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Sparkles size={13} />
            Fokus Aktivitas:
          </span>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'kopi', label: 'Petik & Sangrai Kopi' },
            { id: 'aren', label: 'Sadap Nira & Aren' },
            { id: 'rebung', label: 'Olahan Rebung' },
            { id: 'konservasi', label: 'Konservasi & Inang' },
          ].map((act) => (
            <button
              key={act.id}
              type="button"
              onClick={() => onChange({ ...filters, activityType: act.id })}
              className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
                filters.activityType === act.id
                  ? 'bg-earth text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DestinationFilter;
