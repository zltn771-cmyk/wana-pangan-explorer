import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, PlusCircle, Search, Edit2, Trash2, Users, Clock, Trees } from 'lucide-react';
import { Button, Input, Textarea, Modal, SimulasiLabel } from '@/components/ui';
import { useDestinations } from '@/hooks/useDestinations';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah } from '@/utils/format';
import type { Destination } from '@/types';

export default function DashboardDestinasiPage() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useDestinations();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [desa, setDesa] = useState('');
  const [kabupaten, setKabupaten] = useState('Kepahiang');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('1 hari (6 jam)');
  const [capacityStr, setCapacityStr] = useState('15');
  const [priceStr, setPriceStr] = useState('150000');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match = d.name.toLowerCase().includes(q) || d.desa.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedKabupaten !== 'all' && d.kabupaten !== selectedKabupaten) {
        return false;
      }
      return true;
    });
  }, [destinations, search, selectedKabupaten]);

  const handleOpenAdd = () => {
    setEditingDest(null);
    setName('');
    setDesa('');
    setKabupaten('Kepahiang');
    setDescription('');
    setDuration('1 hari (6 jam)');
    setCapacityStr('15');
    setPriceStr('150000');
    setImage('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80');
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

  const handleOpenEdit = (d: Destination) => {
    setEditingDest(d);
    setName(d.name);
    setDesa(d.desa);
    setKabupaten(d.kabupaten);
    setDescription(d.description);
    setDuration(d.duration);
    setCapacityStr(d.capacity.toString());
    setPriceStr(d.price.toString());
    setImage(d.image);
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

  const handleDelete = (id: string, destName: string) => {
    if (window.confirm(`Hapus destinasi "${destName}"? Perubahan ini langsung terhapus dari katalog wisata publik.`)) {
      deleteDestination(id);
      showToast(`Destinasi "${destName}" berhasil dihapus.`, 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Nama destinasi wajib diisi.';
    if (!desa.trim()) errs.desa = 'Nama desa wajib diisi.';
    if (!description.trim()) errs.description = 'Deskripsi potensi wajib diisi.';
    const cap = parseInt(capacityStr, 10);
    if (!cap || cap <= 0) errs.capacity = 'Kapasitas harian harus > 0.';
    const prc = parseInt(priceStr.replace(/\D/g, ''), 10);
    if (!prc || prc <= 0) errs.price = 'Harga paket harus > Rp 0.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (editingDest) {
      updateDestination(editingDest.id, {
        name: name.trim(),
        desa: desa.trim(),
        kabupaten: kabupaten.trim(),
        description: description.trim(),
        longDescription: description.trim(),
        duration: duration.trim(),
        capacity: cap,
        price: prc,
        image: image.trim() || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
      });
      showToast(`Destinasi "${name}" berhasil diperbarui.`, 'success');
    } else {
      addDestination({
        name: name.trim(),
        desa: desa.trim(),
        kabupaten: kabupaten.trim(),
        description: description.trim(),
        longDescription: description.trim(),
        duration: duration.trim(),
        capacity: cap,
        price: prc,
        image: image.trim() || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
        gallery: [image.trim()],
        activities: [
          { id: 'act-1', name: 'Jelajah Agroforestri & Petik Kopi', description: 'Pengalaman kebun hutan bersama warga.', duration: '2 jam' },
          { id: 'act-2', name: 'Edukasi Pengolahan Komoditas', description: 'Belajar proses hilirisasi hasil panen.', duration: '1,5 jam' },
        ],
        highlights: ['Pemandu lokal', 'Sarapan masakan desa', 'Cenderamata bibit pohon'],
        guideAvailable: true,
      });
      showToast(`Destinasi "${name}" berhasil ditambahkan ke katalog wisata!`, 'success');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Manajemen Wisata Kebun Hutan
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Daftar Destinasi Desa Kandidat ({destinations.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola potensi paket wisata agroforestri dan kuota harian daya dukung lingkungan.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          className="text-xs font-bold shrink-0"
          leftIcon={<PlusCircle size={15} />}
        >
          Tambah Destinasi Baru
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama destinasi atau desa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <select
          value={selectedKabupaten}
          onChange={(e) => setSelectedKabupaten(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:border-forest w-full sm:w-auto"
        >
          <option value="all">Semua Kabupaten</option>
          <option value="Kepahiang">Kabupaten Kepahiang</option>
          <option value="Rejang Lebong">Kabupaten Rejang Lebong</option>
        </select>
      </div>

      {/* Destinasi Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Destinasi</th>
                <th className="py-3 px-4">Wilayah</th>
                <th className="py-3 px-4">Durasi & Kuota</th>
                <th className="py-3 px-4">Harga Paket</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDestinations.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={d.image}
                        alt=""
                        className="w-12 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-800">{d.name}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{d.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">Desa {d.desa}</span>
                    <div className="text-[11px] text-slate-400">Kab. {d.kabupaten}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800">{d.duration}</div>
                    <div className="text-[11px] text-forest font-semibold">{d.capacity} orang/hari</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-forest">
                    {formatRupiah(d.price)}
                    <span className="text-[10px] text-slate-400 font-normal"> /org</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-forest hover:bg-slate-100 transition-colors"
                        title="Edit Destinasi"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id, d.name)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Destinasi"
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

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDest ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Wisata Baru'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Destinasi *"
              placeholder="Contoh: Desa Wisata Batu Ampar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              label="Nama Desa *"
              placeholder="Contoh: Batu Ampar"
              value={desa}
              onChange={(e) => setDesa(e.target.value)}
              error={errors.desa}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kabupaten *:
              </label>
              <select
                value={kabupaten}
                onChange={(e) => setKabupaten(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
              >
                <option value="Kepahiang">Kabupaten Kepahiang</option>
                <option value="Rejang Lebong">Kabupaten Rejang Lebong</option>
              </select>
            </div>

            <Input
              label="Kapasitas Harian (Maks Orang) *"
              type="number"
              placeholder="15"
              value={capacityStr}
              onChange={(e) => setCapacityStr(e.target.value)}
              error={errors.capacity}
            />

            <Input
              label="Harga Paket Mulai (Rp) *"
              placeholder="150000"
              value={priceStr}
              onChange={(e) => setPriceStr(e.target.value.replace(/\D/g, ''))}
              error={errors.price}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Durasi Kunjungan *"
              placeholder="Contoh: 1 hari (7 jam)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Input
              label="URL Foto Utama Destinasi"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <Textarea
            label="Deskripsi Potensi & Lanskap Agroforestri *"
            placeholder="Jelaskan karakteristik kebun kopi, pohon naungan, dan aktivitas warga..."
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
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1 justify-center font-bold"
            >
              {editingDest ? 'Perbarui Destinasi' : 'Simpan Destinasi'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
