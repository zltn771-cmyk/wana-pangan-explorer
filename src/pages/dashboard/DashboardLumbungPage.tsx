import { useState } from 'react';
import { Landmark, PlusCircle, Trash2, ArrowDownLeft, ArrowUpRight, ShieldCheck, Filter } from 'lucide-react';
import { Button, Modal, SimulasiLabel, SimulasiBox } from '@/components/ui';
import { useLumbung } from '@/hooks/useLumbung';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah, formatDate } from '@/utils/format';
import { AddTransactionModal } from '@/components/lumbung';

export default function DashboardLumbungPage() {
  const {
    transactions,
    totalSaldoKas,
    totalPemasukan,
    totalPengeluaran,
    saldoCadanganPangan,
    saldoKonservasi,
    saldoOperasional,
    addTransaction,
    deleteTransaction,
  } = useLumbung();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFund, setSelectedFund] = useState<string>('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFund !== 'all' && tx.fund !== selectedFund) return false;
    return true;
  });

  const handleDelete = (id: string, desc: string) => {
    if (window.confirm(`Hapus catatan transaksi kas "${desc}"? Saldo kas akan dihitung ulang secara otomatis.`)) {
      deleteTransaction(id);
      showToast(`Transaksi "${desc}" berhasil dihapus.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Akuntansi Sosial Lumbung Wana
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Pengelolaan Dana Kas Ketahanan Pangan Desa
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pencatatan alokasi surplus ecopreneurship dan pengeluaran darurat paceklik secara transparan.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-bold shrink-0"
          leftIcon={<PlusCircle size={15} />}
        >
          Catat Transaksi Kas Baru
        </Button>
      </div>

      {/* Saldo Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Total Saldo Kas Tersedia</span>
          <p className="text-2xl font-black text-forest">{formatRupiah(totalSaldoKas)}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Dihitung otomatis (Pemasukan - Pengeluaran)</span>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs">
          <span className="text-xs font-semibold text-amber-900 block mb-1">Pos Cadangan Pangan</span>
          <p className="text-2xl font-black text-amber-950">{formatRupiah(saldoCadanganPangan)}</p>
          <span className="text-[10px] text-amber-800/80 mt-1 block">Khusus cadangan logistik krisis</span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs">
          <span className="text-xs font-semibold text-forest block mb-1">Pos Dana Konservasi</span>
          <p className="text-2xl font-black text-forest">{formatRupiah(saldoKonservasi)}</p>
          <span className="text-[10px] text-emerald-800/80 mt-1 block">Khusus bibit & patroli warga</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Pos Operasional Desa</span>
          <p className="text-2xl font-black text-slate-800">{formatRupiah(saldoOperasional)}</p>
          <span className="text-[10px] text-slate-500 mt-1 block">Fasilitas & administrasi</span>
        </div>
      </div>

      {/* Filter Pos Dana */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Filter size={15} className="text-slate-400" />
          <span className="text-slate-600 font-semibold">Filter Pos Buku Kas:</span>
          <select
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
          >
            <option value="all">Semua Pos ({transactions.length})</option>
            <option value="cadangan-pangan">Pos Cadangan Pangan</option>
            <option value="konservasi">Pos Dana Konservasi</option>
            <option value="operasional">Pos Operasional Desa</option>
          </select>
        </div>
        <SimulasiLabel text="Buku Kas Simulasi" />
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Keterangan Transaksi</th>
                <th className="py-3 px-4">Pos Buku</th>
                <th className="py-3 px-4">Jenis</th>
                <th className="py-3 px-4 text-right">Nominal</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.map((tx) => {
                const isOut = tx.type === 'pengeluaran-darurat';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-medium">{formatDate(tx.createdAt)}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-800">{tx.description}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.fund === 'cadangan-pangan'
                          ? 'bg-amber-100 text-amber-900'
                          : tx.fund === 'konservasi'
                          ? 'bg-emerald-100 text-forest'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {tx.fund === 'cadangan-pangan'
                          ? 'Cadangan Pangan'
                          : tx.fund === 'konservasi'
                          ? 'Dana Konservasi'
                          : 'Operasional'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1 font-semibold ${isOut ? 'text-red-600' : 'text-forest'}`}>
                        {isOut ? <ArrowUpRight size={13} /> : <ArrowDownLeft size={13} />}
                        {isOut ? 'Pengeluaran' : 'Pemasukan'}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right font-black ${isOut ? 'text-red-600' : 'text-forest'}`}>
                      {isOut ? `- ${formatRupiah(tx.amount)}` : `+ ${formatRupiah(tx.amount)}`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(tx.id, tx.description)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Transaksi"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah Transaksi */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={addTransaction}
        currentBalances={{
          cadanganPangan: saldoCadanganPangan,
          konservasi: saldoKonservasi,
          operasional: saldoOperasional,
        }}
      />
    </div>
  );
}
