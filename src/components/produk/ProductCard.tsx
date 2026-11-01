import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Eye, Check } from 'lucide-react';
import { Button, SimulasiLabel } from '@/components/ui';
import type { Product } from '@/types';
import { PRODUCT_CATEGORIES } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(
      `"${product.name}" berhasil ditambahkan ke keranjang belanja.`,
      'success',
      3000
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      {/* Visual Header */}
      <Link to={`/produk/${product.id}`} className="block relative h-52 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/400x300/8FAF91/174B35?text=Wana+Pangan';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-forest backdrop-blur-xs shadow-xs">
            {PRODUCT_CATEGORIES[product.category] || product.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-xs">
            Stok: {product.stock}
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] mb-1.5 flex items-center justify-between gap-2">
            <span className="font-semibold text-forest truncate">{product.asalWilayah}</span>
            <span className="text-[10px] text-slate-400 shrink-0 font-medium">{product.unit}</span>
          </div>

          <Link to={`/produk/${product.id}`}>
            <h3 className="font-bold text-base text-slate-800 mb-1.5 leading-snug group-hover:text-forest transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Bahan Baku & Nilai Tambah Card */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1 mb-3">
            <p className="line-clamp-1">
              <span className="font-semibold text-slate-700">Bahan Baku:</span> {product.bahanBaku}
            </p>
            <p className="line-clamp-1">
              <span className="font-semibold text-slate-700">Nilai Tambah:</span> {product.bentukPengolahan}
            </p>
          </div>

          <p className="text-[10px] text-slate-400 italic mb-2">
            Basis: {product.produsen}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-bold text-forest">
              {formatRupiah(product.price)}
            </div>
            <div className="mt-0.5">
              <SimulasiLabel text="Harga Simulasi" />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link to={`/produk/${product.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0 hover:bg-slate-100 text-slate-600"
                title="Lihat Detail Produk"
                aria-label={`Lihat detail ${product.name}`}
              >
                <Eye size={15} />
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              className="p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
              onClick={handleAddToCart}
              title="Tambah ke Keranjang"
              aria-label={`Tambah ${product.name} ke keranjang`}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
