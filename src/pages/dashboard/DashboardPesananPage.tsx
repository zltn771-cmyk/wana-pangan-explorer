import { useState, useMemo } from 'react';
import { ShoppingBag, Search, Eye, Trash2, Phone, MapPin, CreditCard, Calendar } from 'lucide-react';
import { Button, Modal, SimulasiLabel, EmptyState } from '@/components/ui';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah, formatDateTime } from '@/utils/format';
import type { Order, OrderStatus } from '@/types';

export default function DashboardPesananPage() {
  const { orders, updateStatus, deleteOrder } = useOrders();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.phone.includes(q) ||
          o.customer.address.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (statusFilter !== 'all' && o.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [orders, search, statusFilter]);

  const handleChangeStatus = (id: string, newStatus: OrderStatus) => {
    updateStatus(id, newStatus);
    showToast(`Status pesanan ${id} diubah menjadi "${newStatus}".`, 'success');
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Hapus pesanan ${id} dari sistem?`)) {
      deleteOrder(id);
      showToast(`Pesanan ${id} berhasil dihapus.`, 'info');
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Manajemen Transaksi Marketplace
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Daftar Pesanan Produk Masuk ({orders.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau pengiriman dan status pembayaran simulasi dari pembeli produk pangan lokal.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari ID pesanan, nama pembeli, nomor HP, atau alamat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:border-forest w-full sm:w-auto"
        >
          <option value="all">Semua Status</option>
          <option value="baru">Pesanan Dibuat (Baru)</option>
          <option value="diproses">Diproses</option>
          <option value="dikirim">Dalam Pengiriman</option>
          <option value="selesai">Selesai</option>
          <option value="dibatalkan">Dibatalkan</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag size={32} className="text-forest" />}
            title="Tidak Ada Data Pesanan"
            description="Belum ada transaksi pembelian produk yang sesuai dengan filter pencarian."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">ID Pesanan</th>
                  <th className="py-3 px-4">Pembeli</th>
                  <th className="py-3 px-4">Barang Belanjaan</th>
                  <th className="py-3 px-4">Total Bayar</th>
                  <th className="py-3 px-4">Metode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {o.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">{o.customer.name}</div>
                      <div className="text-[11px] text-slate-400">{o.customer.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">
                        {o.items.length} jenis produk
                      </span>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {o.items.map((i) => `${i.product.name} (${i.quantity})`).join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-forest">
                      {formatRupiah(o.total)}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {o.paymentMethod === 'cod' ? 'COD (Tunai)' : 'Transfer Bank'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'baru'
                          ? 'bg-amber-100 text-amber-900'
                          : o.status === 'diproses'
                          ? 'bg-blue-100 text-blue-800'
                          : o.status === 'dikirim'
                          ? 'bg-purple-100 text-purple-800'
                          : o.status === 'selesai'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-forest hover:bg-slate-100 transition-colors"
                          title="Lihat Detail & Ubah Status"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(o.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Pesanan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Detail Pesanan: ${selectedOrder.id}`}
          size="md"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pembeli:</span>
                <strong className="text-slate-800">{selectedOrder.customer.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor WhatsApp:</span>
                <strong className="text-slate-800">{selectedOrder.customer.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alamat Pengiriman:</span>
                <span className="font-medium text-slate-800 text-right max-w-[65%]">
                  {selectedOrder.customer.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu Pemesanan:</span>
                <strong className="text-slate-800">{formatDateTime(selectedOrder.createdAt)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode Pembayaran:</span>
                <strong className="text-slate-800">{selectedOrder.paymentMethod === 'cod' ? 'COD (Tunai)' : 'Transfer Bank (Simulasi)'}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Total Pembayaran:</span>
                <strong className="text-forest font-bold text-sm">{formatRupiah(selectedOrder.total)}</strong>
              </div>
            </div>

            {/* Daftar Produk */}
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Daftar Barang Belanja:
              </span>
              <div className="space-y-2 divide-y divide-slate-100">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{it.product.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {it.quantity} × {formatRupiah(it.product.price)}
                      </p>
                    </div>
                    <span className="font-semibold text-slate-700">
                      {formatRupiah(it.product.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Status Changer */}
            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-800 block mb-2">Ubah Status Pesanan:</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(['baru', 'diproses', 'dikirim', 'selesai', 'dibatalkan'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleChangeStatus(selectedOrder.id, st)}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold capitalize transition-all border ${
                      selectedOrder.status === st
                        ? 'bg-forest text-white border-forest shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                onClick={() => setSelectedOrder(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
