import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, PlusCircle, Search, Edit2, Trash2, Eye, MapPin, Sparkles } from 'lucide-react';
import { Button, Input, Textarea, Modal, SimulasiLabel, SimulasiBox } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah } from '@/utils/format';
import type { Product, ProductCategory } from '@/types';
import { PRODUCT_CATEGORIES } from '@/types';

export default function DashboardProdukPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields (Sesuai Standar Komoditas Lokal Bengkulu)
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('kopi');
  const [asalWilayah, setAsalWilayah] = useState('Kabupaten Kepahiang, Provinsi Bengkulu');
  const [bahanBaku, setBahanBaku] = useState('');
  const [bentukPengolahan, setBentukPengolahan] = useState('');
  const [produsen, setProdusen] = useState('Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)');
  const [description, setDescription] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [stockStr, setStockStr] = useState('25');
  const [unit, setUnit] = useState('250 gram');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.asalWilayah?.toLowerCase().includes(q) ||
          p.bahanBaku?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [products, search, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setCategory('kopi');
    setAsalWilayah('Kabupaten Kepahiang, Provinsi Bengkulu');
    setBahanBaku('100% Biji Kopi Robusta Petik Merah Dataran Tinggi');
    setBentukPengolahan('Sortasi biji merah, penjemuran para-para higienis, sangrai medium-dark');
    setProdusen('Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)');
    setDescription('');
    setPriceStr('65000');
    setStockStr('30');
    setUnit('250 gram');
    setImage('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80');
    setErrors({});
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenAdd();
      searchParams.delete('action');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setAsalWilayah(p.asalWilayah || 'Provinsi Bengkulu');
    setBahanBaku(p.bahanBaku || '');
    setBentukPengolahan(p.bentukPengolahan || '');
    setProdusen(p.produsen || 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)');
    setDescription(p.description);
    setPriceStr(p.price.toString());
    setStockStr(p.stock.toString());
    setUnit(p.unit);
    setImage(p.image);
    setErrors({});
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenAdd();
      searchParams.delete('action');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`Hapus produk "${prodName}" dari katalog? Perubahan ini langsung terhapus dari marketplace publik.`)) {
      deleteProduct(id);
      showToast(`Produk "${prodName}" berhasil dihapus.`, 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Nama produk wajib diisi.';
    if (!asalWilayah.trim()) errs.asalWilayah = 'Asal wilayah di Bengkulu wajib dicantumkan.';
    if (!bahanBaku.trim()) errs.bahanBaku = 'Bahan baku utama wajib diisi.';
    if (!bentukPengolahan.trim()) errs.bentukPengolahan = 'Bentuk pengolahan / nilai tambah wajib diisi.';
    if (!description.trim()) errs.description = 'Deskripsi produk wajib diisi.';
    const prc = parseInt(priceStr.replace(/\D/g, ''), 10);
    if (!prc || prc <= 0) errs.price = 'Harga harus lebih besar dari Rp 0.';
    const stk = parseInt(stockStr, 10);
    if (isNaN(stk) || stk < 0) errs.stock = 'Stok tidak boleh negatif.';
    if (!unit.trim()) errs.unit = 'Satuan kemasan wajib diisi.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: name.trim(),
        category,
        asalWilayah: asalWilayah.trim(),
        bahanBaku: bahanBaku.trim(),
        bentukPengolahan: bentukPengolahan.trim(),
        produsen: produsen.trim() || 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
        description: description.trim(),
        longDescription: description.trim(),
        price: prc,
        stock: stk,
        unit: unit.trim(),
        image: image.trim() || 'https://placehold.co/400x300/8FAF91/174B35?text=Wana+Pangan',
      });
      showToast(`Produk "${name}" berhasil diperbarui.`, 'success');
    } else {
      addProduct({
        name: name.trim(),
        category,
        asalWilayah: asalWilayah.trim(),
        bahanBaku: bahanBaku.trim(),
        bentukPengolahan: bentukPengolahan.trim(),
        produsen: produsen.trim() || 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
        description: description.trim(),
        longDescription: description.trim(),
        price: prc,
        stock: stk,
        unit: unit.trim(),
        image: image.trim() || 'https://placehold.co/400x300/8FAF91/174B35?text=Wana+Pangan',
        tags: [category, 'komoditas-bengkulu', 'agroforestri'],
      });
      showToast(`Produk "${name}" berhasil ditambahkan ke marketplace Bengkulu!`, 'success');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* ── Top Bar & Actions ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Manajemen Marketplace Komoditas Bengkulu
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Katalog Produk Pangan Lokal ({products.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Khusus mengelola 4 potensi unggulan agroforestri Bengkulu: Kopi Robusta, Gula Aren, Rebung, dan Kolang-kaling.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          className="text-xs font-bold shrink-0"
          leftIcon={<PlusCircle size={15} />}
        >
          Tambah Produk Bengkulu
        </Button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama produk, asal wilayah Bengkulu, atau bahan baku..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:border-forest w-full sm:w-auto"
        >
          <option value="all">Semua Komoditas Bengkulu</option>
          {Object.entries(PRODUCT_CATEGORIES).map(([k, lbl]) => (
            <option key={k} value={k}>
              {lbl}
            </option>
          ))}
        </select>
      </div>

      {/* ── Table Products ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Produk & Satuan</th>
                <th className="py-3 px-4">Komoditas</th>
                <th className="py-3 px-4">Asal Wilayah Bengkulu</th>
                <th className="py-3 px-4">Bahan Baku & Nilai Tambah</th>
                <th className="py-3 px-4">Harga Simulasi</th>
                <th className="py-3 px-4">Stok</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://placehold.co/60x60/8FAF91/174B35?text=WP';
                        }}
                      />
                      <div>
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <div className="text-[11px] text-slate-400">{p.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {PRODUCT_CATEGORIES[p.category] || p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-medium">{p.asalWilayah}</div>
                    <div className="text-[10px] text-slate-400 italic truncate max-w-[180px]">{p.produsen}</div>
                  </td>
                  <td className="py-3 px-4 max-w-[220px]">
                    <div className="font-medium text-slate-800 truncate" title={p.bahanBaku}>
                      {p.bahanBaku}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate" title={p.bentukPengolahan}>
                      {p.bentukPengolahan}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-forest">
                    {formatRupiah(p.price)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {p.stock} unit
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-forest hover:bg-slate-100 transition-colors"
                        title="Edit Produk"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal Form Tambah / Edit ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Data Produk Komoditas Bengkulu' : 'Tambah Produk Komoditas Bengkulu'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Produk *"
              placeholder="Contoh: Kopi Robusta Kepahiang Petik Merah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Komoditas Bengkulu *:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
              >
                {Object.entries(PRODUCT_CATEGORIES).map(([k, lbl]) => (
                  <option key={k} value={k}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Asal Wilayah di Bengkulu *"
              placeholder="Contoh: Kabupaten Kepahiang, Provinsi Bengkulu"
              value={asalWilayah}
              onChange={(e) => setAsalWilayah(e.target.value)}
              error={errors.asalWilayah}
            />
            <Input
              label="Identitas Produsen / Status *"
              placeholder="Contoh: Potensi produk lokal Bengkulu (Ilustrasi WANA PANGAN)"
              value={produsen}
              onChange={(e) => setProdusen(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Bahan Baku Utama *"
              placeholder="Contoh: 100% Biji Kopi Robusta Petik Merah"
              value={bahanBaku}
              onChange={(e) => setBahanBaku(e.target.value)}
              error={errors.bahanBaku}
            />
            <Input
              label="Bentuk Pengolahan & Nilai Tambah *"
              placeholder="Contoh: Pemetikan buah merah, penjemuran higienis, sangrai medium-dark"
              value={bentukPengolahan}
              onChange={(e) => setBentukPengolahan(e.target.value)}
              error={errors.bentukPengolahan}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Harga Simulasi (Rp) *"
              placeholder="Contoh: 65000"
              value={priceStr}
              onChange={(e) => setPriceStr(e.target.value.replace(/\D/g, ''))}
              error={errors.price}
            />
            <Input
              label="Stok Tersedia (Simulasi) *"
              type="number"
              placeholder="Contoh: 30"
              value={stockStr}
              onChange={(e) => setStockStr(e.target.value)}
              error={errors.stock}
            />
            <Input
              label="Satuan Kemasan *"
              placeholder="Contoh: 250 gram / 500 gram"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              error={errors.unit}
            />
          </div>

          <Input
            label="URL Foto Produk (Foto Komoditas Bengkulu)"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Textarea
            label="Deskripsi Produk & Potensi Agroforestri *"
            placeholder="Jelaskan proses pengolahan, keunikan komoditas dataran tinggi Bengkulu, dan rasa..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
          />

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="flex-1 justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md" className="flex-1 justify-center">
              {editingProduct ? 'Simpan Perubahan' : 'Terbitkan Produk'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
