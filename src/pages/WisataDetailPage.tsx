import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  Clock,
  Users,
  TreePine,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Share2,
} from 'lucide-react';
import { Button, Badge, SimulasiLabel, SimulasiBox } from '@/components/ui';
import { useDestinations } from '@/hooks/useDestinations';
import { BookingConfigurator, EthicsPanel } from '@/components/wisata';
import { formatRupiah } from '@/utils/format';
import { useToast } from '@/contexts/ToastContext';

export default function WisataDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { getDestination } = useDestinations();

  const destination = getDestination(id || '');

  // State galeri foto aktif
  const [activeImage, setActiveImage] = useState<string>(
    destination?.image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80'
  );

  // Jika destinasi tidak ditemukan
  if (!destination) {
    return (
      <div className="container-base py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Destinasi Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-md">
          Destinasi wisata kebun hutan dengan kode &quot;{id}&quot; tidak terdaftar dalam basis data simulasi Wana Pangan.
        </p>
        <Link to="/wisata">
          <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
            Kembali ke Katalog Wisata
          </Button>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan paket wisata berhasil disalin ke papan klip.', 'success');
    }
  };

  return (
    <div className="w-full bg-beige min-h-screen pb-20">
      {/* ── Breadcrumb & Top Bar ── */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="container-base flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('/wisata')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-forest font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Kembali ke Katalog Destinasi</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline">Wisata / {destination.name}</span>
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

      <div className="container-base py-8 md:py-12 space-y-10">
        {/* ── Header Title & Badges ── */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="forest" size="md">
              <MapPin size={13} className="inline mr-1" />
              Kabupaten {destination.kabupaten}, Provinsi Bengkulu
            </Badge>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              Desa Kandidat Pengembangan
            </span>
            <SimulasiLabel text="Paket Wisata Simulasi" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* ── Gallery Visual Showcase ── */}
        <div className="space-y-3">
          <div className="relative h-[340px] sm:h-[450px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={activeImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between">
              <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                Dokumentasi bentang agroforestri & aktivitas kebun desa
              </span>
              <SimulasiLabel text="Foto Representatif" />
            </div>
          </div>

          {/* Thumbnails row */}
          {destination.gallery && destination.gallery.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[destination.image, ...destination.gallery].map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative h-20 w-28 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img
                      ? 'border-forest scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Main Content Grid: Left Details & Right Booking Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Profil, Potensi, Aktivitas, Highlights */}
          <div className="lg:col-span-7 space-y-8">
            {/* Profil & Narasi Agroforestri */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-forest flex items-center gap-2">
                <TreePine size={22} />
                <span>Profil & Lanskap Agroforestri Desa</span>
              </h2>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                {destination.longDescription}
              </p>

              {/* Simulation Note Box */}
              <SimulasiBox>
                <p className="text-xs leading-relaxed">
                  <strong>Catatan Potensi Ecopreneurship:</strong> Destinasi ini dikembangkan berdasarkan
                  kajian esai ketahanan pangan dataran tinggi Bengkulu. Program paket wisata kebun hutan
                  berfokus pada interaksi edukatif tanpa mengganggu ritme kehidupan alami petani desa.
                </p>
              </SimulasiBox>
            </div>

            {/* Aktivitas Wisata Kebun Hutan */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-semibold text-earth uppercase tracking-wider">
                  Pengalaman Edukasi
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Rangkaian Aktivitas Wisata Kebun
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Aktivitas dapat dipilih dan disesuaikan melalui formulir konfigurator di samping.
                </p>
              </div>

              <div className="space-y-4">
                {destination.activities.map((act, index) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-xl bg-forest text-white font-bold text-xs flex items-center justify-center shrink-0">
                      0{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-800">{act.name}</h4>
                        <span className="text-[11px] font-semibold text-forest flex items-center gap-1 shrink-0">
                          <Clock size={12} /> {act.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fasilitas & Highlights */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Fasilitas Termasuk dalam Paket</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 size={16} className="text-forest shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kode Etik Panel */}
            <EthicsPanel />
          </div>

          {/* RIGHT COLUMN: Booking Configurator Form */}
          <div className="lg:col-span-5 sticky top-[90px]">
            <BookingConfigurator destination={destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
