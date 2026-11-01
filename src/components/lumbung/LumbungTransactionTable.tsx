import { ArrowDownLeft, ArrowUpRight, Landmark, ShieldCheck, Cog } from 'lucide-react';
import type { LumbungTransaction } from '@/types';
import { formatRupiah, formatDate } from '@/utils/format';
import { SimulasiLabel } from '@/components/ui';

interface LumbungTransactionTableProps {
  transactions: LumbungTransaction[];
}

export function LumbungTransactionTable({ transactions }: LumbungTransactionTableProps) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-base text-slate-800">
            Riwayat Transaksi Buku Kas Komunal
          </h4>
          <p className="text-xs text-slate-400">
            Pencatatan alokasi pemasukan usaha dan pengeluaran darurat cadangan desa
          </p>
        </div>
        <SimulasiLabel text="Buku Kas Simulasi" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Deskripsi / Keterangan</th>
              <th className="py-3 px-4">Pos Alokasi</th>
              <th className="py-3 px-4 text-right">Nominal (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {transactions.map((tx) => {
              const isOut = tx.type === 'pengeluaran-darurat';
              return (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-slate-400 font-medium shrink-0">
                    {formatDate(tx.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      {isOut ? (
                        <ArrowUpRight size={14} className="text-red-500 shrink-0" />
                      ) : (
                        <ArrowDownLeft size={14} className="text-emerald-500 shrink-0" />
                      )}
                      <span>{tx.description}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.fund === 'cadangan-pangan'
                          ? 'bg-amber-100 text-amber-900'
                          : tx.fund === 'konservasi'
                          ? 'bg-emerald-100 text-forest'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tx.fund === 'cadangan-pangan'
                        ? 'Cadangan Pangan'
                        : tx.fund === 'konservasi'
                        ? 'Dana Konservasi'
                        : 'Operasional Desa'}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-black ${
                      isOut ? 'text-red-600' : 'text-forest'
                    }`}
                  >
                    {isOut ? `- ${formatRupiah(tx.amount)}` : `+ ${formatRupiah(tx.amount)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LumbungPrinciplesBanner() {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
      <div className="max-w-3xl space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold uppercase tracking-wider">
          <Landmark size={14} />
          Prinsip Akuntabilitas Tata Kelola
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-slate-800">
          Standar Pengelolaan Dana & Cadangan Pangan Wana Pangan
        </h3>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          Platform Wana Pangan tidak secara membabi-buta mencampurkan seluruh omzet usaha menjadi kas desa.
          Kami menerapkan lima pilar pemisahan akuntansi sosial:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">1. Rekening Terpisah</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Pos Cadangan Pangan dan Pos Konservasi memiliki buku pencatatan dan peruntukan yang tidak boleh saling menutupi.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">2. Alokasi Bersepakat</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Persentase alokasi dihitung dari surplus bersih usaha setelah biaya pokok produksi petani terbayar lunas.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">3. Stok Berwujud Nyata</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Nilai nominal kas selalu diimbangi dengan stok fisik beras, jagung, dan makanan awetan di lumbung desa.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">4. Penyaluran Terverifikasi</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Pengeluaran beras darurat hanya dapat dibuka saat terjadi gagal panen atau musibah melalui musyawarah warga.
          </p>
        </div>
      </div>
    </div>
  );
}
