// ============================================================
// contexts/CartContext.tsx — Konteks keranjang belanja global
// ============================================================

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ── Shape ─────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  addItem?: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  removeItem?: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// ── Context ───────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('wana-cart', []);
  const [isOpen, setIsOpen] = useState(false);

  // Filter items safely in case corrupted data exists
  const safeItems = Array.isArray(items)
    ? items.filter((i) => i && i.product && typeof i.quantity === 'number')
    : [];

  const totalItems = safeItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = safeItems.reduce(
    (sum, i) => sum + (i.product?.price || 0) * i.quantity,
    0
  );

  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (!product || product.stock <= 0) return;
    setItems((prev) => {
      const validPrev = Array.isArray(prev) ? prev : [];
      const existing = validPrev.find((i) => i.product?.id === product.id);
      if (existing) {
        return validPrev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        );
      }
      return [...validPrev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  }, [setItems]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => (Array.isArray(prev) ? prev.filter((i) => i.product?.id !== productId) : []));
  }, [setItems]);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setItems((prev) => {
        const validPrev = Array.isArray(prev) ? prev : [];
        return validPrev.map((i) =>
          i.product?.id === productId
            ? { ...i, quantity: Math.min(quantity, i.product.stock) }
            : i
        );
      });
    },
    [removeFromCart, setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <CartContext.Provider
      value={{
        items: safeItems,
        isOpen,
        totalItems,
        totalPrice,
        addToCart,
        addItem: addToCart,
        removeFromCart,
        removeItem: removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }
  return ctx;
}
