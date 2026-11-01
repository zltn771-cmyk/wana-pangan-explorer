import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { Layout } from '@/components/layout';
import { DashboardLayout } from '@/components/layout';

// Pages — Public
import HomePage from '@/pages/HomePage';
import WisataPage from '@/pages/WisataPage';
import WisataDetailPage from '@/pages/WisataDetailPage';
import ProdukPage from '@/pages/ProdukPage';
import ProdukDetailPage from '@/pages/ProdukDetailPage';
import CheckoutPage from '@/pages/CheckoutPage';
import PesananPage from '@/pages/PesananPage';
import KonservasiPage from '@/pages/KonservasiPage';
import LumbungPage from '@/pages/LumbungPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Pages — Dashboard
import DashboardHomePage from '@/pages/dashboard/DashboardHomePage';
import DashboardProdukPage from '@/pages/dashboard/DashboardProdukPage';
import DashboardDestinasiPage from '@/pages/dashboard/DashboardDestinasiPage';
import DashboardBookingPage from '@/pages/dashboard/DashboardBookingPage';
import DashboardPesananPage from '@/pages/dashboard/DashboardPesananPage';
import DashboardKonservasiPage from '@/pages/dashboard/DashboardKonservasiPage';
import DashboardLumbungPage from '@/pages/dashboard/DashboardLumbungPage';
import DashboardCadanganPanganPage from '@/pages/dashboard/DashboardCadanganPanganPage';
import DashboardPengaturanPage from '@/pages/dashboard/DashboardPengaturanPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <Routes>
            {/* ── Public routes ── */}
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="wisata" element={<WisataPage />} />
              <Route path="wisata/:id" element={<WisataDetailPage />} />
              <Route path="produk" element={<ProdukPage />} />
              <Route path="produk/:id" element={<ProdukDetailPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="pesanan" element={<PesananPage />} />
              <Route path="konservasi" element={<KonservasiPage />} />
              <Route path="lumbung" element={<LumbungPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* ── Dashboard routes ── */}
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHomePage />} />
              <Route path="produk" element={<DashboardProdukPage />} />
              <Route path="destinasi" element={<DashboardDestinasiPage />} />
              <Route path="booking" element={<DashboardBookingPage />} />
              <Route path="pesanan" element={<DashboardPesananPage />} />
              <Route path="konservasi" element={<DashboardKonservasiPage />} />
              <Route path="lumbung" element={<DashboardLumbungPage />} />
              <Route path="cadangan-pangan" element={<DashboardCadanganPanganPage />} />
              <Route path="pengaturan" element={<DashboardPengaturanPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
