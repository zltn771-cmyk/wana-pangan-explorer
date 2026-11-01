import { useState } from 'react';
import { Wheat, PlusCircle, Trash2, ArrowDownLeft, ArrowUpRight, Edit2 } from 'lucide-react';
import { Button, Input, Modal, SimulasiLabel, SimulasiBox } from '@/components/ui';
import { useLumbung } from '@/hooks/useLumbung';
import { useToast } from '@/contexts/ToastContext';
import { formatDate } from '@/utils/format';
import { ManageFoodStockModal } from '@/components/lumbung';

export function DashboardCadanganPanganPage() {
  const { reserves, addNewCommodity, updateFoodStock, deleteCommodity } = useLumbung();
  const { showToast } = useToast();

  const [isManageStockOpen, setIsManageStockOpen] = useState(false);
  const [isNewCommOpen, setIsNewCommOpen] = useState(false);

  // Form New Commodity
  const [komoditas, setKomoditas] = useState('');
  const [qtyStr, setQtyStr] = useState('100');
  const [unit, setUnit] = useState('kg');
  const [error, setError] = useState('');

  const handleAddNewComm = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!komoditas.trim()) {
      setError('Nama komoditas pangan wajib diisi.');
      return;
    }

    const qty = parseInt(qtyStr, 10);
    if (isNaN(qty) || qty < 0) {
      setError('Jumlah stok awal tidak boleh bernilai negatif.');
      return;
    }

    addNewCommodity(komoditas.trim(), qty, unit.trim() || 'kg');
    showToast(`Komoditas "${komoditas}" berhasil didaftarkan ke lumbung desa!`, 'success');
    setKomoditas('');
    setQtyStr('100');
    setIsNewCommOpen(false);
  };

  const handleDeleteComm = (id: string, name: string) => {
    if (window.confirm(`Hapus komoditas "${name}" dari inventaris lumbung pangan desa?`)) {
      deleteCommodity(id);
      showToast(`Komoditas "${name}" berhasil dihapus.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Manajemen Logistik Darurat
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Cadangan Pangan Fisik Komunal ({reserves.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Inventaris persediaan pangan nyata di gudang desa untuk mengamankan ketahanan pangan saat paceklik kopi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsNewCommOpen(true)}
            className="text-xs font-semibold shrink-0"
            leftIcon={<PlusCircle size={14} />}
          >
            Tambah Komoditas Baru
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsManageStockOpen(true)}
            className="text-xs font-bold shrink-0"
            leftIcon={<Wheat size={14} />}
          >
            Kelola / Salurkan Stok
          </Button>
        </div>
      </div>

      {/* Reserves Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Komoditas Pangan</th>
                <th className="py-3 px-4">Stok Tersedia</th>
                <th className="py-3 px-4">Satuan</th>
                <th className="py-3 px-4">Audit Terakhir</th>
                <th className="py-3 px-4">Kondisi Persediaan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reserves.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                    <Wheat size={15} className="text-earth shrink-0" />
                    <span>{r.komoditas}</span>
                  </td>
                  <td className="py-3 px-4 font-black text-forest text-sm">
                    {r.quantity} {r.unit}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{r.unit}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{formatDate(r.lastUpdated)}</td>
                  <td className="py-3 px-4">
                    {r.quantity > 50 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                        Stok Cukup
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        Perlu Pasokan
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteComm(r.id, r.komoditas)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Komoditas"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Komoditas Baru */}
      <Modal
        isOpen={isNewCommOpen}
        onClose={() => setIsNewCommOpen(false)}
        title="Daftarkan Komoditas Cadangan Baru"
        size="md"
      >
        <form onSubmit={handleAddNewComm} className="space-y-4">
          <Input
            label="Nama Komoditas Pangan *"
            placeholder="Contoh: Ubi Kayu Kering / Gabah Kering"
            value={komoditas}
            onChange={(e) => setKomoditas(e.target.value)}
            error={error}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Jumlah Stok Awal *"
              type="number"
              min={0}
              placeholder="100"
              value={qtyStr}
              onChange={(e) => setQtyStr(e.target.value)}
            />
            <Input
              label="Satuan Fisik *"
              placeholder="kg / liter / kaleng"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="flex-1 justify-center"
              onClick={() => setIsNewCommOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1 justify-center font-bold"
            >
              Daftarkan Komoditas
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Kelola Stok Masuk / Keluar */}
      <ManageFoodStockModal
        isOpen={isManageStockOpen}
        onClose={() => setIsManageStockOpen(false)}
        reserves={reserves}
        onUpdateStock={updateFoodStock}
      />
    </div>
  );
}

export default DashboardCadanganPanganPage;
