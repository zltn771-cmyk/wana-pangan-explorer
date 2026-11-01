import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { OrderHistorySection } from '@/components/produk';

export default function PesananPage() {
  return (
    <div className="w-full bg-beige min-h-screen pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="container-base flex items-center justify-between text-xs">
          <Link
            to="/produk"
            className="flex items-center gap-1.5 text-slate-600 hover:text-forest font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Kembali ke Katalog Produk</span>
          </Link>
          <span className="text-slate-400">Riwayat Transaksi (Simulasi)</span>
        </div>
      </div>

      <div className="container-base py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <OrderHistorySection />

          <div className="text-center pt-4">
            <Link to="/produk">
              <Button variant="outline" size="sm" leftIcon={<ShoppingBag size={14} />}>
                Lanjutkan Eksplorasi Produk Pangan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
