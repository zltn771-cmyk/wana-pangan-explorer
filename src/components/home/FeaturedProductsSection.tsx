import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, MapPin, Leaf, ShoppingCart, Sparkles } from 'lucide-react';
import { SimulasiLabel } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useState } from 'react';

const FEATURED_IDS = [
  'kopi-robusta-kepahiang',
  'gula-aren-cetak-bengkulu',
  'keripik-rebung-bengkulu',
  'kolang-kaling-segar-bengkulu',
];

const CAT_LABEL: Record<string, string> = {
  kopi: 'Kopi Robusta',
  'gula-aren': 'Gula Aren',
  rebung: 'Olahan Rebung',
  'kolang-kaling': 'Kolang-kaling',
};

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  kopi:           { bg: 'bg-amber-100', text: 'text-amber-800' },
  'gula-aren':    { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  rebung:         { bg: 'bg-lime-100', text: 'text-lime-800' },
  'kolang-kaling':{ bg: 'bg-teal-100', text: 'text-teal-800' },
};

function FeaturedCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    setTimeout(() => setAdding(false), 700);
    addToCart(product, 1);
    showToast(`"${product.name}" ditambahkan ke keranjang.`, 'success', 2500);
  };

  const cat = CAT_COLORS[product.category] || { bg: 'bg-slate-100', text: 'text-slate-700' };

  return (
    <div className="card-nature flex flex-col group">
      {/* Image */}
      <Link to={`/produk/${product.id}`} className="block relative h-48 overflow-hidden img-zoom shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/400x300/90c490/1a5c3a?text=Wana+Pangan';
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ${cat.bg} ${cat.text}`}>
            {CAT_LABEL[product.category] || product.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
          <span className="text-white text-xs font-semibold">Lihat Detail →</span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={10} className="text-forest/60 shrink-0" />
          <span className="text-[10px] font-semibold text-forest/70 truncate">{product.asalWilayah}</span>
        </div>

        <Link to={`/produk/${product.id}`}>
          <h3 className="font-extrabold text-[15px] text-slate-800 mb-2 leading-snug group-hover:text-forest transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-forest/6 text-[10px] font-medium text-forest border border-forest/10">
            <Leaf size={9} /> {product.bahanBaku}
          </span>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold text-forest stat-number">{formatRupiah(product.price)}</div>
            <SimulasiLabel text="Harga Simulasi" />
          </div>
          <button
            onClick={handleAdd}
            className={[
              'inline-flex items-center justify-center h-10 w-10 rounded-xl shadow-sm font-bold transition-all duration-300',
              adding
                ? 'bg-emerald-500 text-white scale-90'
                : 'bg-forest text-white hover:bg-forest-mid hover:scale-110 hover:shadow-lg hover:shadow-forest/30',
            ].join(' ')}
            title="Tambah ke Keranjang"
          >
            <ShoppingCart size={16} className={adding ? 'animate-bounce' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProductsSection() {
  const { products } = useProducts();
  const featuredItems = products.filter((p) => FEATURED_IDS.includes(p.id));
  const displayItems = featuredItems.length > 0 ? featuredItems : products.slice(0, 4);

  return (
    <section className="section-padding bg-beige-mid relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sage/40 to-transparent" />
      <div className="absolute inset-0 bg-nature-grid opacity-40" />

      <div className="container-base relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-4">
              <Sparkles size={12} />
              Katalog Pangan Unggulan
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest mb-3 leading-tight">
              Produk Pangan Lokal
              <br />
              <span className="gradient-text-green">Bernilai Tambah</span>
            </h2>
            <p className="text-slate-600 max-w-lg leading-relaxed text-sm md:text-base">
              Hilirisasi komoditas kebun hutan oleh kelompok tani dan potensi UMKM desa — meningkatkan pendapatan di luar musim panen.
            </p>
          </div>
          <Link
            to="/produk"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest text-white font-bold text-sm hover:bg-forest-mid transition-all shadow-lg shadow-forest/20 hover:shadow-forest/40 hover:scale-105 animate-fade-in"
          >
            Lihat Seluruh Katalog
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <FeaturedCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-3xl bg-white border border-sage/25 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-7 md:p-9">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest to-forest-mid flex items-center justify-center shadow-lg shadow-forest/25 shrink-0">
                <ShoppingBag size={26} className="text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-forest text-base mb-1">
                  Mendukung Petani Hutan & Potensi UMKM Lokal
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pangan lokal agroforestri membantu menjaga tutupan pohon hutan sekaligus mencukupi kebutuhan gizi keluarga desa.
                </p>
              </div>
            </div>
            <Link to="/produk" className="shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-forest text-white font-bold text-sm hover:bg-forest-mid shadow-md hover:shadow-lg transition-all">
                Buka Katalog Lengkap
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
