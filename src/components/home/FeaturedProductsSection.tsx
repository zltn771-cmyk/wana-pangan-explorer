import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, ArrowRight, Check } from 'lucide-react';
import { SectionHeader, Button, SimulasiLabel } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';

// Ambil 4 produk representatif dari 4 komoditas lokal utama Bengkulu
const FEATURED_IDS = [
  'kopi-robusta-kepahiang',
  'gula-aren-cetak-bengkulu',
  'keripik-rebung-bengkulu',
  'kolang-kaling-segar-bengkulu',
];

export function FeaturedProductsSection() {
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  const featuredItems = products.filter((p) => FEATURED_IDS.includes(p.id));
  const displayItems = featuredItems.length > 0 ? featuredItems : products.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    showToast(
      `"${product.name}" berhasil ditambahkan ke keranjang belanja.`,
      'success',
      3000
    );
  };

  return (
    <section className="section-padding bg-beige relative">
      <div className="container-base">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            tag="Katalog Pangan Unggulan"
            title="Produk Pangan Lokal Bernilai Tambah"
            subtitle="Hilirisasi komoditas kebun hutan oleh kelompok tani dan UMKM desa untuk meningkatkan pendapatan di luar panen kopi musiman."
          />
          <div className="shrink-0 flex items-center gap-3">
            <Link to="/produk">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight size={16} />}>
                Lihat Seluruh Katalog
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Category Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/400x300/8FAF91/174B35?text=Wana+Pangan';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-forest backdrop-blur-xs shadow-xs">
                    {product.category === 'kopi'
                      ? 'Kopi Robusta Bengkulu'
                      : product.category === 'gula-aren'
                      ? 'Gula Aren'
                      : product.category === 'rebung'
                      ? 'Olahan Rebung'
                      : 'Kolang-kaling'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-forest font-semibold">{product.asalWilayah}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-800 mb-2 leading-snug group-hover:text-forest transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-3 space-y-1">
                    <p className="line-clamp-1">
                      <span className="text-slate-400">Bahan:</span> {product.bahanBaku}
                    </p>
                    <p className="line-clamp-1">
                      <span className="text-slate-400">Nilai Tambah:</span> {product.bentukPengolahan}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-forest">
                        {formatRupiah(product.price)}
                      </span>
                    </div>
                    <div className="mt-0.5">
                      <SimulasiLabel text="Harga Simulasi" />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0 hover:bg-forest hover:text-white"
                    onClick={() => handleAddToCart(product)}
                    title="Tambah ke Keranjang"
                    aria-label={`Tambah ${product.name} ke keranjang`}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Prop Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h4 className="font-bold text-forest text-sm md:text-base">
                Mendukung Petani Hutan & UMKM Lokal
              </h4>
              <p className="text-xs md:text-sm text-slate-600">
                Pangan lokal yang dihasilkan dengan teknik agroforestri membantu menjaga tutupan pohon hutan sekaligus mencukupi kebutuhan gizi keluarga.
              </p>
            </div>
          </div>
          <Link to="/produk" className="shrink-0 w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              Buka Katalog Lengkap
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
