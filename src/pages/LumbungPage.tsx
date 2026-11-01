import { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Wheat,
  PlusCircle,
  Coins,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader, Button, SimulasiLabel, SimulasiBox } from '@/components/ui';
import {
  LumbungCharts,
  LumbungTransactionTable,
  AddTransactionModal,
  ManageFoodStockModal,
  LumbungPrinciplesBanner,
} from '@/components/lumbung';
import { useLumbung } from '@/hooks/useLumbung';
import { formatRupiah, formatDate } from '@/utils/format';

export default function LumbungPage() {
  const {
    transactions,
    reserves,
    totalSaldoKas,
    totalPemasukan,
    totalPengeluaran,
    saldoCadanganPangan,
    saldoKonservasi,
    saldoOperasional,
    addTransaction,
    updateFoodStock,
  } = useLumbung();

  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [isManageStockOpen, setIsManageStockOpen] = useState(false);

  return (
    <div className="w-full bg-beige min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-deep text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571167366136-b57e37e6d2e5?w=1920&q=80"
            alt="Lumbung pangan dan hasil bumi masyarakat desa hutan"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-forest/80" />
        </div>

        <div className="container-base relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-medium mb-4">
            <Landmark size={14} className="text-amber-300" />
            <span>Mekanisme Ketahanan Pangan Komunal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Lumbung Wana: Menjaga Pangan, Menguatkan Desa
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Lumbung Wana merupakan mekanisme pengelolaan sebagian pendapatan bersih untuk memperkuat
            cadangan pangan dan mendukung ketahanan pangan masyarakat desa hutan.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-300/30 text-xs">
            <Sparkles size={12} />
            <span>Dashboard Transparansi & Akuntabilitas Kas Desa (Data Simulasi)</span>
          </div>
        </div>
      </section>

      {/* ── 2. Three Core Functions Cards ── */}
      <div className="container-base py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Wheat size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 mb-1">
                1. Cadangan Pangan Fisik
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyimpanan komoditas beras, jagung, gula aren, dan awetan rebung di gudang desa untuk masa paceklik.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-forest flex items-center justify-center shrink-0">
              <Coins size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 mb-1">
                2. Pengelolaan Kas Ketahanan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyisihan margin perputaran wisata dan marketplace ke rekening pos dana darurat yang transparan.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Layers size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 mb-1">
                3. Pemantauan & Penyaluran
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sistem audit musyawarah desa untuk menyalurkan stok pangan saat ada warga yang tertimpa gagal panen.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. Interactive Balances & Action Bar ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-earth uppercase tracking-wider">
                Posisi Kas & Saldo Real-Time
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                Dashboard Saldo Buku Kas Komunal
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsManageStockOpen(true)}
                className="text-xs font-semibold"
                leftIcon={<Wheat size={14} />}
              >
                Kelola Stok Pangan
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddTxOpen(true)}
                className="text-xs font-bold"
                leftIcon={<PlusCircle size={15} />}
              >
                Catat Transaksi Kas
              </Button>
            </div>
          </div>

          {/* 4 Financial Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Saldo Keseluruhan */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Total Saldo Kas Tersedia</span>
                <SimulasiLabel text="Simulasi" />
              </div>
              <p className="text-2xl font-black text-forest tracking-tight">
                {formatRupiah(totalSaldoKas)}
              </p>
              <p className="text-[11px] text-slate-400">
                Pemasukan: {formatRupiah(totalPemasukan)}
              </p>
            </div>

            {/* Pos Cadangan Pangan */}
            <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Landmark size={14} className="text-amber-700" />
                  Pos Cadangan Pangan
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Darurat
                </span>
              </div>
              <p className="text-2xl font-black text-amber-950 tracking-tight">
                {formatRupiah(saldoCadanganPangan)}
              </p>
              <p className="text-[11px] text-amber-800/80">
                Pengadaan beras & logistik krisis
              </p>
            </div>

            {/* Pos Dana Konservasi */}
            <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs text-forest font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-forest" />
                  Pos Dana Konservasi
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-forest">
                  Hutan
                </span>
              </div>
              <p className="text-2xl font-black text-forest tracking-tight">
                {formatRupiah(saldoKonservasi)}
              </p>
              <p className="text-[11px] text-emerald-800/80">
                Pohon inang & patroli batas warga
              </p>
            </div>

            {/* Pos Operasional Desa */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>Pos Operasional Desa</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  Kelola
                </span>
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                {formatRupiah(saldoOperasional)}
              </p>
              <p className="text-[11px] text-slate-500">
                Pemeliharaan fasilitas & dapur komunal
              </p>
            </div>
          </div>
        </div>

        {/* ── 4. Recharts Visualizations ── */}
        <LumbungCharts foodReserves={reserves} />

        {/* ── 5. Physical Food Reserve Table ── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-base text-slate-800">
                Daftar Persediaan Fisik Komoditas Pangan di Lumbung Desa
              </h4>
              <p className="text-xs text-slate-400">
                Stok fisik tersimpan yang diproteksi untuk konsumsi warga saat terjadi gagal panen kopi
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsManageStockOpen(true)}
              className="text-xs font-semibold shrink-0"
              leftIcon={<PlusCircle size={14} />}
            >
              Ubah / Salurkan Stok
            </Button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Komoditas Pangan</th>
                  <th className="py-3 px-4">Kuantitas Stok Tersedia</th>
                  <th className="py-3 px-4">Satuan Kemasan</th>
                  <th className="py-3 px-4">Tanggal Audit Terakhir</th>
                  <th className="py-3 px-4 text-right">Status Ketersediaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {reserves.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{item.komoditas}</td>
                    <td className="py-3 px-4 font-black text-forest text-sm">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{item.unit}</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {formatDate(item.lastUpdated)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.quantity > 50 ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                          Stok Aman
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                          Perlu Pasokan
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 6. Transactions Table ── */}
        <LumbungTransactionTable transactions={transactions} />

        {/* ── 7. Principles of Accountability ── */}
        <LumbungPrinciplesBanner />
      </div>

      {/* ── Modals ── */}
      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        onAddTransaction={addTransaction}
        currentBalances={{
          cadanganPangan: saldoCadanganPangan,
          konservasi: saldoKonservasi,
          operasional: saldoOperasional,
        }}
      />

      <ManageFoodStockModal
        isOpen={isManageStockOpen}
        onClose={() => setIsManageStockOpen(false)}
        reserves={reserves}
        onUpdateStock={updateFoodStock}
      />
    </div>
  );
}
