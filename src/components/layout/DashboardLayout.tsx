import { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MapPin,
  Leaf,
  Landmark,
  Wheat,
  Ticket,
  Settings,
  ArrowLeft,
  Menu,
  X,
  User,
  ExternalLink,
} from 'lucide-react';
import { SimulasiBox, ToastContainer } from '@/components/ui';

interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

const DASHBOARD_NAV: NavItem[] = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'Manajemen Produk', to: '/dashboard/produk', icon: Package },
  { label: 'Manajemen Destinasi', to: '/dashboard/destinasi', icon: MapPin },
  { label: 'Manajemen Booking', to: '/dashboard/booking', icon: Ticket },
  { label: 'Manajemen Pesanan', to: '/dashboard/pesanan', icon: ShoppingBag },
  { label: 'Program Konservasi', to: '/dashboard/konservasi', icon: Leaf },
  { label: 'Dana Lumbung Wana', to: '/dashboard/lumbung', icon: Landmark },
  { label: 'Cadangan Pangan', to: '/dashboard/cadangan-pangan', icon: Wheat },
  { label: 'Pengaturan', to: '/dashboard/pengaturan', icon: Settings },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const match = DASHBOARD_NAV.find((item) =>
      item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)
    );
    return match ? match.label : 'Dashboard Pengelola';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-ink">
      {/* ── MOBILE BACKDROP ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-deep text-white flex flex-col transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo / Brand Header */}
        <div className="h-18 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage to-forest shadow-md">
              <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <div className="leading-tight">
              <span className="font-bold text-white tracking-wide block text-sm">WANA PANGAN</span>
              <span className="text-[10px] text-sage tracking-wider uppercase">Portal Pengelola</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white/70 hover:text-white p-1 rounded-lg"
            aria-label="Tutup Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sage/70">
            Menu Utama
          </div>
          {DASHBOARD_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-forest text-white shadow-xs font-semibold'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={16} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Bar: Back to Public Site */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <Link
            to="/"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={15} />
              Kembali ke Website
            </span>
            <ExternalLink size={13} className="opacity-60" />
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-forest hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Buka Menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base md:text-lg font-bold text-slate-800">{getPageTitle()}</h1>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 py-1 px-3 bg-slate-100/80 rounded-full border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center text-xs font-semibold">
                <User size={13} />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-tight">Pengelola Demo</p>
                <p className="text-[10px] text-slate-400 leading-none">Simulasi Multi-Desa</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body Area */}
        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Global Simulation Disclaimer Box */}
          <SimulasiBox>
            <p className="font-semibold text-xs">
              Portal Pengelola Wana Pangan (Mode Simulasi Prototipe)
            </p>
            <p className="text-[11px] text-amber-700/90 mt-0.5">
              Seluruh data produk, destinasi, pesanan, booking, dan transaksi tersimpan secara lokal di browser Anda (LocalStorage).
              Perubahan data di dashboard ini akan langsung tercermin secara real-time pada halaman publik.
            </p>
          </SimulasiBox>

          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default DashboardLayout;
