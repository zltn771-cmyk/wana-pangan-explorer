import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { ToastContainer } from '@/components/ui';
import { useScrollTop } from '@/hooks/useScrollTop';

export function Layout() {
  useScrollTop();

  return (
    <div className="min-h-screen flex flex-col bg-beige text-ink">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Cart Drawer */}
      <CartDrawer />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Layout;
