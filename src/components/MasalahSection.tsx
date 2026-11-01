import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type Plugin,
} from 'chart.js';
import { pouData, pouNasional, kemiskinan, wisata } from '../data/constants';
import { formatNumber } from '../utils/formatNumber';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Plugin kustom untuk garis vertikal rata-rata nasional (7,89%)
const nationalAvgLinePlugin: Plugin<'bar'> = {
  id: 'nationalAvgLine',
  afterDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales.x) return;

    const { top, bottom } = chartArea;
    const xPos = scales.x.getPixelForValue(pouNasional.value);

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#C75B39';
    ctx.moveTo(xPos, top);
    ctx.lineTo(xPos, bottom);
    ctx.stroke();

    // Label penjelas di atas garis rata-rata
    ctx.fillStyle = '#6F4E37';
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Rata-rata Nasional (${formatNumber(pouNasional.value)}%)`, xPos, top - 8);
    ctx.restore();
  },
};

export default function MasalahSection() {
  const chartData = {
    labels: pouData.map((item) => item.label),
    datasets: [
      {
        label: 'Prevalensi Ketidakcukupan Pangan (PoU)',
        data: pouData.map((item) => item.value),
        backgroundColor: pouData.map((item) =>
          item.value > pouNasional.value ? '#C75B39' : '#2D5F2D'
        ),
        borderColor: pouData.map((item) =>
          item.value > pouNasional.value ? '#B24E2E' : '#234C23'
        ),
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.75,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 26,
        right: 20,
        bottom: 8,
        left: 8,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 13,
        ticks: {
          callback: (value: string | number) => `${formatNumber(Number(value))}%`,
          color: '#6F4E37',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
        },
        grid: {
          color: 'rgba(111, 78, 55, 0.12)',
        },
        title: {
          display: true,
          text: 'Prevalensi Ketidakcukupan Pangan / PoU (%)',
          color: '#6F4E37',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      y: {
        ticks: {
          color: '#2C2C2C',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 500,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1B3D1B',
        titleColor: '#F5F0E8',
        bodyColor: '#F5F0E8',
        borderColor: '#A67B5B',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: (context: { raw: unknown }) =>
            ` PoU: ${formatNumber(Number(context.raw))}%`,
        },
      },
    },
  };

  return (
    <section id="masalah" className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul Bagian */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-forest-dark text-3xl md:text-4xl font-bold tracking-tight">
            Tantangan Ketahanan Pangan
          </h2>
          <p className="mt-3 text-text-dark/80 text-base md:text-lg">
            Gambaran prevalensi ketidakcukupan konsumsi pangan (PoU) serta kondisi
            sosial ekonomi masyarakat perdesaan di Provinsi Bengkulu.
          </p>
        </div>

        {/* Bagian A — Grafik Batang Horizontal PoU */}
        <div className="bg-white rounded-2xl shadow-sm border border-coffee/15 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-dark">
                Prevalensi Ketidakcukupan Pangan (PoU) 2025
              </h3>
              <p className="text-xs sm:text-sm text-text-dark/70">
                Perbandingan 10 kabupaten/kota di Bengkulu terhadap rata-rata nasional
              </p>
            </div>
            {/* Legenda visual warna */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-text-dark/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-xs bg-[#2D5F2D] inline-block" />
                Di bawah rata-rata nasional
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-xs bg-[#C75B39] inline-block" />
                Di atas rata-rata nasional
              </span>
            </div>
          </div>

          {/* Kontainer Grafik */}
          <div className="w-full h-[400px] md:h-[500px]">
            <Bar data={chartData} options={chartOptions} plugins={[nationalAvgLinePlugin]} />
          </div>

          {/* Label Sumber di Bawah Grafik */}
          <p className="text-xs text-gray-500 italic mt-3">
            Sumber: BPS via Databoks Katadata (Fadhlurrahman, 2026)
          </p>
        </div>

        {/* Bagian B — 3 Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Kartu 1: Tingkat Kemiskinan */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-forest/10 hover:shadow-lg transition-shadow">
            <div>
              <div className="text-3xl font-bold text-forest-dark">
                {formatNumber(kemiskinan.persentase.value)}%
              </div>
              <div className="text-lg font-medium text-text-dark mt-2">
                Tingkat Kemiskinan
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {kemiskinan.persentase.periode}
              </div>
            </div>
            <div className="text-xs italic text-gray-400 mt-6 pt-3 border-t border-gray-100">
              Sumber: {kemiskinan.persentase.source}
            </div>
          </div>

          {/* Kartu 2: Penduduk Miskin di Perdesaan */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-forest/10 hover:shadow-lg transition-shadow">
            <div>
              <div className="text-3xl font-bold text-forest-dark">
                {formatNumber(kemiskinan.miskinPerdesaan.value)} ribu
              </div>
              <div className="text-lg font-medium text-text-dark mt-2">
                Penduduk Miskin di Perdesaan
              </div>
              <div className="text-sm text-gray-500 mt-1">
                dari {formatNumber(kemiskinan.totalMiskin.value)} ribu jiwa total
              </div>
            </div>
            <div className="text-xs italic text-gray-400 mt-6 pt-3 border-t border-gray-100">
              Sumber: {kemiskinan.miskinPerdesaan.source}
            </div>
          </div>

          {/* Kartu 3: Lama Tinggal Wisatawan */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-forest/10 hover:shadow-lg transition-shadow">
            <div>
              <div className="text-3xl font-bold text-forest-dark">
                {formatNumber(wisata.lamaTinggal.value)} hari
              </div>
              <div className="text-lg font-medium text-text-dark mt-2">
                Lama Tinggal Wisatawan
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Rata-rata di Bengkulu
              </div>
            </div>
            <div className="text-xs italic text-gray-400 mt-6 pt-3 border-t border-gray-100">
              Sumber: {wisata.lamaTinggal.source}
            </div>
          </div>
        </div>

        {/* Bagian C — Catatan Kaki */}
        <div className="mt-8 p-4 rounded-lg bg-coffee/10 border border-coffee/20 text-coffee text-sm italic flex items-start gap-3">
          <span className="text-lg shrink-0 leading-tight" aria-hidden="true">
            ⚠️
          </span>
          <p>
            Data ketidakcukupan pangan hanya tersedia di tingkat kabupaten; hubungan sebab-akibat belum terbukti.
          </p>
        </div>
      </div>
    </section>
  );
}
