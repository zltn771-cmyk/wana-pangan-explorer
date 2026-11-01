import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const NAV_ITEMS = [
  { label: 'Beranda', to: '/' },
  { label: 'Wisata', to: '/wisata' },
  { label: 'Produk Lokal', to: '/produk' },
  { label: 'Konservasi', to: '/konservasi' },
  { label: 'Lumbung Wana', to: '/lumbung' },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 select-none group" aria-label="Beranda WANA PANGAN">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sage via-forest to-deep shadow-lg shadow-forest/40 group-hover:shadow-forest/60 group-hover:scale-105 transition-all duration-300">
        <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} />
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-sage/80 uppercase">Platform Ecopreneurship</span>
        <span className="text-[17px] font-extrabold tracking-wide">
          <span className="gradient-text-forest">WANA</span>{' '}
          <span className="text-white">PANGAN</span>
        </span>
      </div>
    </Link>
  );
}

function DesktopNavLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => [
        'relative px-1 py-1.5 text-sm font-semibold transition-colors duration-200 group',
        isActive ? 'text-sage' : 'text-white/65 hover:text-white',
      ].join(' ')}
    >
      {({ isActive }) => (
        <>
          {label}
          <span className={[
            'absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full transition-all duration-300',
            isActive
              ? 'bg-gradient-to-r from-sage to-sage-light scale-x-100 opacity-100'
              : 'bg-sage scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50',
          ].join(' ')} />
        </>
      )}
    </NavLink>
  );
}

function MobileNavLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) => [
        'flex items-center gap-3 rounded-2xl px-5 py-3.5 text-base font-semibold transition-all duration-200',
        isActive
          ? 'bg-gradient-to-r from-forest to-forest-mid text-sage shadow-md'
          : 'text-white/70 hover:bg-white/6 hover:text-white',
      ].join(' ')}
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="h-2 w-2 rounded-full bg-sage animate-pulse-soft shrink-0" />}
          {label}
        </>
      )}
    </NavLink>
  );
}

function CartButton() {
  const { totalItems, toggleCart } = useCart();
  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Keranjang belanja, ${totalItems} produk`}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition-all hover:bg-white/10 hover:text-white hover:scale-105"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[10px] font-extrabold text-white shadow-md animate-scale-in">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Header ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-400',
          scrolled
            ? 'bg-deep/97 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/6'
            : 'bg-transparent',
        ].join(' ')}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sage via-forest to-sage transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="container-base flex h-full items-center justify-between gap-6">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <CartButton />
            <Link
              to="/dashboard"
              className="hidden lg:inline-flex items-center gap-2 rounded-2xl border border-sage/40 bg-sage/8 px-4 py-2 text-sm font-bold text-sage hover:bg-sage hover:text-deep transition-all duration-250 shadow-sm hover:shadow-sage/25 hover:shadow-md"
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition-all hover:bg-white/10 hover:text-white lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden animate-backdrop-in"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={[
          'fixed inset-x-0 top-[72px] z-40 overflow-hidden bg-deep/98 backdrop-blur-xl transition-all duration-350 ease-in-out lg:hidden border-b border-white/8',
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Navigasi mobile" className="flex flex-col gap-1.5 p-5 pb-8">
          {NAV_ITEMS.map((item) => (
            <MobileNavLink key={item.to} to={item.to} label={item.label} onClick={closeMenu} />
          ))}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-forest to-forest-mid border border-sage/30 px-5 py-3.5 text-base font-bold text-sage shadow-lg hover:brightness-110 transition-all"
          >
            <LayoutDashboard size={16} />
            Dashboard Pengelola
          </Link>
        </nav>
      </div>
    </>
  );
}
