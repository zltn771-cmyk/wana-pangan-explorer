import { roadmapPhases } from '../data/constants';

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="bg-forest-dark py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul & Subjudul Bagian */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-4">
            Peta Jalan
          </h2>
          <p className="text-base md:text-lg text-cream/70 leading-relaxed">
            Tiga tahap implementasi model Wana Pangan dalam 36 bulan.
          </p>
        </div>

        {/* Garis Waktu Horizontal (Dapat digulir di perangkat seluler dengan overflow-x-auto) */}
        <div className="overflow-x-auto snap-x snap-mandatory pb-6 pt-2">
          <div className="relative min-w-[880px] md:min-w-0">
            {/* Garis horizontal penghubung di belakang kartu */}
            <div
              className="absolute top-12 left-8 right-8 h-1 bg-terracotta -translate-y-1/2 z-0"
              aria-hidden="true"
            />

            {/* Baris 3 Kartu Tahapan */}
            <div className="flex flex-nowrap gap-6 relative z-10">
              {roadmapPhases.map((phaseItem, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[280px] snap-center bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Lingkaran Tahap di Atas */}
                    <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center text-cream font-bold text-lg mb-4 shadow-sm shrink-0">
                      {index + 1}
                    </div>

                    {/* Judul Tahap */}
                    <h3 className="text-lg font-bold text-cream mb-1">
                      {phaseItem.phase}
                    </h3>

                    {/* Periode */}
                    <p className="text-sm font-semibold text-terracotta mb-4">
                      {phaseItem.period}
                    </p>

                    {/* Daftar Butir Item */}
                    <ul className="space-y-2.5 list-disc list-inside text-cream/80 text-sm">
                      {phaseItem.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
