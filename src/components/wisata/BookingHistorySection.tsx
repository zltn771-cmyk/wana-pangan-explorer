import { Calendar, Users, MapPin, XCircle, Clock, CheckCircle2, Ticket } from 'lucide-react';
import { Button, EmptyState, SimulasiLabel } from '@/components/ui';
import { useBookings } from '@/hooks/useBookings';
import { formatRupiah, formatDate } from '@/utils/format';
import { useToast } from '@/contexts/ToastContext';

export function BookingHistorySection() {
  const { bookings, cancelBooking } = useBookings();
  const { showToast } = useToast();

  const handleCancel = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin membatalkan pesanan simulasi (${name})?`)) {
      cancelBooking(id);
      showToast(`Pemesanan ${id} berhasil dibatalkan.`, 'info');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-forest uppercase tracking-wider">
            LocalStorage Persistence
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            Riwayat Reservasi Wisata Saya
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <SimulasiLabel text="Tersimpan di Browser" />
        </div>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          icon={<Ticket size={32} className="text-forest" />}
          title="Belum Ada Riwayat Pemesanan"
          description="Anda belum melakukan pemesanan simulasi paket wisata kebun hutan. Silakan pilih destinasi dan atur jadwal kunjungan Anda."
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isCancelled = booking.status === 'dibatalkan';
            return (
              <div
                key={booking.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCancelled
                    ? 'bg-slate-50 border-slate-200 opacity-75'
                    : 'bg-white border-slate-200/90 hover:border-forest/40 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {booking.id}
                    </span>
                    <h4 className="font-bold text-base text-slate-800">{booking.destinationName}</h4>
                  </div>
                  <div>
                    {isCancelled ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
                        Dibatalkan
                      </span>
                    ) : booking.status === 'dikonfirmasi' ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Dikonfirmasi (Simulasi)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                        Menunggu Konfirmasi (Simulasi)
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-forest shrink-0" />
                    <span>Jadwal: <strong>{formatDate(booking.date)}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-forest shrink-0" />
                    <span>Peserta: <strong>{booking.participants} Orang</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-forest shrink-0" />
                    <span>Pemesan: <strong>{booking.customer.name}</strong></span>
                  </div>
                </div>

                {/* Aktivitas list */}
                {booking.activities && booking.activities.length > 0 && (
                  <div className="pt-2 pb-3">
                    <p className="text-[11px] text-slate-400 font-semibold mb-1">
                      Aktivitas Terpilih:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {booking.activities.map((act, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer baris: total & tombol batalkan */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Estimasi Biaya:</span>
                    <span className="text-sm font-bold text-forest">
                      {formatRupiah(booking.totalPrice)}
                    </span>
                  </div>

                  {!isCancelled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(booking.id, booking.destinationName)}
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      leftIcon={<XCircle size={14} />}
                    >
                      Batalkan Reservasi
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingHistorySection;
