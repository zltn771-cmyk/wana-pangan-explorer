import { useState, useMemo } from 'react';
import { ShoppingBag, PackageCheck, Sparkles, Trees, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';
import { SectionHeader, EmptyState, Button, SimulasiBox } from '@/components/ui';
import { ProductCard, ProductFilter, OrderHistorySection, type ProductFilterState } from '@/components/produk';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';

export default function ProdukPage() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<'katalog' | 'pesanan'>('katalog');

  // Filter state
  const [filters, setFilters] = useState<ProductFilterState>({
    search: '',
    category: 'all',
    priceRange: 'all',
    sortBy: 'price-asc',
  });

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: 'all',
      sortBy: 'price-asc',
    });
  };

  // Filter & sorting logika
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // 1. Text Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchAsal = p.asalWilayah?.toLowerCase().includes(query);
        const matchBahan = p.bahanBaku?.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchAsal && !matchBahan && !matchDesc) return false;
      }

      // 2. Kategori
      if (filters.category !== 'all') {
        if (p.category !== filters.category) return false;
      }

      // 3. Rentang Harga
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-30' && p.price >= 30000) return false;
        if (filters.priceRange === '30-70' && (p.price < 30000 || p.price > 70000)) return false;
        if (filters.priceRange === 'above-70' && p.price <= 70000) return false;
      }

      return true;
    });

    // 4. Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [filters]);

  return (
    <div className="w-full bg-beige min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-deep text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1920&q=80"
            alt="Produk olahan pangan agroforestri desa hutan"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-forest/80" />
        </div>

        <div className="container-base relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-medium mb-4">
            <ShoppingBag size={14} className="text-amber-300" />
            <span>Marketplace Pangan Lokal Agroforestri</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Dari Potensi Lokal Menjadi Produk Bernilai
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Jelajahi produk pangan lokal yang tumbuh dari kekayaan agroforestri dan kreativitas masyarakat desa hutan.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-300/30 text-xs">
            <Sparkles size={12} />
            <span>Katalog simulasi: Menampilkan 8 ragam komoditas bernilai tambah</span>
          </div>
        </div>
      </section>

      {/* ── 2. Sticky Tab Bar ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-20 shadow-xs">
        <div className="container-base flex items-center gap-2 sm:gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('katalog')}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'katalog'
                ? 'border-forest text-forest'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag size={16} />
            <span>Katalog Produk Pangan ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pesanan')}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'pesanan'
                ? 'border-forest text-forest'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PackageCheck size={16} />
            <span>Riwayat Pesanan Saya</span>
            {orders.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-forest text-white text-[10px] flex items-center justify-center font-bold">
                {orders.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── 3. Main Body ── */}
      <div className="container-base py-10 md:py-16 space-y-12">
        {activeTab === 'katalog' ? (
          <>
            {/* Filter Section */}
            <ProductFilter
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
            />

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <EmptyState
                icon={<ShoppingBag size={32} className="text-forest" />}
                title="Produk Tidak Ditemukan"
                description="Tidak ada komoditas pangan yang sesuai dengan kriteria pencarian dan filter Anda saat ini."
                action={
                  <button
                    onClick={handleResetFilters}
                    className="mt-3 px-4 py-2 rounded-xl bg-forest text-white text-xs font-semibold"
                  >
                    Reset Filter
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}

            {/* Ecosystem Value Proposition Callout */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-10 shadow-xs space-y-6">
              <div className="max-w-3xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold uppercase tracking-wider">
                  <Trees size={13} />
                  Keterhubungan Ekosistem Wana Pangan
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                  Mengapa Hilirisasi Pangan Lokal Menentukan Kelestarian Hutan?
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Di wilayah dataran tinggi Bengkulu, petani kerap menghadapi fluktuasi harga kopi dunia.
                  Melalui pengolahan nira aren menjadi gula semut higienis, fermentasi rebung bambu,
                  dan panen kolang-kaling terpadu, masyarakat mendapatkan arus pendapatan alternatif.
                  Ketika kebun agroforestri produktif dan menguntungkan, dorongan untuk merambah kawasan hutan lindung dapat diredam secara mandiri.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800 mb-1">
                    Nilai Tambah Komoditas
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Mengubah bahan mentah menjadi produk terstandar kemasan vakum meningkatkan harga jual hingga 200%.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800 mb-1">
                    Pemberdayaan Perempuan Desa
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pengolahan rebung dan gula semut melibatkan kelompok wanita tani desa sebagai motor ekonomi keluarga.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800 mb-1">
                    Alokasi Lumbung & Konservasi
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Perputaran marketplace direncanakan menyisihkan alokasi transparan untuk cadangan pangan darurat desa.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <OrderHistorySection />
          </div>
        )}
      </div>
    </div>
  );
}
