// ============================================================
// components/layout/Navbar.tsx — Navbar premium WANA PANGAN
// ============================================================

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// ── Nav items ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Beranda', to: '/' },
  { label: 'Wisata', to: '/wisata' },
  { label: 'Produk Lokal', to: '/produk' },
  { label: 'Konservasi', to: '/konservasi' },
  { label: 'Lumbung Wana', to: '/lumbung' },
] as const;

// ── Logo ──────────────────────────────────────────────────────
function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 select-none"
      aria-label="Beranda WANA PANGAN"
    >
      {/* Leaf icon in a pill */}
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage to-forest shadow-md shadow-forest/30">
        <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} />
      </span>
      <span className="text-lg font-bold tracking-tight">
        <span className="bg-gradient-to-r from-sage to-white bg-clip-text text-transparent">
          WANA
        </span>{' '}
        <span className="text-white">PANGAN</span>
      </span>
    </Link>
  );
}

// ── Desktop nav link ──────────────────────────────────────────
function DesktopNavLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        [
          'relative px-1 py-1 text-sm font-medium transition-colors duration-200',
          isActive
            ? 'text-sage'
            : 'text-white/70 hover:text-sage',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <span className="absolute -bottom-[1px] left-0 h-[2px] w-full rounded-full bg-sage" />
          )}
        </>
      )}
    </NavLink>
  );
}

// ── Mobile nav link ───────────────────────────────────────────
function MobileNavLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-150',
          isActive
            ? 'bg-forest text-sage'
            : 'text-white/80 hover:bg-white/5 hover:text-sage',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          )}
          {label}
        </>
      )}
    </NavLink>
  );
}

// ── Cart button ───────────────────────────────────────────────
function CartButton() {
  const { totalItems, toggleCart } = useCart();
  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Keranjang belanja, ${totalItems} produk`}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}

// ── Main Navbar ───────────────────────────────────────────────
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tutup menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cegah scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Sticky bar ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 h-[72px] transition-shadow duration-300',
          'bg-deep/95 backdrop-blur-md',
          scrolled ? 'shadow-lg shadow-black/20' : '',
        ].join(' ')}
      >
        <div className="container-base flex h-full items-center justify-between gap-6">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Desktop nav */}
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-6 lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>

          {/* Right: Cart + Dashboard + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Cart icon: selalu tampil */}
            <CartButton />

            {/* Dashboard button: hanya desktop */}
            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-xl border border-sage px-4 py-1.5 text-sm font-semibold text-sage transition-colors duration-200 hover:bg-sage hover:text-deep lg:flex"
            >
              Dashboard
            </Link>

            {/* Hamburger: hanya mobile */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer backdrop ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={[
          'fixed inset-x-0 top-[72px] z-40 overflow-y-auto bg-deep transition-all duration-300 ease-in-out lg:hidden',
          menuOpen
            ? 'max-h-[calc(100vh-72px)] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav
          aria-label="Navigasi mobile"
          className="flex flex-col gap-1 p-4 pb-6"
        >
          {NAV_ITEMS.map((item) => (
            <MobileNavLink
              key={item.to}
              to={item.to}
              label={item.label}
              onClick={closeMenu}
            />
          ))}

          {/* Divider */}
          <div className="my-2 h-px bg-white/10" />

          {/* Dashboard */}
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-xl border border-sage px-4 py-3 text-base font-semibold text-sage transition-colors hover:bg-sage hover:text-deep"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </>
  );
}
