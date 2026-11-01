import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Masalah', href: '#masalah' },
  { label: 'Model', href: '#model' },
  { label: 'Konfigurator', href: '#konfigurator' },
  { label: 'Desa', href: '#desa' },
  { label: 'Peta Jalan', href: '#roadmap' },
  { label: 'Etika', href: '#etika' },
  { label: 'Sumber', href: '#sumber' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Navigasi Utama"
      className="sticky top-[40px] z-40 w-full bg-forest-dark/95 backdrop-blur transition-all duration-200 border-b border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              className="font-serif text-2xl font-bold text-cream hover:text-terracotta transition-colors duration-200 tracking-tight scroll-smooth"
            >
              Wana Pangan
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-cream hover:text-terracotta text-sm lg:text-base font-medium transition duration-200 scroll-smooth"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="p-2 rounded-md text-cream hover:text-terracotta hover:bg-forest transition duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-forest-dark border-t border-cream/10 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-cream hover:text-terracotta hover:bg-forest/50 transition duration-200 scroll-smooth"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
