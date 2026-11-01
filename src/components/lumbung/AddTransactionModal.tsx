import { useState } from 'react';
import { PlusCircle, ArrowUpRight, ArrowDownLeft, AlertCircle } from 'lucide-react';
import { Modal, Button, Input, Textarea, SimulasiLabel, SimulasiBox } from '@/components/ui';
import type { LumbungTransaction } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useToast } from '@/contexts/ToastContext';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<LumbungTransaction, 'id' | 'createdAt' | 'isSimulasi'>) => {
    success: boolean;
    message?: string;
  };
  currentBalances: {
    cadanganPangan: number;
    konservasi: number;
    operasional: number;
  };
}

export function AddTransactionModal({
  isOpen,
  onClose,
  onAddTransaction,
  currentBalances,
}: AddTransactionModalProps) {
  const { showToast } = useToast();

  const [type, setType] = useState<LumbungTransaction['type']>('alokasi-pangan');
  const [fund, setFund] = useState<LumbungTransaction['fund']>('cadangan-pangan');
  const [description, setDescription] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [error, setError] = useState('');

  const isPengeluaran = type === 'pengeluaran-darurat';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseInt(amountStr.replace(/\D/g, ''), 10);
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Nominal harus berupa angka lebih besar dari Rp 0.');
      return;
    }

    if (!description.trim()) {
      setError('Keterangan transaksi wajib diisi.');
      return;
    }

    const res = onAddTransaction({
      type,
      fund,
      description: description.trim(),
      amount: parsedAmount,
    });

    if (!res.success) {
      setError(res.message || 'Gagal menyimpan transaksi.');
      return;
    }

    showToast('Transaksi kas simulasi berhasil dicatat!', 'success');
    setDescription('');
    setAmountStr('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Catat Transaksi Kas Lumbung (Simulasi)"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Jenis Alur Transaksi */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Jenis Transaksi:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setType('alokasi-pangan');
                setFund('cadangan-pangan');
              }}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                !isPengeluaran
                  ? 'bg-emerald-50 border-emerald-500 text-forest shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <ArrowDownLeft size={16} className="text-emerald-600" />
              Pemasukan / Alokasi
            </button>

            <button
              type="button"
              onClick={() => {
                setType('pengeluaran-darurat');
              }}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isPengeluaran
                  ? 'bg-red-50 border-red-500 text-red-700 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <ArrowUpRight size={16} className="text-red-600" />
              Pengeluaran Darurat
            </button>
          </div>
        </div>

        {/* Pos Dana Terpisah */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Pos Buku Kas:
          </label>
          <select
            value={fund}
            onChange={(e) => setFund(e.target.value as LumbungTransaction['fund'])}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
          >
            <option value="cadangan-pangan">
              Pos Cadangan Pangan (Saldo: {formatRupiah(currentBalances.cadanganPangan)})
            </option>
            <option value="konservasi">
              Pos Dana Konservasi (Saldo: {formatRupiah(currentBalances.konservasi)})
            </option>
            <option value="operasional">
              Pos Operasional Desa (Saldo: {formatRupiah(currentBalances.operasional)})
            </option>
          </select>
        </div>

        {/* Nominal Transaksi */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Nominal Transaksi (Rp) *:
          </label>
          <input
            type="text"
            placeholder="Contoh: 1500000"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        {/* Deskripsi */}
        <Textarea
          label="Deskripsi / Keterangan Transaksi *"
          placeholder="Misal: Pembelian beras cadangan masa panen, atau pengeluaran logistik darurat banjir..."
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && (
          <p className="text-xs text-red-600 flex items-center gap-1.5">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <SimulasiBox>
          <p className="text-xs">
            <strong>Catatan:</strong> Saldo kas akan bertambah atau berkurang secara otomatis dan tersimpan di LocalStorage browser.
          </p>
        </SimulasiBox>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="flex-1 justify-center"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-1 justify-center font-bold"
          >
            Simpan Transaksi
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface ManageFoodStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  reserves: { id: string; komoditas: string; quantity: number; unit: string }[];
  onUpdateStock: (id: string, delta: number, ket?: string) => { success: boolean; message?: string };
}

export function ManageFoodStockModal({
  isOpen,
  onClose,
  reserves,
  onUpdateStock,
}: ManageFoodStockModalProps) {
  const { showToast } = useToast();

  const [selectedId, setSelectedId] = useState(reserves[0]?.id || '');
  const [action, setAction] = useState<'tambah' | 'kurang'>('tambah');
  const [qtyStr, setQtyStr] = useState('');
  const [error, setError] = useState('');

  const currentItem = reserves.find((r) => r.id === selectedId) || reserves[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const val = parseInt(qtyStr, 10);
    if (!val || val <= 0) {
      setError('Kuantitas stok harus berupa angka lebih besar dari 0.');
      return;
    }

    const delta = action === 'tambah' ? val : -val;
    const res = onUpdateStock(selectedId, delta);

    if (!res.success) {
      setError(res.message || 'Gagal mengubah stok.');
      return;
    }

    showToast(
      `Stok ${currentItem.komoditas} berhasil ${action === 'tambah' ? 'ditambahkan' : 'dikurangi'} ${val} ${currentItem.unit}!`,
      'success'
    );
    setQtyStr('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kelola Stok Fisik Cadangan Pangan (Simulasi)"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pilih Komoditas */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Pilih Komoditas Cadangan:
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
          >
            {reserves.map((r) => (
              <option key={r.id} value={r.id}>
                {r.komoditas} (Tersedia: {r.quantity} {r.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Jenis Aksi */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Aksi Stok:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAction('tambah')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                action === 'tambah'
                  ? 'bg-emerald-50 border-emerald-500 text-forest'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              + Tambah Persediaan (Panen/Beli)
            </button>
            <button
              type="button"
              onClick={() => setAction('kurang')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                action === 'kurang'
                  ? 'bg-amber-50 border-amber-500 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              - Salurkan untuk Darurat
            </button>
          </div>
        </div>

        {/* Jumlah */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Jumlah Kuantitas ({currentItem ? currentItem.unit : 'unit'}) *:
          </label>
          <input
            type="number"
            min={1}
            placeholder="Contoh: 50"
            value={qtyStr}
            onChange={(e) => setQtyStr(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 flex items-center gap-1.5">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="flex-1 justify-center"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-1 justify-center font-bold"
          >
            Perbarui Stok
          </Button>
        </div>
      </form>
    </Modal>
  );
}
