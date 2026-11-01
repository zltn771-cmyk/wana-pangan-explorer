import { PackageCheck, Calendar, MapPin, XCircle, CreditCard, Clock, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button, EmptyState, SimulasiLabel } from '@/components/ui';
import { useOrders } from '@/hooks/useOrders';
import { formatRupiah, formatDateTime } from '@/utils/format';
import { useToast } from '@/contexts/ToastContext';

export function OrderHistorySection() {
  const { orders, updateStatus } = useOrders();
  const { showToast } = useToast();

  const handleCancelOrder = (id: string) => {
    if (window.confirm(`Yakin ingin membatalkan pesanan simulasi (${id})?`)) {
      updateStatus(id, 'dibatalkan');
      showToast(`Pesanan ${id} berhasil dibatalkan.`, 'info');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-forest uppercase tracking-wider">
            LocalStorage Persistence
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            Riwayat Pesanan Produk Saya
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <SimulasiLabel text="Tersimpan di Browser" />
        </div>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={32} className="text-forest" />}
          title="Belum Ada Riwayat Pesanan Produk"
          description="Anda belum melakukan simulasi pembelian produk pangan lokal. Silakan pilih produk dari katalog dan lakukan checkout simulasi."
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isCancelled = order.status === 'dibatalkan';
            return (
              <div
                key={order.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCancelled
                    ? 'bg-slate-50 border-slate-200 opacity-75'
                    : 'bg-white border-slate-200/90 hover:border-forest/40 shadow-xs'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {order.id}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={13} /> {formatDateTime(order.createdAt)}
                    </span>
                  </div>

                  <div>
                    {isCancelled ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
                        Dibatalkan
                      </span>
                    ) : order.status === 'selesai' ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Selesai (Simulasi)
                      </span>
                    ) : order.status === 'dikirim' ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                        Dalam Pengiriman (Simulasi)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                        Pesanan Diterima (Simulasi)
                      </span>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="py-3 divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://placehold.co/40x40/8FAF91/174B35?text=WP';
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-800">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {item.quantity} × {formatRupiah(item.product.price)} (Desa {item.product.desa})
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-700">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Meta */}
                <div className="py-2.5 px-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-forest shrink-0" />
                    <span className="truncate">
                      Penerima: <strong>{order.customer.name}</strong> ({order.customer.phone}) — {order.customer.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
                    <CreditCard size={13} className="text-earth" />
                    <span>Metode: {order.paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' : 'Transfer Bank (Simulasi)'}</span>
                  </div>
                </div>

                {/* Footer Baris: Total & Aksi */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4 mt-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Pembayaran:</span>
                    <span className="text-base font-bold text-forest">
                      {formatRupiah(order.total)}
                    </span>
                  </div>

                  {!isCancelled && order.status !== 'selesai' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      leftIcon={<XCircle size={14} />}
                    >
                      Batalkan Pesanan
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistorySection;
