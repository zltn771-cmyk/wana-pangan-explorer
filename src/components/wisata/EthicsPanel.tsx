import { ShieldCheck, Trees, Trash2, HeartHandshake, Compass, Ban } from 'lucide-react';

const ETHICS_RULES = [
  {
    icon: HeartHandshake,
    title: 'Hormati Masyarakat & Adat Lokal',
    description:
      'Berperilaku dan berpakaian sopan, mintalah izin sebelum memotret warga atau aktivitas di kebun keluarga.',
  },
  {
    icon: Trash2,
    title: 'Prinsip Bebas Sampah (Zero Waste)',
    description:
      'Bawa kembali seluruh sampah pribadi Anda keluar dari kawasan desa hutan. Hindari penggunaan plastik sekali pakai.',
  },
  {
    icon: Ban,
    title: 'Dilarang Mengambil Flora & Fauna',
    description:
      'Dilarang keras memetik, mematahkan ranting, mengambil anggrek hutan, atau mengusik habitat satwa liar maupun inang Rafflesia.',
  },
  {
    icon: Compass,
    title: 'Patuhi Arahan Pemandu Lokal',
    description:
      'Tetap berada pada jalur setapak yang telah ditentukan dan selalu dengarkan instruksi keselamatan dari warga pemandu.',
  },
  {
    icon: Trees,
    title: 'Patuhi Batas Kuota Kunjungan',
    description:
      'Setiap desa memiliki daya dukung lingkungan terbatas (10–20 orang/hari) demi menjaga kelestarian ekosistem tanah dan air.',
  },
];

export function EthicsPanel() {
  return (
    <div className="bg-forest text-white rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
        <ShieldCheck size={280} />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sage text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
          <ShieldCheck size={14} />
          <span>Prinsip Ekowisata Bertanggung Jawab</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          Kode Etik Pengunjung Kebun Hutan
        </h3>
        <p className="text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed mb-8">
          Wisata kebun hutan Wana Pangan bukanlah rekreasi massal tanpa batas. Kami mengutamakan
          keberlanjutan ekologi dan kenyamanan ruang hidup masyarakat desa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ETHICS_RULES.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 border border-white/10 backdrop-blur-xs rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-sage/20 text-sage flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{rule.title}</h4>
                  <p className="text-xs text-white/75 leading-relaxed">{rule.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EthicsPanel;
