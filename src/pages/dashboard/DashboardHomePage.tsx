import { Link } from 'react-router-dom';
import {
  Package,
  MapPin,
  Ticket,
  ShoppingBag,
  Leaf,
  Landmark,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Button, SimulasiLabel, SimulasiBox } from '@/components/ui';
import { useProducts } from '@/hooks/useProducts';
import { useDestinations } from '@/hooks/useDestinations';
import { useBookings } from '@/hooks/useBookings';
import { useOrders } from '@/hooks/useOrders';
import { useContributions } from '@/hooks/useContributions';
import { useLumbung } from '@/hooks/useLumbung';
import { monthlyChartData } from '@/data/lumbung';
import { formatRupiah, formatCompact, formatDate, formatDateTime } from '@/utils/format';

export default function DashboardHomePage() {
  const { products } = useProducts();
  const { destinations } = useDestinations();
  const { bookings } = useBookings();
  const { orders } = useOrders();
  const { totalSimulatedContributions, contributions } = useContributions();
  const { totalSaldoKas, saldoCadanganPangan, saldoKonservasi, transactions } = useLumbung();

  // Ringkasan data aktivitas terbaru
  const recentOrders = orders.slice(0, 4);
  const recentBookings = bookings.slice(0, 4);
  const recentTx = transactions.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* ── 1. Header Banner & Quick Actions ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-earth uppercase tracking-wider">
            Portal Administrasi Terpadu
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1">
            Ringkasan Ekosistem Wana Pangan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau perputaran produk UMKM, reservasi wisata kebun, dan akuntabilitas dana cadangan desa.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/dashboard/produk?action=new">
            <Button variant="outline" size="sm" className="text-xs font-semibold" leftIcon={<PlusCircle size={14} />}>
              Tambah Produk
            </Button>
          </Link>
          <Link to="/dashboard/destinasi?action=new">
            <Button variant="outline" size="sm" className="text-xs font-semibold" leftIcon={<PlusCircle size={14} />}>
              Tambah Destinasi
            </Button>
          </Link>
          <Link to="/dashboard/lumbung">
            <Button variant="primary" size="sm" className="text-xs font-bold" leftIcon={<Landmark size={14} />}>
              Catat Kas Lumbung
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 2. Primary 6 Metric Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Produk */}
        <Link to="/dashboard/produk" className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-forest/40 transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">Produk</span>
            <Package size={16} className="text-forest" />
          </div>
          <p className="text-2xl font-black text-slate-800">{products.length}</p>
          <span className="text-[10px] text-slate-400 mt-1">Katalog Aktif</span>
        </Link>

        {/* 2. Destinasi */}
        <Link to="/dashboard/destinasi" className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-forest/40 transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">Destinasi</span>
            <MapPin size={16} className="text-forest" />
          </div>
          <p className="text-2xl font-black text-slate-800">{destinations.length}</p>
          <span className="text-[10px] text-slate-400 mt-1">Desa Kandidat</span>
        </Link>

        {/* 3. Booking Wisata */}
        <Link to="/dashboard/booking" className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-forest/40 transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">Booking</span>
            <Ticket size={16} className="text-forest" />
          </div>
          <p className="text-2xl font-black text-slate-800">{bookings.length}</p>
          <span className="text-[10px] text-amber-600 font-medium mt-1">
            {bookings.filter((b) => b.status === 'menunggu').length} Menunggu
          </span>
        </Link>

        {/* 4. Pesanan Produk */}
        <Link to="/dashboard/pesanan" className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-forest/40 transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">Pesanan</span>
            <ShoppingBag size={16} className="text-forest" />
          </div>
          <p className="text-2xl font-black text-slate-800">{orders.length}</p>
          <span className="text-[10px] text-amber-600 font-medium mt-1">
            {orders.filter((o) => o.status === 'baru').length} Baru
          </span>
        </Link>

        {/* 5. Kontribusi Konservasi */}
        <Link to="/dashboard/konservasi" className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:border-forest transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-[11px] font-semibold uppercase">Konservasi</span>
            <Leaf size={16} className="text-forest" />
          </div>
          <p className="text-xl font-black text-forest truncate">{formatCompact(totalSimulatedContributions)}</p>
          <span className="text-[10px] text-emerald-800/80 mt-1">Dana Terpisah</span>
        </Link>

        {/* 6. Saldo Kas Lumbung */}
        <Link to="/dashboard/lumbung" className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-900 mb-2">
            <span className="text-[11px] font-semibold uppercase">Lumbung Wana</span>
            <Landmark size={16} className="text-amber-800" />
          </div>
          <p className="text-xl font-black text-amber-950 truncate">{formatCompact(totalSaldoKas)}</p>
          <span className="text-[10px] text-amber-800/80 mt-1">Cadangan Pangan</span>
        </Link>
      </div>

      {/* ── 3. Chart Analytics Row ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-800">
              Perkembangan Dana & Alokasi Sirkular Bulanan
            </h3>
            <p className="text-xs text-slate-400">
              Perbandingan pendapatan ekowisata, produk pangan, alokasi lumbung, dan konservasi
            </p>
          </div>
          <SimulasiLabel text="Grafik Analitik Simulasi" />
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaWisata" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#174B35" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#174B35" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="areaPangan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B6547" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B6547" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tickFormatter={(v) => formatCompact(v)} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                formatter={(val: any) => [formatRupiah(Number(val) || 0), '']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="wisata" name="Wisata Kebun Hutan" stroke="#174B35" fill="url(#areaWisata)" />
              <Area type="monotone" dataKey="produk" name="Produk Pangan Lokal" stroke="#8FAF91" fillOpacity={0.3} fill="#8FAF91" />
              <Area type="monotone" dataKey="pangan" name="Alokasi Lumbung Wana" stroke="#8B6547" fill="url(#areaPangan)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── 4. Two-Column Recent Activity Tables ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pesanan Marketplace Terbaru */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <ShoppingBag size={16} className="text-forest" />
              <span>Pesanan Marketplace Terbaru</span>
            </h4>
            <Link to="/dashboard/pesanan" className="text-xs font-semibold text-forest hover:underline">
              Semua Pesanan
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Belum ada pesanan belanja.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{ord.customer.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {ord.id} • {ord.items.length} item • {formatRupiah(ord.total)}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ord.status === 'baru' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reservasi Wisata Terbaru */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Ticket size={16} className="text-forest" />
              <span>Reservasi Wisata Terbaru</span>
            </h4>
            <Link to="/dashboard/booking" className="text-xs font-semibold text-forest hover:underline">
              Semua Booking
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Belum ada reservasi wisata.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentBookings.map((bkg) => (
                <div key={bkg.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{bkg.customer.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {bkg.destinationName} • {bkg.participants} org • {formatDate(bkg.date)}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    bkg.status === 'menunggu' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {bkg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
