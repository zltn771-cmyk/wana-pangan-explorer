import type { ConservationProgram } from '@/types';

const SIMULASI = true as const;

export const conservationPrograms: ConservationProgram[] = [
  {
    id: 'penanaman-pohon-pangan',
    name: 'Penanaman Pohon Pangan',
    description: 'Program penanaman pohon pangan multi-manfaat di kawasan agroforestri desa.',
    longDescription: 'Program penanaman pohon pangan mencakup jenis-jenis pohon yang menghasilkan bahan pangan sekaligus menjaga fungsi ekologis hutan. Jenis prioritas: aren (Arenga pinnata), durian (Durio zibethinus), petai (Parkia speciosa), jengkol (Archidendron pauciflorum), dan berbagai tanaman buah hutan. Penanaman melibatkan seluruh anggota kelompok tani desa secara gotong royong.',
    target: '500 pohon',
    progress: 34,
    unit: 'pohon',
    category: 'penanaman',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    activities: [
      'Persiapan bibit di persemaian desa',
      'Penanaman gotong royong setiap bulan',
      'Pemeliharaan rutin 3 bulan pertama',
      'Monitoring pertumbuhan pohon',
    ],
    isSimulasi: SIMULASI,
  },
  {
    id: 'patroli-hutan-warga',
    name: 'Patroli Hutan oleh Warga',
    description: 'Patroli rutin kawasan hutan oleh tim warga terlatih untuk mencegah perambahan dan pembalakan liar.',
    longDescription: 'Tim patroli hutan terdiri dari pemuda desa yang telah mendapat pelatihan dari Kesatuan Pengelolaan Hutan (KPH) setempat. Patroli dilakukan dua kali seminggu mencakup batas kawasan hutan lindung dan hutan produksi yang berbatasan dengan lahan desa. Temuan patroli dicatat dan dilaporkan ke KPH secara berkala.',
    target: '48 kali patroli/tahun',
    progress: 52,
    unit: 'kali patroli',
    category: 'patroli',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    activities: [
      'Patroli rutin 2x seminggu',
      'Pencatatan dan pelaporan temuan',
      'Koordinasi dengan KPH setempat',
      'Pelatihan anggota patroli baru',
    ],
    isSimulasi: SIMULASI,
  },
  {
    id: 'pemulihan-inang-rafflesia',
    name: 'Pemulihan Inang Rafflesia',
    description: 'Program penanaman Tetrastigma sp. sebagai inang alami Rafflesia arnoldii di habitat aslinya.',
    longDescription: 'Rafflesia arnoldii merupakan bunga terbesar di dunia yang tumbuh sebagai parasit pada akar Tetrastigma sp. Program ini fokus pada perbanyakan dan penanaman Tetrastigma di lokasi-lokasi potensial habitat Rafflesia. Selain itu, program mencakup pemetaan sebaran Rafflesia dan edukasi masyarakat tentang pentingnya konservasi jenis ini. (Pergub Bengkulu No. 20/2022)',
    target: '200 batang Tetrastigma',
    progress: 28,
    unit: 'batang',
    category: 'rafflesia',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    activities: [
      'Pemetaan sebaran habitat Rafflesia',
      'Pembibitan Tetrastigma sp.',
      'Penanaman di lokasi potensial',
      'Monitoring perkembangan Rafflesia',
      'Edukasi masyarakat dan wisatawan',
    ],
    isSimulasi: SIMULASI,
  },
  {
    id: 'konservasi-sumber-air',
    name: 'Konservasi Sumber Air Desa',
    description: 'Perlindungan mata air dan daerah resapan air di kawasan hutan sekitar desa.',
    longDescription: 'Sumber air bersih merupakan kebutuhan vital masyarakat desa hutan. Program ini mencakup penanaman pohon di sekitar mata air dan daerah resapan, pembuatan sumur resapan komunal, dan penetapan kawasan perlindungan sumber air secara adat. Pohon yang ditanam diprioritaskan jenis pakan lebah hutan untuk mendukung program madu.',
    target: '5 titik sumber air',
    progress: 60,
    unit: 'titik',
    category: 'habitat',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    activities: [
      'Pemetaan dan identifikasi sumber air',
      'Penanaman pohon di zona penyangga',
      'Pembuatan aturan adat perlindungan sumber air',
      'Pemantauan debit air berkala',
    ],
    isSimulasi: SIMULASI,
  },
];

export const getProgramById = (id: string): ConservationProgram | undefined =>
  conservationPrograms.find(p => p.id === id);
