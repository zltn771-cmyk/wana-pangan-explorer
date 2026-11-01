import { useState, useMemo } from 'react';
import { Ticket, Search, CheckCircle2, Clock, XCircle, Eye, Trash2, Calendar, Users, Phone } from 'lucide-react';
import { Button, Modal, SimulasiLabel, EmptyState } from '@/components/ui';
import { useBookings } from '@/hooks/useBookings';
import { useToast } from '@/contexts/ToastContext';
import { formatRupiah, formatDate } from '@/utils/format';
import type { Booking, BookingStatus } from '@/types';

export default function DashboardBookingPage() {
  const { bookings, updateStatus, deleteBooking } = useBookings();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          b.id.toLowerCase().includes(q) ||
          b.customer.name.toLowerCase().includes(q) ||
          b.destinationName.toLowerCase().includes(q) ||
          b.customer.phone.includes(q);
        if (!match) return false;
      }
      if (statusFilter !== 'all' && b.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [bookings, search, statusFilter]);

  const handleChangeStatus = (id: string, newStatus: BookingStatus) => {
    updateStatus(id, newStatus);
    showToast(`Status booking ${id} diubah menjadi "${newStatus}".`, 'success');
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Hapus booking ${id} dari sistem?`)) {
      deleteBooking(id);
      showToast(`Booking ${id} berhasil dihapus.`, 'info');
      setSelectedBooking(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Reservasi Wisata Kebun Hutan
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Daftar Booking Wisata Masuk ({bookings.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau dan konfirmasi pemesanan tiket wisata edukasi agroforestri dari pengunjung.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari ID booking, nama pemesan, nomor HP, atau destinasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:border-forest w-full sm:w-auto"
        >
          <option value="all">Semua Status</option>
          <option value="menunggu">Menunggu Konfirmasi</option>
          <option value="dikonfirmasi">Dikonfirmasi</option>
          <option value="selesai">Selesai</option>
          <option value="dibatalkan">Dibatalkan</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredBookings.length === 0 ? (
          <EmptyState
            icon={<Ticket size={32} className="text-forest" />}
            title="Tidak Ada Data Booking"
            description="Belum ada reservasi wisata yang sesuai dengan filter pencarian."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">ID Booking</th>
                  <th className="py-3 px-4">Pemesan</th>
                  <th className="py-3 px-4">Destinasi</th>
                  <th className="py-3 px-4">Jadwal & Peserta</th>
                  <th className="py-3 px-4">Total Biaya</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {b.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">{b.customer.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Phone size={11} /> {b.customer.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {b.destinationName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{formatDate(b.date)}</div>
                      <div className="text-[11px] text-forest font-semibold">{b.participants} Orang</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-forest">
                      {formatRupiah(b.totalPrice)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'menunggu'
                          ? 'bg-amber-100 text-amber-900'
                          : b.status === 'dikonfirmasi'
                          ? 'bg-blue-100 text-blue-800'
                          : b.status === 'selesai'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-forest hover:bg-slate-100 transition-colors"
                          title="Lihat Detail & Ubah Status"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus"
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
        )}
      </div>

      {/* Modal Detail Booking */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Detail Reservasi: ${selectedBooking.id}`}
          size="md"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destinasi:</span>
                <strong className="text-slate-800">{selectedBooking.destinationName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pemesan:</span>
                <strong className="text-slate-800">{selectedBooking.customer.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor WhatsApp:</span>
                <strong className="text-slate-800">{selectedBooking.customer.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Kunjungan:</span>
                <strong className="text-slate-800">{selectedBooking.date}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jumlah Peserta:</span>
                <strong className="text-slate-800">{selectedBooking.participants} Orang</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Biaya:</span>
                <strong className="text-forest font-bold text-sm">{formatRupiah(selectedBooking.totalPrice)}</strong>
              </div>
              {selectedBooking.customer.note && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Catatan Khusus:</span>
                  <p className="italic text-slate-600">&quot;{selectedBooking.customer.note}&quot;</p>
                </div>
              )}
            </div>

            {/* Aktivitas yang dipilih */}
            {selectedBooking.activities && selectedBooking.activities.length > 0 && (
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Aktivitas yang Dipilih:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBooking.activities.map((act, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Status Changer */}
            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-800 block mb-2">Ubah Status Booking:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['menunggu', 'dikonfirmasi', 'selesai', 'dibatalkan'] as BookingStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleChangeStatus(selectedBooking.id, st)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-bold capitalize transition-all border ${
                      selectedBooking.status === st
                        ? 'bg-forest text-white border-forest shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                onClick={() => setSelectedBooking(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
