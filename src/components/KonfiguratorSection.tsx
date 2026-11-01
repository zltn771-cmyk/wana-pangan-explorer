import { useState } from 'react';
import { activityOptions } from '../data/constants';

interface DimensionInfo {
  key: string;
  label: string;
  keterangan: string;
}

const DIMENSI_LIST: DimensionInfo[] = [
  {
    key: 'ketersediaan',
    label: 'Ketersediaan',
    keterangan: 'Memperkuat pasokan dan keberlanjutan pangan lokal dari kebun hutan.',
  },
  {
    key: 'akses',
    label: 'Akses',
    keterangan: 'Meningkatkan pendapatan rumah tangga untuk keterjangkauan pangan bergizi.',
  },
  {
    key: 'stabilitas',
    label: 'Stabilitas',
    keterangan: 'Menjaga ketahanan ekologis dan kontinuitas sumber pangan sepanjang tahun.',
  },
];

export default function KonfiguratorSection() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedOptions = activityOptions.filter((option) =>
    selectedActivities.includes(option.id)
  );

  // Dapatkan pesan etika unik dari seluruh kegiatan yang dipilih
  const uniqueEtika = Array.from(
    new Set(selectedOptions.map((option) => option.etika))
  );

  return (
    <section id="konfigurator" className="bg-cream py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul & Subjudul Bagian */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-dark mb-4">
            Konfigurator Paket Wisata Kebun Hutan
          </h2>
          <p className="text-base md:text-lg text-coffee leading-relaxed">
            Pilih kegiatan yang ingin diikuti dan lihat dimensi ketahanan pangan yang diperkuat. Tanpa simulasi harga.
          </p>
        </div>

        {/* Panel Interaktif: Tata Letak flex-col md:flex-row gap-8 */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Panel Kiri (md:w-1/2): Daftar Kotak Centang 6 Kegiatan */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-xs rounded-2xl p-6 md:p-8 shadow-xs border border-earth/20">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-earth/10">
              <h3 className="font-serif text-xl font-bold text-forest-dark">
                Pilihan Kegiatan Wisata
              </h3>
              <span className="text-xs font-medium text-coffee bg-cream px-2.5 py-1 rounded-full">
                {selectedActivities.length} dipilih
              </span>
            </div>

            <div className="space-y-3">
              {activityOptions.map((activity) => {
                const isChecked = selectedActivities.includes(activity.id);
                return (
                  <label
                    key={activity.id}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isChecked
                        ? 'bg-cream/50 border-forest shadow-xs'
                        : 'bg-white border-earth/20 hover:border-forest/40 hover:bg-cream/20'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggle(activity.id)}
                        className="sr-only"
                        aria-label={activity.label}
                      />
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-forest border-forest text-cream'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-3.5 h-3.5 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-sm md:text-base select-none font-medium ${
                        isChecked ? 'text-forest-dark' : 'text-text-dark'
                      }`}
                    >
                      {activity.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Panel Kanan (md:w-1/2): Panel Hasil */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-xs rounded-2xl p-6 md:p-8 shadow-xs border border-earth/20">
            <h3 className="font-serif text-xl font-bold text-forest-dark mb-6 pb-3 border-b border-earth/10">
              Dimensi Pangan yang Diperkuat
            </h3>

            {/* 3 Indikator Dimensi */}
            <div className="space-y-4">
              {DIMENSI_LIST.map((dimensi) => {
                const isHighlighted = selectedOptions.some((opt) =>
                  opt.dimensi.includes(dimensi.key)
                );

                return (
                  <div
                    key={dimensi.key}
                    className={`rounded-xl p-4 transition-all duration-300 ease-in-out transform ${
                      isHighlighted
                        ? 'bg-forest text-cream scale-105 shadow-md'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-base md:text-lg">
                        {dimensi.label}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          isHighlighted
                            ? 'bg-cream/20 text-cream'
                            : 'bg-gray-300 text-gray-500'
                        }`}
                      >
                        {isHighlighted ? 'Terpenuhi' : 'Belum Terpenuhi'}
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isHighlighted ? 'text-cream/85' : 'text-gray-400'
                      }`}
                    >
                      {dimensi.keterangan}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bagian Pengingat Kode Etik */}
            <div className="mt-8 pt-6 border-t border-earth/20">
              <h4 className="font-serif text-lg font-bold text-forest-dark mb-3">
                Pengingat Kode Etik
              </h4>

              {selectedActivities.length === 0 ? (
                <p className="text-sm italic text-gray-500 bg-cream/40 p-4 rounded-xl border border-dashed border-earth/30">
                  Pilih kegiatan untuk melihat hasil.
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {uniqueEtika.map((etika, index) => (
                    <li
                      key={index}
                      className="text-sm text-text-dark bg-cream/40 p-3.5 rounded-xl border border-earth/20 flex items-start gap-2.5"
                    >
                      <span className="text-terracotta font-bold text-base leading-none mt-0.5">
                        •
                      </span>
                      <span className="leading-snug">{etika}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
