import { useState } from 'react';
import { Calendar, Users, Clock, Check, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button, Input, Textarea, SimulasiLabel, SimulasiBox, Modal } from '@/components/ui';
import type { Destination, Booking } from '@/types';
import { formatRupiah, generateId } from '@/utils/format';
import { useBookings } from '@/hooks/useBookings';
import { useToast } from '@/contexts/ToastContext';

interface BookingConfiguratorProps {
  destination: Destination;
}

export function BookingConfigurator({ destination }: BookingConfiguratorProps) {
  const { addBooking } = useBookings();
  const { showToast } = useToast();

  // Tanggal default: besok
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  // State konfigurator
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    destination.activities.map((a) => a.id)
  );
  const [date, setDate] = useState(minDateStr);
  const [participants, setParticipants] = useState<number>(2);
  const [duration, setDuration] = useState<string>(destination.duration);

  // State data pemesan
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  // State validasi & modal
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Toggle aktivitas
  const handleToggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Perhitungan estimasi biaya otomatis (Simulasi)
  const basePricePerPerson = destination.price;
  const activityMultiplier = Math.max(0.6, selectedActivities.length / destination.activities.length);
  const estimatedCostPerPerson = Math.round((basePricePerPerson * activityMultiplier) / 5000) * 5000;
  const totalCost = estimatedCostPerPerson * participants;

  // Validasi form
  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Nama lengkap pemesan wajib diisi.';
    if (!phone.trim()) {
      errs.phone = 'Nomor WhatsApp wajib diisi untuk konfirmasi simulasi.';
    } else if (!/^[0-9+-\s]{8,15}$/.test(phone.trim())) {
      errs.phone = 'Format nomor WhatsApp tidak valid.';
    }
    if (!date) {
      errs.date = 'Tanggal kunjungan wajib ditentukan.';
    } else if (date < minDateStr) {
      errs.date = 'Tanggal kunjungan tidak boleh di masa lampau.';
    }
    if (participants < 1) {
      errs.participants = 'Jumlah peserta minimal 1 orang.';
    } else if (participants > destination.capacity) {
      errs.participants = `Melebihi kuota harian maksimal (${destination.capacity} orang).`;
    }
    if (selectedActivities.length === 0) {
      errs.activities = 'Pilih minimal 1 aktivitas wisata.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Handler
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) {
      showToast('Harap periksa kembali isian formulir pemesanan.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simpan ke LocalStorage via useBookings hook
      const activityNames = destination.activities
        .filter((a) => selectedActivities.includes(a.id))
        .map((a) => a.name);

      const newBooking = addBooking({
        destinationId: destination.id,
        destinationName: destination.name,
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          address: email.trim() ? `Email: ${email.trim()}` : 'Tidak dicantumkan',
          note: note.trim() || undefined,
        },
        date,
        participants,
        activities: activityNames,
        totalPrice: totalCost,
        status: 'menunggu',
      });

      setCreatedBooking(newBooking);
      showToast(`Pemesanan simulasi untuk ${destination.name} berhasil disimpan!`, 'success', 4000);
    } catch {
      showToast('Gagal menyimpan pemesanan ke penyimpanan lokal.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setNote('');
    setCreatedBooking(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-md">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Konfigurator & Reservasi
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">
            Susun Pengalaman Wisata Kebun
          </h3>
        </div>
        <SimulasiLabel text="Sistem Simulasi" />
      </div>

      <form onSubmit={handleSubmitBooking} className="space-y-6">
        {/* 1. Pilih Aktivitas */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            1. Pilih Aktivitas Pengalaman Wisata:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {destination.activities.map((act) => {
              const isSelected = selectedActivities.includes(act.id);
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => handleToggleActivity(act.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-forest bg-forest/5 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-forest text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${isSelected ? 'text-forest' : 'text-slate-800'}`}>
                      {act.name}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{act.description}</p>
                    <span className="inline-block mt-1 text-[10px] font-medium text-slate-400">
                      Estimasi durasi: {act.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.activities && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.activities}
            </p>
          )}
        </div>

        {/* 2. Jadwal & Peserta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar size={14} className="text-forest" />
              Tanggal Kunjungan:
            </label>
            <input
              type="date"
              min={minDateStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-forest/20 focus:border-forest outline-none"
            />
            {errors.date && <p className="text-[11px] text-red-600 mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Users size={14} className="text-forest" />
              Jumlah Peserta:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min={1}
                max={destination.capacity}
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-forest/20 focus:border-forest outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Kuota harian maks: {destination.capacity} orang
            </p>
            {errors.participants && (
              <p className="text-[11px] text-red-600 mt-1">{errors.participants}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock size={14} className="text-forest" />
              Pilihan Durasi:
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-forest/20 focus:border-forest outline-none bg-white"
            >
              <option value="Setengah Hari (4-5 Jam)">Setengah Hari (4–5 Jam)</option>
              <option value="1 Hari Penuh (6-7 Jam)">1 Hari Penuh (6–7 Jam)</option>
              <option value="2 Hari 1 Malam (Homestay)">2 Hari 1 Malam (Homestay Warga)</option>
            </select>
          </div>
        </div>

        {/* 3. Data Pemesan */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Informasi Kontak Pemesan:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Nama Lengkap *"
              placeholder="Contoh: Rian Pratama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              label="Nomor WhatsApp *"
              placeholder="Contoh: 0812-3456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
          </div>

          <Input
            label="Email (Opsional)"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Textarea
            label="Catatan Khusus / Preferensi Makanan Lokal"
            placeholder="Misal: rombongan keluarga, ada anak kecil, ingin fokus pengolahan gula aren..."
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* 4. Ringkasan Perhitungan Biaya Otomatis */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
            <span>Rincian Estimasi Biaya Paket ({participants} Peserta)</span>
            <SimulasiLabel text="Biaya Simulasi" />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <span>
              Paket Wisata ({selectedActivities.length} aktivitas terpilih) × {participants} orang:
            </span>
            <span className="font-semibold text-slate-800">
              {formatRupiah(estimatedCostPerPerson)} / orang
            </span>
          </div>

          <div className="flex items-center justify-between text-base font-bold text-forest pt-2 border-t border-amber-200/80">
            <span>Total Estimasi Biaya:</span>
            <span>{formatRupiah(totalCost)}</span>
          </div>
        </div>

        {/* Simulation Disclaimer */}
        <SimulasiBox>
          <p className="text-xs leading-relaxed">
            <strong>Peringatan Demonstrasi Prototipe:</strong> Pengiriman formulir ini akan menyimpan
            reservasi secara lokal di peramban Anda untuk simulasi alur pemesanan. Belum terhubung
            dengan pihak pengelola desa maupun transaksi pembayaran aktual.
          </p>
        </SimulasiBox>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center shadow-md shadow-forest/20 font-bold"
            loading={isSubmitting}
          >
            Ajukan Pemesanan Simulasi ({formatRupiah(totalCost)})
          </Button>
        </div>
      </form>

      {/* ── Modal Konfirmasi Sukses ── */}
      {createdBooking && (
        <Modal
          isOpen={!!createdBooking}
          onClose={handleResetForm}
          title="Reservasi Wisata Berhasil Dicatat (Simulasi)"
          size="md"
        >
          <div className="space-y-4">
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-forest rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Pemesanan Simulasi Berhasil!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Nomor Tiket Reservasi: <strong className="text-forest font-mono">{createdBooking.id}</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Destinasi:</span>
                <span className="font-bold text-slate-800">{createdBooking.destinationName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Pemesan:</span>
                <span className="font-semibold text-slate-800">{createdBooking.customer.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="font-semibold text-slate-800">{createdBooking.customer.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tanggal Kunjungan:</span>
                <span className="font-semibold text-slate-800">{createdBooking.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Peserta:</span>
                <span className="font-semibold text-slate-800">{createdBooking.participants} Orang</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Estimasi Total:</span>
                <span className="font-bold text-forest">{formatRupiah(createdBooking.totalPrice)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                  Menunggu Konfirmasi (Simulasi)
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed">
              Data ini telah tersimpan di <strong>LocalStorage</strong> browser Anda. Anda dapat melihat,
              memeriksa, atau membatalkan reservasi ini kapan saja pada bagian <strong>Riwayat Pemesanan Wisata</strong>.
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={handleResetForm}
              >
                Tutup & Selesai
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default BookingConfigurator;
