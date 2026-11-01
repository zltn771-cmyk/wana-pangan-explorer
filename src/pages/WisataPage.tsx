import { useState, useMemo } from 'react';
import { Compass, ShieldCheck, Ticket, TreePine, MapPin, Sparkles } from 'lucide-react';
import { SectionHeader, EmptyState } from '@/components/ui';
import {
  DestinationCard,
  DestinationFilter,
  EthicsPanel,
  BookingHistorySection,
  type FilterState,
} from '@/components/wisata';
import { useDestinations } from '@/hooks/useDestinations';
import { useBookings } from '@/hooks/useBookings';

export default function WisataPage() {
  const { destinations } = useDestinations();
  const { bookings } = useBookings();
  const [activeTab, setActiveTab] = useState<'katalog' | 'riwayat'>('katalog');

  // State Filter
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    kabupaten: 'all',
    activityType: 'all',
  });

  const handleResetFilters = () => {
    setFilters({ search: '', kabupaten: 'all', activityType: 'all' });
  };

  // Filter logika
  const filteredDestinations = useMemo(() => {
    return destinations.filter((item) => {
      // 1. Search text
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesa = item.desa.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchAct = item.activities.some((a) => a.name.toLowerCase().includes(query));
        if (!matchName && !matchDesa && !matchDesc && !matchAct) return false;
      }

      // 2. Kabupaten
      if (filters.kabupaten !== 'all') {
        if (item.kabupaten.toLowerCase() !== filters.kabupaten.toLowerCase()) return false;
      }

      // 3. Activity Type
      if (filters.activityType !== 'all') {
        const type = filters.activityType;
        const hasActivity = item.activities.some((a) => {
          const actName = a.name.toLowerCase();
          if (type === 'kopi') return actName.includes('kopi');
          if (type === 'aren') return actName.includes('nira') || actName.includes('aren');
          if (type === 'rebung') return actName.includes('rebung');
          if (type === 'konservasi') return actName.includes('tanam') || actName.includes('rafflesia') || actName.includes('inang');
          return true;
        });
        if (!hasActivity) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="w-full bg-beige min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-deep text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"
            alt="Kebun agroforestri dan lanskap perbukitan dataran tinggi Bengkulu"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-forest/80" />
        </div>

        <div className="container-base relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-sage font-medium mb-4">
            <Compass size={14} className="text-sage" />
            <span>Wisata Kebun Hutan Agroforestri</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Jelajahi Kehidupan di Balik Hutan
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Rasakan pengalaman agroforestri melalui aktivitas pertanian, pengolahan pangan lokal,
            dan pembelajaran konservasi bersama masyarakat desa.
          </p>

          {/* Quick Notice Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-300/30 text-xs">
            <Sparkles size={12} />
            <span>Data paket dan kuota kunjungan merupakan data simulasi pengembangan</span>
          </div>
        </div>
      </section>

      {/* ── 2. Tab Switcher ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-20 shadow-xs">
        <div className="container-base flex items-center gap-2 sm:gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('katalog')}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'katalog'
                ? 'border-forest text-forest'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass size={16} />
            <span>Katalog Destinasi Desa ({destinations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('riwayat')}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'riwayat'
                ? 'border-forest text-forest'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Ticket size={16} />
            <span>Riwayat Reservasi Saya</span>
            {bookings.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-forest text-white text-[10px] flex items-center justify-center font-bold">
                {bookings.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── 3. Main Body ── */}
      <div className="container-base py-10 md:py-16 space-y-12">
        {activeTab === 'katalog' ? (
          <>
            {/* Filter */}
            <DestinationFilter
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredDestinations.length}
            />

            {/* Destinations Grid */}
            {filteredDestinations.length === 0 ? (
              <EmptyState
                icon={<MapPin size={32} className="text-forest" />}
                title="Tidak Ada Destinasi yang Cocok"
                description="Cobalah mengatur ulang kata kunci pencarian atau mengubah opsi filter wilayah dan aktivitas."
                action={
                  <button
                    onClick={handleResetFilters}
                    className="mt-3 px-4 py-2 rounded-xl bg-forest text-white text-xs font-semibold"
                  >
                    Reset Filter
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            )}

            {/* Kode Etik Wisata Panel */}
            <div className="pt-8">
              <EthicsPanel />
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <BookingHistorySection />
            <EthicsPanel />
          </div>
        )}
      </div>
    </div>
  );
}
