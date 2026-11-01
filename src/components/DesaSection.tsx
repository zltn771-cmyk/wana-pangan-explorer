import { desaKandidatList } from '../data/constants';

export default function DesaSection() {
  return (
    <section id="desa" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul Bagian */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-dark">
            Desa Kandidat Percontohan
          </h2>
        </div>

        {/* Kisi Kartu Desa: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {desaKandidatList.map((desa) => (
            <div
              key={desa.nama}
              className="bg-cream rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Ikon SVG Rumah/Desa dengan Atap Segitiga */}
                <svg
                  className="w-7 h-7 text-forest mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
                  <path d="M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6" />
                </svg>

                {/* Nama Desa & Kabupaten */}
                <h3 className="text-xl font-bold text-forest-dark">
                  {desa.nama}
                </h3>
                <p className="text-sm text-coffee mt-0.5">
                  Kabupaten {desa.kabupaten}
                </p>

                {/* Daftar Fakta */}
                <ul className="mt-4 space-y-2 list-disc list-inside text-sm text-text-dark">
                  {desa.fakta.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan Peringatan di Bawah Kisi */}
        <div className="mt-8 bg-coffee/10 p-4 rounded-lg flex items-center gap-3">
          <span className="text-lg shrink-0" aria-hidden="true">
            ⚠️
          </span>
          <p className="text-sm italic text-coffee">
            Status lahan dan daya dukung belum dikaji.
          </p>
        </div>
      </div>
    </section>
  );
}
