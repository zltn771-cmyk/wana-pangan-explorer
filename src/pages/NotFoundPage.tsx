import { Link } from 'react-router-dom';
import { Compass, Home, MapPin, Package, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { Button, SimulasiBox } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <div className="w-full bg-beige min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-md text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
          <Compass size={44} strokeWidth={1.75} className="animate-pulse" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-earth">
            Galat 404 • Halaman Tersesat
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Jejak Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            Halaman yang Anda tuju mungkin telah dipindahkan, diubah jalurnya, atau tautan yang dimasukkan belum terdaftar dalam prototipe Wana Pangan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full justify-center text-xs font-bold"
              leftIcon={<Home size={15} />}
            >
              Kembali ke Beranda
            </Button>
          </Link>
          <Link to="/wisata" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full justify-center text-xs font-medium"
              leftIcon={<MapPin size={15} />}
            >
              Katalog Wisata
            </Button>
          </Link>
          <Link to="/produk" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full justify-center text-xs font-medium"
              leftIcon={<Package size={15} />}
            >
              Marketplace Pangan
            </Button>
          </Link>
        </div>

        {/* Prototype Context Note */}
        <div className="pt-4 border-t border-slate-100 text-left">
          <SimulasiBox>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>Catatan Prototipe:</strong> Seluruh rute resmi Wana Pangan mencakup Wisata, Produk, Konservasi, Lumbung Wana, dan Dashboard Pengelola.
            </p>
          </SimulasiBox>
        </div>
      </div>
    </div>
  );
}
