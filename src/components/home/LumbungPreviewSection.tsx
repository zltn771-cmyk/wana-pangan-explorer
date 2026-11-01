import { Link } from 'react-router-dom';
import { Landmark, ArrowRight, ShieldCheck, Wheat, CheckCircle2 } from 'lucide-react';
import { SectionHeader, Button, SimulasiLabel, SimulasiBox } from '@/components/ui';
import { lumbungSummary, foodReserves } from '@/data/lumbung';
import { formatRupiah } from '@/utils/format';

export function LumbungPreviewSection() {
  return (
    <section className="section-padding bg-beige relative">
      <div className="container-base">
        {/* Section Header */}
        <SectionHeader
          tag="Transparansi & Ketahanan Pangan"
          title="Lumbung Wana: Pengaman Ekonomi & Pangan Komunitas"
          subtitle="Inovasi model bisnis yang memisahkan sebagian pendapatan ekonomi untuk memastikan masyarakat desa memiliki persediaan pangan tangguh dalam kondisi krisis."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Concept Explanation & Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-sage/30 shadow-xs space-y-5">
              <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                <Landmark size={24} />
              </div>

              <h3 className="text-xl font-bold text-forest leading-snug">
                Bukan Sekadar Dana Desa Biasa
              </h3>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Di dataran tinggi Bengkulu, ketergantungan monokultur pada kopi sering membuat petani
                rentan saat harga anjlok atau paceklik. <strong>Lumbung Wana</strong> hadir sebagai
                mekanisme kolektif cadangan pangan mandiri yang didanai dari perputaran ekowisata dan
                penjualan pangan lokal.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-forest mt-0.5 shrink-0" />
                  <span>
                    <strong>Pencatatan Akuntabel:</strong> Setiap pemasukan dari penjualan produk dan tiket wisata dialokasikan dengan proporsi transparan.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-forest mt-0.5 shrink-0" />
                  <span>
                    <strong>Stok Fisik Pangan:</strong> Cadangan tidak hanya berupa uang tunai, melainkan juga wujud fisik beras, jagung, dan makanan awetan.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-forest mt-0.5 shrink-0" />
                  <span>
                    <strong>Jaring Pengaman Darurat:</strong> Penyaluran diprioritaskan untuk keluarga petani yang terdampak gagal panen atau musibah.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link to="/lumbung" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center" rightIcon={<ArrowRight size={16} />}>
                    Lihat Transparansi Lumbung
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Interactive Dashboard Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
              {/* Card Header & Simulation Notice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800 text-base">
                    Simulasi Saldo & Cadangan Komunal
                  </h4>
                  <p className="text-xs text-slate-500">
                    Posisi dana cadangan desa per periode demonstrasi aktif
                  </p>
                </div>
                <div>
                  <SimulasiLabel text="Demonstrasi Interaktif" />
                </div>
              </div>

              {/* Fund Balances Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center justify-between text-xs text-amber-900 font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Landmark size={14} className="text-amber-700" />
                      Cadangan Pangan Desa
                    </span>
                    <SimulasiLabel text="Simulasi" />
                  </div>
                  <p className="text-2xl font-black text-amber-900 tracking-tight">
                    {formatRupiah(lumbungSummary.totalCadanganPangan)}
                  </p>
                  <p className="text-[11px] text-amber-800/80 mt-1">
                    Diproteksi khusus untuk stabilitas pangan warga
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="flex items-center justify-between text-xs text-forest font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-forest" />
                      Dana Konservasi Hutan
                    </span>
                    <SimulasiLabel text="Simulasi" />
                  </div>
                  <p className="text-2xl font-black text-forest tracking-tight">
                    {formatRupiah(lumbungSummary.totalDanaKonservasi)}
                  </p>
                  <p className="text-[11px] text-emerald-800/80 mt-1">
                    Terpisah untuk bibit, patroli & inang Rafflesia
                  </p>
                </div>
              </div>

              {/* Physical Food Reserve Table Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Wheat size={14} className="text-earth" />
                    Stok Fisik Komoditas Cadangan
                  </h5>
                  <span className="text-[11px] text-slate-400">Pembaruan: Oktober 2026</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Komoditas</th>
                        <th className="py-2.5 px-3">Jumlah Stok</th>
                        <th className="py-2.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {foodReserves.slice(0, 4).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            {item.komoditas}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-forest">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-800 font-medium">
                              Tersedia
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Explicit Simulation Warning */}
              <SimulasiBox>
                <p className="text-xs">
                  <strong>Pemberitahuan Prototype:</strong> Seluruh angka saldo kas dan stok komoditas di atas
                  adalah simulasi model arsitektur sistem transparansi Wana Pangan. Belum ada klaim transaksi aktual.
                </p>
              </SimulasiBox>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LumbungPreviewSection;
