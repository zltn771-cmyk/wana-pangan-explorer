import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, MapPin, Leaf, Package } from 'lucide-react';
import { SimulasiLabel } from '@/components/ui';
import type { Product } from '@/types';
import { PRODUCT_CATEGORIES } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const CATEGORY_COLORS: Record<string, string> = {
  kopi:     'bg-amber-100 text-amber-800 border-amber-200',
  aren:     'bg-emerald-100 text-emerald-800 border-emerald-200',
  rebung:   'bg-lime-100 text-lime-800 border-lime-200',
  pangan:   'bg-green-100 text-green-800 border-green-200',
  olahan:   'bg-teal-100 text-teal-800 border-teal-200',
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    setAdding(true);
    setTimeout(() => setAdding(false), 800);
    addToCart(product, 1);
    showToast(`"${product.name}" ditambahkan ke keranjang.`, 'success', 2500);
  };

  const catColor = CATEGORY_COLORS[product.category] || 'bg-slate-100 text-slate-700 border-slate-200';
  const inStock = product.stock > 0;

  return (
    <div className="card-nature flex flex-col group cursor-pointer">
      {/* Image Area */}
      <Link to={`/produk/${product.id}`} className="block relative h-52 overflow-hidden bg-beige-mid img-zoom shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/400x300/90c490/1a5c3a?text=Wana+Pangan';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${catColor} shadow-sm backdrop-blur-xs`}>
            {PRODUCT_CATEGORIES[product.category] || product.category}
          </span>
          {inStock ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-500 text-white shadow-sm">
              <Package size={9} /> {product.stock}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white shadow-sm">
              Habis
            </span>
          )}
        </div>

        {/* Quick view on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-forest font-semibold text-xs shadow-lg">
            <Eye size={13} /> Lihat Detail
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Origin */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={11} className="text-forest/60 shrink-0" />
          <span className="text-[11px] font-semibold text-forest/75 truncate">{product.asalWilayah}</span>
          <span className="ml-auto text-[10px] text-slate-400 shrink-0">{product.unit}</span>
        </div>

        {/* Name */}
        <Link to={`/produk/${product.id}`}>
          <h3 className="font-bold text-[15px] text-slate-800 mb-2 leading-snug group-hover:text-forest transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-1">
          {product.description}
        </p>

        {/* Info chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-forest/6 text-[10px] font-medium text-forest border border-forest/10">
            <Leaf size={9} /> {product.bahanBaku}
          </span>
          {product.bentukPengolahan && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-amber-50 text-[10px] font-medium text-amber-800 border border-amber-200/60">
              {product.bentukPengolahan.length > 22
                ? product.bentukPengolahan.slice(0, 22) + '…'
                : product.bentukPengolahan}
            </span>
          )}
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div>
            <div className="text-lg font-extrabold text-forest leading-tight stat-number">
              {formatRupiah(product.price)}
            </div>
            <SimulasiLabel text="Harga Simulasi" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/produk/${product.id}`}
              className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 text-slate-500 hover:border-forest hover:text-forest hover:bg-forest/5 transition-all"
              title="Lihat Detail"
            >
              <Eye size={15} />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!inStock || adding}
              title={inStock ? 'Tambah ke Keranjang' : 'Stok Habis'}
              className={[
                'inline-flex items-center justify-center h-9 w-9 rounded-xl font-bold transition-all duration-300 shadow-sm',
                inStock
                  ? adding
                    ? 'bg-emerald-500 text-white scale-95'
                    : 'bg-forest text-white hover:bg-forest-mid hover:shadow-forest/30 hover:shadow-md hover:scale-105'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed',
              ].join(' ')}
            >
              <ShoppingCart size={15} className={adding ? 'animate-bounce' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
