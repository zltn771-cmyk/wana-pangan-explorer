import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { monthlyChartData } from '@/data/lumbung';
import { formatCompact, formatRupiah } from '@/utils/format';
import type { FoodReserve } from '@/types';

interface LumbungChartsProps {
  foodReserves: FoodReserve[];
}

export function LumbungCharts({ foodReserves }: LumbungChartsProps) {
  // Format data komoditas pangan untuk BarChart
  const foodChartData = foodReserves.map((item) => ({
    name: item.komoditas,
    stok: item.quantity,
    unit: item.unit,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* 1. Monthly Financial Inflow/Outflow Trend */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-base text-slate-800">
              Tren Alokasi Perputaran Usaha Bulanan
            </h4>
            <p className="text-xs text-slate-400">
              Perkembangan pendapatan wisata, produk, dan alokasi cadangan (Simulasi)
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Juni — Oktober 2026
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWisata" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#174B35" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#174B35" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPangan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B6547" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B6547" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tickFormatter={(val) => formatCompact(val)} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: any) => [formatRupiah(Number(value) || 0), '']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="wisata" name="Pendapatan Wisata" stroke="#174B35" fillOpacity={1} fill="url(#colorWisata)" />
              <Area type="monotone" dataKey="pangan" name="Alokasi Lumbung" stroke="#8B6547" fillOpacity={1} fill="url(#colorPangan)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Physical Commodity Reserves Bar Chart */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-base text-slate-800">
              Kuantitas Fisik Cadangan Pangan
            </h4>
            <p className="text-xs text-slate-400">
              Stok komoditas darurat di gudang desa (kg / liter)
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={foodChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: any, _: any, props: any) => [
                  `${value} ${props.payload.unit}`,
                  'Stok Tersedia',
                ]}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="stok" name="Jumlah Stok Fisik" fill="#8FAF91" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default LumbungCharts;
