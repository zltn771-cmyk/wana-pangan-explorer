import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  Trees,
  ShieldCheck,
  Package,
  Share2,
} from 'lucide-react';
import { Button, SimulasiLabel, SimulasiBox, Badge } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import { PRODUCT_CATEGORIES } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { ProductCard } from '@/components/produk';

export default function ProdukDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { products, getProduct } = useProducts();

  const product = getProduct(id || '');
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="container-base py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-md">
          Produk pangan lokal dengan ID &quot;{id}&quot; tidak ditemukan dalam katalog simulasi Wana Pangan.
        </p>
        <Link to="/produk">
          <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
            Kembali ke Katalog Produk
          </Button>
        </Link>
      </div>
    );
  }

  // Produk terkait
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    } else {
      showToast(`Batas maksimal stok simulasi adalah ${product.stock} unit.`, 'warning');
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity}× "${product.name}" berhasil dimasukkan ke keranjang belanja.`, 'success', 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan produk berhasil disalin ke papan klip.', 'success');
    }
  };

  return (
    <div className="w-full bg-beige min-h-screen pb-20">
      {/* ── Top Bar Breadcrumb ── */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="container-base flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('/produk')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-forest font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Kembali ke Katalog Produk</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline">
              Produk / {PRODUCT_CATEGORIES[product.category]} / {product.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 px-2.5 text-xs text-slate-600"
              leftIcon={<Share2 size={13} />}
            >
              Bagikan
            </Button>
          </div>
        </div>
      </div>

      <div className="container-base py-8 md:py-12 space-y-12">
        {/* ── Main Product Overview Card ── */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/600x600/8FAF91/174B35?text=Wana+Pangan';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-forest shadow-xs backdrop-blur-xs">
                    {PRODUCT_CATEGORIES[product.category]}
                  </span>
                </div>
              </div>

              {/* Simulation Pill */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl text-xs text-slate-500">
                <span>Foto Produk Representatif</span>
                <SimulasiLabel text="Produk Demonstrasi" />
              </div>
            </div>

            {/* Info & Purchase Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-forest font-bold">
                    <MapPin size={13} />
                    {product.asalWilayah}
                  </span>
                  <span>•</span>
                  <span className="text-slate-500 font-medium">{product.unit}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                  {product.name}
                </h1>

                <p className="text-xs text-slate-500 italic mb-4">
                  Identitas: {product.produsen}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
                  <span className="text-3xl font-black text-forest">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ {product.unit}</span>
                  <SimulasiLabel text="Harga Simulasi" />
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-slate-700 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Komponen Wajib Sesuai Standar WANA PANGAN: Bahan Baku & Bentuk Pengolahan */}
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200/70 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-forest block mb-0.5">Bahan Baku Utama:</span>
                  <p className="text-slate-700 leading-relaxed">{product.bahanBaku}</p>
                </div>
                <div className="pt-2 border-t border-emerald-100">
                  <span className="font-bold text-forest block mb-0.5">Bentuk Pengolahan & Nilai Tambah:</span>
                  <p className="text-slate-700 leading-relaxed">{product.bentukPengolahan}</p>
                </div>
              </div>

              {/* Metadata Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Ketersediaan</span>
                  <strong className="text-forest">{product.stock} unit (simulasi)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Satuan Kemasan</span>
                  <strong className="text-slate-700">{product.unit}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Asal Wilayah</span>
                  <strong className="text-slate-700">{product.asalWilayah}</strong>
                </div>
              </div>

              {/* Quantity Stepper & Action Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Jumlah Pembelian:
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                      aria-label="Kurang kuantitas"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-5 text-sm font-bold text-slate-800 min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock}
                      className="p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                      aria-label="Tambah kuantitas"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">
                    Subtotal:{' '}
                    <strong className="text-forest font-bold">
                      {formatRupiah(product.price * quantity)}
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 justify-center"
                    leftIcon={<ShoppingBag size={18} />}
                  >
                    Tambah ke Keranjang
                  </Button>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleBuyNow}
                    className="flex-1 justify-center shadow-md shadow-forest/20 font-bold"
                  >
                    Beli Sekarang ({formatRupiah(product.price * quantity)})
                  </Button>
                </div>
              </div>

              {/* Simulation Note Box */}
              <SimulasiBox>
                <p className="text-xs">
                  <strong>Pemberitahuan Marketplace:</strong> Data komoditas, bobot kemasan, harga, dan
                  stok pada halaman ini adalah simulasi arsitektur produk ecopreneurship desa hutan.
                </p>
              </SimulasiBox>
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-earth uppercase tracking-wider">
                  Kategori Serupa
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                  Produk {PRODUCT_CATEGORIES[product.category]} Lainnya
                </h3>
              </div>
              <Link to="/produk">
                <Button variant="ghost" size="sm" className="text-xs">
                  Lihat Semua
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
