import { useState } from 'react';
import { Leaf, PlusCircle, Edit2, Trash2, Target, HeartHandshake, Eye } from 'lucide-react';
import { Button, Input, Textarea, Modal, SimulasiLabel } from '@/components/ui';
import { usePrograms } from '@/hooks/usePrograms';
import { useContributions } from '@/hooks/useContributions';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah, formatDateTime } from '@/utils/format';
import type { ConservationProgram, ConservationCategory } from '@/types';
import { CONSERVATION_CATEGORIES } from '@/types';

export default function DashboardKonservasiPage() {
  const { programs, addProgram, updateProgram, deleteProgram } = usePrograms();
  const { contributions, totalSimulatedContributions } = useContributions();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'program' | 'kontribusi'>('program');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ConservationProgram | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ConservationCategory>('penanaman');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [progress, setProgress] = useState<number>(30);
  const [unit, setUnit] = useState('pohon');
  const [image, setImage] = useState('');
  const [activitiesStr, setActivitiesStr] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setName('');
    setCategory('penanaman');
    setDescription('');
    setTarget('300 bibit');
    setProgress(20);
    setUnit('bibit');
    setImage('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80');
    setActivitiesStr('Persiapan bibit di persemaian desa, Penanaman gotong royong warga, Pemantauan pertumbuhan berkala');
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ConservationProgram) => {
    setEditingProgram(p);
    setName(p.name);
    setCategory(p.category);
    setDescription(p.description);
    setTarget(p.target);
    setProgress(p.progress);
    setUnit(p.unit);
    setImage(p.image);
    setActivitiesStr(p.activities.join(', '));
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, pName: string) => {
    if (window.confirm(`Hapus program konservasi "${pName}"? Perubahan ini langsung terhapus dari halaman publik.`)) {
      deleteProgram(id);
      showToast(`Program "${pName}" berhasil dihapus.`, 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Nama program wajib diisi.';
    if (!description.trim()) errs.description = 'Deskripsi program wajib diisi.';
    if (!target.trim()) errs.target = 'Target capaian wajib diisi.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const acts = activitiesStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProgram) {
      updateProgram(editingProgram.id, {
        name: name.trim(),
        category,
        description: description.trim(),
        longDescription: description.trim(),
        target: target.trim(),
        progress,
        unit: unit.trim(),
        image: image.trim() || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
        activities: acts.length > 0 ? acts : ['Kegiatan konservasi gotong royong warga'],
      });
      showToast(`Program "${name}" berhasil diperbarui.`, 'success');
    } else {
      addProgram({
        name: name.trim(),
        category,
        description: description.trim(),
        longDescription: description.trim(),
        target: target.trim(),
        progress,
        unit: unit.trim(),
        image: image.trim() || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
        activities: acts.length > 0 ? acts : ['Penyiapan persemaian', 'Aksi penanaman', 'Pemantauan'],
      });
      showToast(`Program "${name}" berhasil ditambahkan!`, 'success');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Manajemen Jasa Lingkungan & Konservasi
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Program Perlindungan Ekosistem Desa ({programs.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola target penanaman pohon pangan, restorasi inang Rafflesia, dan patroli warga.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          className="text-xs font-bold shrink-0"
          leftIcon={<PlusCircle size={15} />}
        >
          Tambah Program Baru
        </Button>
      </div>

      {/* Tab Switcher: Program vs Kontribusi Masuk */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('program')}
          className={`py-2 px-4 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'program'
              ? 'bg-forest text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Leaf size={15} />
          <span>Daftar Program ({programs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('kontribusi')}
          className={`py-2 px-4 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'kontribusi'
              ? 'bg-forest text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HeartHandshake size={15} />
          <span>Kontribusi Masuk ({contributions.length})</span>
        </button>
      </div>

      {activeTab === 'program' ? (
        /* Program Table */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Program Konservasi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Target Capaian</th>
                  <th className="py-3 px-4">Progres Rencana</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt=""
                          className="w-12 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-800">{p.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{p.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {CONSERVATION_CATEGORIES[p.category] || p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {p.target}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>{p.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-forest rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-forest hover:bg-slate-100 transition-colors"
                          title="Edit Program"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Program"
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
      ) : (
        /* Kontribusi Table */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-sm text-slate-800">Riwayat Dukungan Dana Konservasi (Simulasi)</h4>
              <p className="text-xs text-slate-400">Total Terkumpul: <strong className="text-forest">{formatRupiah(totalSimulatedContributions)}</strong></p>
            </div>
            <SimulasiLabel text="Buku Dana Konservasi" />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Kontributor</th>
                  <th className="py-3 px-4">Program Tujuan</th>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {contributions.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 px-4 font-bold text-slate-800">{c.contributor}</td>
                    <td className="py-3 px-4 text-slate-700">{c.programName}</td>
                    <td className="py-3 px-4 text-slate-400">{formatDateTime(c.createdAt)}</td>
                    <td className="py-3 px-4 text-right font-black text-forest">{formatRupiah(c.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProgram ? 'Edit Program Konservasi' : 'Tambah Program Konservasi Baru'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Program *"
              placeholder="Contoh: Restorasi Tanaman Inang Rafflesia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Konservasi *:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ConservationCategory)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-forest"
              >
                {Object.entries(CONSERVATION_CATEGORIES).map(([k, lbl]) => (
                  <option key={k} value={k}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Target Capaian Rencana *"
              placeholder="Contoh: 500 pohon / 48 patroli"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              error={errors.target}
            />
            <Input
              label="Progres Percontohan (%)"
              type="number"
              min={0}
              max={100}
              value={progress.toString()}
              onChange={(e) => setProgress(parseInt(e.target.value, 10) || 0)}
            />
            <Input
              label="Satuan Indikator"
              placeholder="pohon / kali / titik"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          <Input
            label="URL Foto Dokumentasi"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Textarea
            label="Bentuk Kegiatan Lapangan (Pisahkan dengan koma)"
            placeholder="Persiapan persemaian, Penanaman gotong royong, Monitoring rutin..."
            rows={2}
            value={activitiesStr}
            onChange={(e) => setActivitiesStr(e.target.value)}
          />

          <Textarea
            label="Deskripsi & Latar Belakang Ekologis *"
            placeholder="Jelaskan peran program ini bagi kelestarian dataran tinggi Bengkulu..."
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
              {editingProgram ? 'Perbarui Program' : 'Simpan Program'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
