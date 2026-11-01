import { ShieldCheck, HeartHandshake, Calendar, User, ArrowRight } from 'lucide-react';
import { SimulasiLabel } from '@/components/ui';
import { useContributions } from '@/hooks/useContributions';
import { formatRupiah, formatDateTime } from '@/utils/format';

export function ConservationTransparencySection() {
  const { contributions, totalSimulatedContributions } = useContributions();

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-forest uppercase tracking-wider">
            Akuntabilitas Jasa Lingkungan
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            Transparansi Dukungan Konservasi (Simulasi)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <SimulasiLabel text="Pencatatan Terpisah" />
        </div>
      </div>

      {/* Summary Highlight Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
          <span className="text-xs font-semibold text-forest block mb-1">
            Total Dana Dukungan Simulasi
          </span>
          <p className="text-2xl font-black text-forest">
            {formatRupiah(totalSimulatedContributions)}
          </p>
          <p className="text-[11px] text-emerald-800/80 mt-1">
            Dicatat khusus untuk program perlindungan hutan & pohon pangan
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Partisipasi Terdaftar
          </span>
          <p className="text-2xl font-black text-slate-800">
            {contributions.length} Kontributor
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Tersimpan secara persisten pada LocalStorage browser
          </p>
        </div>
      </div>

      {/* Table of Recent Contributions */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Kontributor</th>
              <th className="py-3 px-4">Program Tujuan</th>
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4 text-right">Nominal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {contributions.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-800">{c.contributor}</div>
                  {c.note && <div className="text-[11px] text-slate-400 italic mt-0.5">&quot;{c.note}&quot;</div>}
                </td>
                <td className="py-3 px-4 font-medium text-slate-700">
                  {c.programName}
                </td>
                <td className="py-3 px-4 text-slate-400 text-[11px]">
                  {formatDateTime(c.createdAt)}
                </td>
                <td className="py-3 px-4 text-right font-bold text-forest">
                  {formatRupiah(c.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PesConceptCard() {
  return (
    <div className="bg-gradient-to-br from-deep via-forest to-deep text-white rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sage text-xs font-semibold uppercase tracking-wider border border-white/20">
        <ShieldCheck size={14} />
        <span>Peluang Masa Depan</span>
      </div>

      <div className="max-w-3xl space-y-3">
        <h3 className="text-xl md:text-2xl font-extrabold text-white">
          Payment for Ecosystem Services (PES) — Imbal Jasa Lingkungan
        </h3>
        <p className="text-xs md:text-sm text-white/80 leading-relaxed">
          Dalam jangka panjang, Wana Pangan dirancang dapat mengadopsi mekanisme PES resmi,
          di mana pihak hilir (konsumen air bersih, korporasi penyerap karbon, dan wisatawan)
          memberikan kompensasi langsung bagi masyarakat hulu desa hutan yang merawat tutupan pohon.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <h4 className="font-bold text-xs text-sage mb-1">1. Jasa Terukur</h4>
          <p className="text-[11px] text-white/70">
            Penetapan batas debit air dan indeks penyerapan karbon pohon agroforestri yang terverifikasi.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <h4 className="font-bold text-xs text-sage mb-1">2. Kesepakatan Kontrak</h4>
          <p className="text-[11px] text-white/70">
            Perjanjian kelembagaan antara kelompok pengelola hutan kemasyarakatan (HKm) dan penerima manfaat.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <h4 className="font-bold text-xs text-sage mb-1">3. Pemantauan Akuntabel</h4>
          <p className="text-[11px] text-white/70">
            Audit independen berkala untuk memastikan dana digunakan murni demi pemeliharaan vegetasi hutan.
          </p>
        </div>
      </div>

      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-white/60">
        <em>Catatan Kepatuhan:</em> Skema PES ini merupakan rancangan pengembangan masa depan dan belum menghasilkan pendapatan aktual pada prototipe saat ini.
      </div>
    </div>
  );
}
