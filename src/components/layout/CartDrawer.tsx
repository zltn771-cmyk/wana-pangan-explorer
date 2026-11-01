// ============================================================
// components/layout/CartDrawer.tsx — Drawer keranjang belanja
// ============================================================

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { SimulasiLabel } from '@/components/ui';
import { formatRupiah } from '@/utils/format';
import type { CartItem } from '@/types';

// ── Empty state ───────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-beige">
        <ShoppingCart className="h-10 w-10 text-sage" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-semibold text-slate-700">Keranjang masih kosong</p>
        <p className="mt-1 text-sm text-slate-500">
          Tambahkan produk lokal dari desa mitra kami untuk memulai belanja.
        </p>
      </div>
    </div>
  );
}

// ── Cart item row ─────────────────────────────────────────────
function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-start gap-3 py-4">
      {/* Gambar produk */}
      <img
        src={product.image}
        alt={product.name}
        className="h-16 w-16 shrink-0 rounded-xl object-cover shadow-sm"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'https://placehold.co/64x64/8FAF91/174B35?text=WP';
        }}
      />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">
          {product.name}
        </p>
        <p className="truncate text-xs text-slate-500">
          {product.asalWilayah || 'Provinsi Bengkulu'} · {product.unit}
        </p>

        {/* Harga + simulasi label */}
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-forest">
            {formatRupiah(product.price * quantity)}
          </span>
          <SimulasiLabel />
        </div>

        {/* Quantity controls */}
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label="Kurangi jumlah"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-forest hover:text-forest disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-slate-800">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            aria-label="Tambah jumlah"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-forest hover:text-forest disabled:opacity-40"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          {/* Hapus */}
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Hapus ${product.name} dari keranjang`}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main CartDrawer ───────────────────────────────────────────
export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  // Cegah scroll body saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Tutup dengan ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={[
          'fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        className={[
          'fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest/10">
              <ShoppingCart className="h-5 w-5 text-forest" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Keranjang Belanja
              </h2>
              {totalItems > 0 && (
                <p className="text-xs text-slate-500">
                  {totalItems} produk dipilih
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Body: item list ── */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer: total + actions ── */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-5 space-y-4">
            {/* Total */}
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium text-slate-600">
                Total Pembayaran
              </span>
              <div className="text-right">
                <p className="text-xl font-bold text-forest">
                  {formatRupiah(totalPrice)}
                </p>
                <SimulasiLabel className="mt-1" />
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 text-sm font-bold text-white shadow-md shadow-forest/25 transition hover:bg-forest/90 active:scale-[0.98]"
            >
              Lanjut ke Pembayaran
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Lanjutkan Belanja
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
