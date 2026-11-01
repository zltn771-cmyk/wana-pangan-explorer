import { useState } from 'react';
import { Settings, RotateCcw, Database, ShieldAlert, CheckCircle2, User } from 'lucide-react';
import { Button, SimulasiBox, Modal } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import { useDestinations } from '@/hooks/useDestinations';
import { useBookings } from '@/hooks/useBookings';
import { useOrders } from '@/hooks/useOrders';
import { usePrograms } from '@/hooks/usePrograms';
import { useContributions } from '@/hooks/useContributions';
import { useLumbung } from '@/hooks/useLumbung';
import { useToast } from '@/contexts/ToastContext';

export function DashboardPengaturanPage() {
  const { resetProducts } = useProducts();
  const { resetDestinations } = useDestinations();
  const { resetBookings } = useBookings();
  const { resetOrders } = useOrders();
  const { resetPrograms } = usePrograms();
  const { resetContributions } = useContributions();
  const { resetLumbung } = useLumbung();
  const { showToast } = useToast();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleResetAllData = () => {
    resetProducts();
    resetDestinations();
    resetBookings();
    resetOrders();
    resetPrograms();
    resetContributions();
    resetLumbung();
    try {
      window.localStorage.removeItem('wana-cart');
    } catch {}

    setIsResetModalOpen(false);
    showToast('Seluruh data prototipe berhasil direset ke kondisi awal!', 'success', 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <span className="text-xs font-semibold text-earth uppercase tracking-wider">
          Pengaturan Sistem
        </span>
        <h2 className="text-xl font-bold text-slate-800">
          Konfigurasi Prototipe & Penyimpanan Lokal
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Informasi lingkungan demonstrasi Wana Pangan dan manajemen state peramban.
        </p>
      </div>

      {/* Profil Pengelola Demo */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
          <User size={16} className="text-forest" />
          <span>Identitas Pengelola Prototipe</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block mb-1">Nama Organisasi / Koperasi</span>
            <strong className="text-slate-800 text-sm">Koperasi Ecopreneur Wana Pangan Bengkulu</strong>
            <p className="text-[11px] text-slate-500 mt-0.5">Percontohan Terpadu Kepahiang & Rejang Lebong</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block mb-1">Status Autentikasi</span>
            <strong className="text-forest text-sm">Mode Akses Simulasi Terbuka</strong>
            <p className="text-[11px] text-slate-500 mt-0.5">Belum terhubung ke autentikasi backend riil</p>
          </div>
        </div>
      </div>

      {/* Status Penyimpanan LocalStorage */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
          <Database size={16} className="text-forest" />
          <span>Status Penyimpanan Browser (LocalStorage)</span>
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          Seluruh entitas platform Wana Pangan disimpan secara mandiri pada peramban web Anda menggunakan teknologi
          HTML5 LocalStorage. Ini menjamin data tetap utuh ketika halaman dimuat ulang (refresh) tanpa membutuhkan server database eksternal.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Kunci Produk</span>
            <strong className="text-slate-700">wana-products</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Kunci Destinasi</span>
            <strong className="text-slate-700">wana-destinations</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Kunci Transaksi</span>
            <strong className="text-slate-700">wana-orders & bkg</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Kunci Lumbung</span>
            <strong className="text-slate-700">wana-lumbung-tx</strong>
          </div>
        </div>
      </div>

      {/* Reset Data Section */}
      <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-red-700 flex items-center gap-2">
              <ShieldAlert size={16} className="text-red-600" />
              <span>Zona Pemulihan Data Prototipe</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              Jika Anda ingin mengembalikan seluruh produk, destinasi, transaksi kas, dan riwayat pesanan
              ke kondisi demonstrasi awal (fresh seed), Anda dapat menjalankan pemulihan data di bawah ini.
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsResetModalOpen(true)}
            className="text-xs font-bold shrink-0"
            leftIcon={<RotateCcw size={14} />}
          >
            Reset Semua Data
          </Button>
        </div>
      </div>

      {/* Modal Konfirmasi Reset */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Konfirmasi Reset Data Prototipe"
        size="md"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <p className="leading-relaxed">
            Tindakan ini akan mengembalikan seluruh katalog produk, destinasi, program konservasi, buku kas Lumbung Wana,
            dan persediaan fisik pangan ke <strong>kondisi data simulasi awal</strong>.
          </p>

          <SimulasiBox>
            <p className="text-xs">
              Seluruh pesanan buatan Anda di marketplace dan tiket booking yang pernah dicatat akan dikosongkan.
            </p>
          </SimulasiBox>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1 justify-center"
              onClick={() => setIsResetModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              size="md"
              className="flex-1 justify-center font-bold"
              onClick={handleResetAllData}
            >
              Ya, Reset Sekarang
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardPengaturanPage;
