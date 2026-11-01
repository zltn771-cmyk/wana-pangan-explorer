import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowLeft,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';
import { Button, Input, Textarea, SimulasiLabel, SimulasiBox, Modal, EmptyState } from '@/components/ui';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah } from '@/utils/format';
import type { Order } from '@/types';

const KABUPATEN_OPTIONS = [
  'Kabupaten Kepahiang',
  'Kabupaten Rejang Lebong',
  'Kabupaten Bengkulu Tengah',
  'Kota Bengkulu',
  'Kabupaten Bengkulu Utara',
  'Kabupaten Bengkulu Selatan',
  'Luar Provinsi Bengkulu',
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { reduceStock, products } = useProducts();
  const { showToast } = useToast();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province] = useState('Bengkulu');
  const [kabupaten, setKabupaten] = useState(KABUPATEN_OPTIONS[0]);
  const [kecamatan, setKecamatan] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cod'>('transfer');

  // Error & Status states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  // Biaya pengiriman flat simulasi
  const shippingCost = items.length > 0 ? 15000 : 0;
  const grandTotal = totalPrice + shippingCost;

  // Validasi form
  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Nama lengkap pembeli wajib diisi.';
    if (!phone.trim()) {
      errs.phone = 'Nomor WhatsApp wajib diisi.';
    } else if (!/^[0-9+-\s]{8,15}$/.test(phone.trim())) {
      errs.phone = 'Format nomor WhatsApp tidak valid.';
    }
    if (!address.trim()) errs.address = 'Alamat jalan/dusun/desa pengiriman wajib diisi.';
    if (!kecamatan.trim()) errs.kecamatan = 'Kecamatan tujuan pengiriman wajib diisi.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (items.length === 0) {
      showToast('Keranjang belanja Anda masih kosong.', 'warning');
      return;
    }

    // Periksa apakah kuantitas melebihi stok terkini
    for (const itm of items) {
      const currentPrd = products.find((p) => p.id === itm.product.id);
      if (currentPrd && itm.quantity > currentPrd.stock) {
        showToast(
          `Pesanan gagal: Kuantitas ${itm.product.name} (${itm.quantity}) melebihi stok tersedia (${currentPrd.stock}).`,
          'error',
          5000
        );
        return;
      }
    }

    if (!validateForm()) {
      showToast('Mohon lengkapi seluruh formulir data pengiriman wajib.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullAddress = `${address.trim()}, Kec. ${kecamatan.trim()}, ${kabupaten}, Prov. ${province}`;

      const newOrder = createOrder(
        [...items],
        {
          name: name.trim(),
          phone: phone.trim(),
          address: fullAddress,
          note: note.trim() || undefined,
        },
        grandTotal,
        paymentMethod,
        shippingCost
      );

      // Kurangi stok produk secara atomik (tidak menjadi negatif)
      items.forEach((itm) => {
        reduceStock(itm.product.id, itm.quantity);
      });

      // Kosongkan keranjang belanja
      clearCart();
      setSuccessOrder(newOrder);
      showToast('Pesanan simulasi berhasil dikonfirmasi!', 'success', 4000);
    } catch {
      showToast('Gagal memproses pesanan.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jika keranjang kosong dan belum ada order yang berhasil dibuat
  if (items.length === 0 && !successOrder) {
    return (
      <div className="container-base py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <EmptyState
          icon={<ShoppingBag size={36} className="text-forest" />}
          title="Keranjang Belanja Kosong"
          description="Anda belum menambahkan produk pangan lokal ke dalam keranjang. Silakan jelajahi katalog komoditas kami terlebih dahulu."
          action={
            <Link to="/produk">
              <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
                Mulai Belanja Produk Pangan
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-beige min-h-screen pb-20">
      {/* ── Breadcrumb Bar ── */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="container-base flex items-center justify-between text-xs">
          <Link
            to="/produk"
            className="flex items-center gap-1.5 text-slate-600 hover:text-forest font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Kembali ke Katalog Produk</span>
          </Link>
          <span className="text-slate-400">Checkout Pemesanan (Simulasi)</span>
        </div>
      </div>

      <div className="container-base py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Title */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-earth uppercase tracking-wider">
                Simulasi Checkout
              </span>
              <SimulasiLabel text="Tanpa Transaksi Finansial Riil" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Konfirmasi Pemesanan Pangan Lokal
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Lengkapi informasi pengiriman untuk menyelesaikan simulasi pemesanan produk UMKM desa hutan.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: Shipping Form */}
              <div className="lg:col-span-7 space-y-6">
                {/* Form Alamat */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-5">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Truck size={20} className="text-forest" />
                    <span>Data Pengiriman</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nama Lengkap Penerima *"
                      placeholder="Contoh: Budi Santoso"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Nomor WhatsApp *"
                      placeholder="Contoh: 0812-3456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={errors.phone}
                    />
                  </div>

                  <Textarea
                    label="Alamat Lengkap Jalan / Dusun / RT-RW *"
                    placeholder="Contoh: Jl. Lintas Kepahiang-Curup KM 7, Dusun II"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={errors.address}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Kabupaten / Kota *
                      </label>
                      <select
                        value={kabupaten}
                        onChange={(e) => setKabupaten(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
                      >
                        {KABUPATEN_OPTIONS.map((kab) => (
                          <option key={kab} value={kab}>
                            {kab}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Input
                      label="Kecamatan *"
                      placeholder="Contoh: Ujan Mas / Selupu Rejang"
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                      error={errors.kecamatan}
                    />
                  </div>

                  <Textarea
                    label="Catatan Pengiriman (Opsional)"
                    placeholder="Misal: titipkan di pos satpam, atau rumah pagar hijau..."
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {/* Pilihan Metode Pembayaran Simulasi */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <CreditCard size={20} className="text-forest" />
                    <span>Metode Pembayaran (Simulasi)</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'transfer'
                          ? 'border-forest bg-forest/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-forest">Transfer Bank</span>
                        {paymentMethod === 'transfer' && <CheckCircle2 size={16} className="text-forest" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Simulasi pembayaran via Virtual Account / Transfer Bank lokal.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-forest bg-forest/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-forest">Bayar di Tempat (COD)</span>
                        {paymentMethod === 'cod' && <CheckCircle2 size={16} className="text-forest" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Simulasi pembayaran tunai saat kurir lokal menyerahkan produk.
                      </p>
                    </button>
                  </div>

                  <SimulasiBox>
                    <p className="text-xs">
                      <strong>Tidak Memerlukan Pembayaran Riil:</strong> Platform ini adalah prototipe.
                      Pilihan metode di atas hanya untuk demonstrasi alur transaksi e-commerce.
                    </p>
                  </SimulasiBox>
                </div>
              </div>

              {/* RIGHT: Order Summary */}
              <div className="lg:col-span-5 sticky top-[90px] space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
                  <h3 className="font-bold text-base text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <span>Ringkasan Belanja</span>
                    <span className="text-xs font-normal text-slate-500">
                      {items.reduce((s, i) => s + i.quantity, 0)} Barang
                    </span>
                  </h3>

                  {/* Items list */}
                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-100"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                            <p className="text-[11px] text-slate-400">
                              {item.quantity} × {formatRupiah(item.product.price)}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-slate-700 shrink-0">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal Produk:</span>
                      <span className="font-semibold text-slate-800">{formatRupiah(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ongkos Kirim Flat (Simulasi):</span>
                      <span className="font-semibold text-slate-800">{formatRupiah(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-base font-bold text-forest">
                      <span>Total Pembayaran:</span>
                      <span className="text-xl font-black">{formatRupiah(grandTotal)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center font-bold shadow-md shadow-forest/20"
                      loading={isSubmitting}
                    >
                      Konfirmasi Pesanan ({formatRupiah(grandTotal)})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ── Modal Konfirmasi Pesanan Sukses ── */}
      {successOrder && (
        <Modal
          isOpen={!!successOrder}
          onClose={() => navigate('/produk')}
          title="Pesanan Berhasil Dicatat (Simulasi)"
          size="md"
        >
          <div className="space-y-4">
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-forest rounded-full flex items-center justify-center mx-auto mb-3">
                <PackageCheck size={32} />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Pemesanan Berhasil Disimpan!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Nomor Pesanan: <strong className="text-forest font-mono">{successOrder.id}</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Penerima:</span>
                <span className="font-bold text-slate-800">{successOrder.customer.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="font-semibold text-slate-800">{successOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Alamat:</span>
                <span className="font-medium text-slate-700 text-right truncate max-w-[60%]">
                  {successOrder.customer.address}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Pembayaran:</span>
                <span className="font-bold text-forest">{formatRupiah(successOrder.total)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                  Pesanan Dibuat (Simulasi)
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed">
              Pesanan ini telah tersimpan di <strong>LocalStorage</strong> browser Anda. Keranjang belanja
              telah dikosongkan. Anda dapat memantau status pesanan kapan saja pada tab <strong>Riwayat Pesanan</strong> di katalog produk.
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                variant="outline"
                size="md"
                className="flex-1 justify-center"
                onClick={() => navigate('/produk')}
              >
                Kembali ke Katalog
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1 justify-center"
                onClick={() => navigate('/produk?tab=pesanan')}
              >
                Lihat Riwayat Pesanan
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
