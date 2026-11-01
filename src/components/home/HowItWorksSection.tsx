import { ArrowRight, Trees, Coins, Sparkles, ShieldCheck, Landmark, HeartHandshake } from 'lucide-react';
import { SectionHeader } from '@/components/ui';

interface FlowStep {
  step: string;
  title: string;
  subtitle: string;
  icon: typeof Trees;
  description: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    step: '01',
    title: 'Potensi Desa Hutan',
    subtitle: 'Modal Alam & Kearifan',
    icon: Trees,
    description:
      'Kawasan agroforestri dataran tinggi Bengkulu kaya akan komoditas kopi naungan, tegakan aren, rumpun bambu, dan keanekaragaman flora endemik.',
  },
  {
    step: '02',
    title: 'Aktivitas Ecopreneurship',
    subtitle: 'Wisata & Pangan Bernilai',
    icon: Coins,
    description:
      'Masyarakat membuka paket wisata edukasi kebun hutan dan mengolah komoditas mentah menjadi produk bernilai tambah (kopi kurasi, gula semut, rebung vakum).',
  },
  {
    step: '03',
    title: 'Penciptaan Pendapatan',
    subtitle: 'Sumber Nafkah Berkelanjutan',
    icon: Sparkles,
    description:
      'Petani dan kelompok perempuan desa memperoleh alternatif arus kas harian/mingguan tanpa harus bergantung sepenuhnya pada fluktuasi harga panen kopi tahunan.',
  },
  {
    step: '04',
    title: 'Pemisahan Alokasi Dana',
    subtitle: 'Transparansi & Akuntabilitas',
    icon: HeartHandshake,
    description:
      'Sebagian margin transaksi disisihkan dan dicatat terpisah secara transparan: satu pos untuk Dana Konservasi Hutan dan satu pos untuk Cadangan Lumbung Wana.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-base">
        {/* Section Header */}
        <SectionHeader
          tag="Mekanisme Siklus Berkelanjutan"
          title="Bagaimana Wana Pangan Bekerja?"
          subtitle="Model sirkular yang mengubah komitmen menjaga hutan menjadi daya tahan pangan dan kesejahteraan ekonomi nyata bagi warga desa."
          align="center"
          className="mb-16"
        />

        {/* 4-Step Process Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {FLOW_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-beige/40 rounded-2xl p-6 border border-sage/20 hover:border-forest/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Pill & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-forest/20 tracking-tighter">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-xs font-semibold text-earth uppercase tracking-wider mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Arrow connector on desktop */}
                {idx < FLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center shadow-xs">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dual Accountability Mechanism Callout */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-deep to-forest text-white p-6 md:p-10 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sage text-xs font-semibold tracking-wide uppercase border border-white/20">
              Prinsip Tata Kelola Dana Terpisah
            </span>
            <h3 className="text-xl md:text-2xl font-bold leading-snug">
              Konservasi dan Ketahanan Pangan: Saling Menopang, Dicatat Terpisah
            </h3>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              Wana Pangan menerapkan standar pembukuan transparan: <strong>Dana Konservasi</strong>{' '}
              dialokasikan khusus untuk pemulihan habitat, pembibitan inang Rafflesia, dan patroli warga; sedangkan{' '}
              <strong>Dana Lumbung Wana</strong> dialokasikan khusus untuk pembelian dan pengamanan stok komoditas pangan cadangan darurat desa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-left">
              <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-sage font-bold text-sm mb-1">
                  <ShieldCheck size={18} />
                  <span>Pos Dana Konservasi</span>
                </div>
                <p className="text-xs text-white/70">
                  Untuk penanaman bibit pohon pangan multi-manfaat, patroli batas hutan warga, dan pemulihan vegetasi inang Rafflesia.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-amber-200 font-bold text-sm mb-1">
                  <Landmark size={18} />
                  <span>Pos Cadangan Lumbung Wana</span>
                </div>
                <p className="text-xs text-white/70">
                  Untuk pembentukan persediaan beras, jagung, gula aren, dan pangan awetan komunal saat paceklik atau kondisi darurat gagal panen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
