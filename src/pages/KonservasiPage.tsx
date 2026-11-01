import { useState } from 'react';
import { ShieldCheck, Trees, HeartHandshake, Sparkles, Target, Compass } from 'lucide-react';
import { SectionHeader, SimulasiLabel, SimulasiBox } from '@/components/ui';
import {
  ConservationProgramCard,
  ConservationDetailModal,
  ConservationContributionModal,
  ConservationTransparencySection,
  PesConceptCard,
} from '@/components/konservasi';
import { usePrograms } from '@/hooks/usePrograms';
import type { ConservationProgram } from '@/types';

export default function KonservasiPage() {
  const { programs } = usePrograms();
  const [selectedDetailProgram, setSelectedDetailProgram] = useState<ConservationProgram | null>(null);
  const [selectedContributeProgram, setSelectedContributeProgram] = useState<ConservationProgram | null>(null);

  return (
    <div className="w-full bg-beige min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-deep text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
            alt="Kawasan hutan lindung dan konservasi dataran tinggi Bengkulu"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-forest/80" />
        </div>

        <div className="container-base relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-teal-300 font-medium mb-4">
            <ShieldCheck size={14} className="text-teal-300" />
            <span>Jasa Lingkungan & Konservasi Hutan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Menjaga Hutan, Merawat Kehidupan
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Setiap potensi ekonomi desa hutan perlu berjalan seiring dengan upaya menjaga ekosistem.
            Wana Pangan mendorong keterlibatan masyarakat dalam perlindungan dan pemulihan lingkungan.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-300/30 text-xs">
            <Sparkles size={12} />
            <span>Rancangan Program Model Ecopreneurship — Belum Ada Klaim Pelaksanaan Penuh</span>
          </div>
        </div>
      </section>

      {/* ── 2. Programs Grid ── */}
      <div className="container-base py-12 md:py-16 space-y-14">
        <div>
          <SectionHeader
            tag="Aksi Konservasi Terencana"
            title="Empat Pilar Restorasi Ekologi Desa"
            subtitle="Rancangan program yang memadukan perlindungan keanekaragaman hayati dengan penguatan pohon pangan multi-manfaat."
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog) => (
              <ConservationProgramCard
                key={prog.id}
                program={prog}
                onOpenDetail={(p) => setSelectedDetailProgram(p)}
                onOpenContribute={(p) => setSelectedContributeProgram(p)}
              />
            ))}
          </div>
        </div>

        {/* ── 3. Transparansi Dukungan Konservasi ── */}
        <ConservationTransparencySection />

        {/* ── 4. Skema PES Edukatif ── */}
        <PesConceptCard />
      </div>

      {/* ── Modals ── */}
      <ConservationDetailModal
        program={selectedDetailProgram}
        isOpen={!!selectedDetailProgram}
        onClose={() => setSelectedDetailProgram(null)}
        onOpenContribute={(p) => setSelectedContributeProgram(p)}
      />

      <ConservationContributionModal
        program={selectedContributeProgram}
        isOpen={!!selectedContributeProgram}
        onClose={() => setSelectedContributeProgram(null)}
      />
    </div>
  );
}
