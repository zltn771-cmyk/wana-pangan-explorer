import type { Product, ProductCategory } from '@/types';

// Semua harga dan stok adalah DATA SIMULASI untuk demonstrasi prototipe WANA PANGAN
const SIMULASI = true as const;

// Unsplash image URLs representatif untuk komoditas lokal Bengkulu
const IMAGES = {
  kopiRobusta1: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80', // green/roasted beans
  kopiRobusta2: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', // ground coffee & beans
  gulaArenCetak: 'https://images.unsplash.com/photo-1571167366136-b57e37e6d2e5?w=800&q=80', // dark organic palm blocks
  gulaSemut: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800&q=80', // granulated brown sugar
  rebungAsam: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', // fresh organic shoots
  keripikRebung: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&q=80', // crispy chips/crackers
  kolangKalingSegar: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80', // translucent fresh palm fruit
  manisanKolangKaling: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', // sweetened candied dessert
};

export const products: Product[] = [
  // ── 1. KOMODITAS: KOPI ROBUSTA BENGKULU ───────────────────────
  {
    id: 'kopi-robusta-kepahiang',
    name: 'Kopi Robusta Kepahiang Petik Merah',
    category: 'kopi' as ProductCategory,
    asalWilayah: 'Kabupaten Kepahiang, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: '100% Biji Kopi Robusta Petik Merah Dataran Tinggi Kepahiang (Grade 1)',
    bentukPengolahan: 'Sortasi biji merah matang, penjemuran meja para-para higienis, sangrai medium-dark aroma cokelat-rempah',
    desa: 'Batu Ampar',
    kabupaten: 'Kepahiang',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Kopi robusta khas dataran tinggi Kepahiang dengan cita rasa pekat (bold body), aroma cokelat alami, dan aftertaste manis.',
    longDescription: 'Kopi Robusta Bengkulu dari kawasan dataran tinggi Kepahiang dipanen pada tingkat kematangan optimal (petik merah 100%). Dikelola di bawah naungan pohon hutan agroforestri tanpa pestisida kimia. Proses pascapanen natural di atas meja penjemuran para-para menghasilkan profil rasa pekat bercampur sentuhan rempah alami dataran tinggi Bukit Barisan.',
    price: 65000,
    stock: 35,
    unit: '250 gram (Kemasan Pouch Zipper)',
    image: IMAGES.kopiRobusta1,
    tags: ['robusta-bengkulu', 'petik-merah', 'kepahiang', 'agroforestri', 'single-origin'],
    isSimulasi: SIMULASI,
  },
  {
    id: 'kopi-robusta-rejang-lebong',
    name: 'Kopi Robusta Rejang Lebong Fine Robusta',
    category: 'kopi' as ProductCategory,
    asalWilayah: 'Kabupaten Rejang Lebong, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: 'Biji Kopi Robusta Pilihan Lereng Bukit Daun (Ketinggian 800–1.100 mdpl)',
    bentukPengolahan: 'Pascapanen honey process, penggilingan medium-fine higienis, kemasan foil berperekat degas valve',
    desa: 'Sumber Urip',
    kabupaten: 'Rejang Lebong',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Kopi robusta olahan honey process dari Rejang Lebong dengan body seimbang, keasaman lembut, dan aroma karamel gula aren.',
    longDescription: 'Fine Robusta Rejang Lebong membuktikan potensi kopi robusta Bengkulu yang diolah dengan standar spesialisasi. Proses honey mempertahankan lapisan mucilage manis pada biji selama pengeringan, menciptakan aroma karamel alami dan rasa manis yang bertahan lama (long sweet aftertaste). Cocok diseduh tubruk tradisional maupun manual brew.',
    price: 75000,
    stock: 28,
    unit: '200 gram (Kemasan Valve Kraft)',
    image: IMAGES.kopiRobusta2,
    tags: ['fine-robusta', 'rejang-lebong', 'honey-process', 'aroma-karamel'],
    isSimulasi: SIMULASI,
  },

  // ── 2. KOMODITAS: GULA AREN ────────────────────────────────────
  {
    id: 'gula-aren-cetak-bengkulu',
    name: 'Gula Aren Cetak Tradisional Bengkulu',
    category: 'gula-aren' as ProductCategory,
    asalWilayah: 'Kabupaten Rejang Lebong, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: '100% Nira Aren Murni dari Tegakan Pohon Aren Hutan',
    bentukPengolahan: 'Penyadapan nira segar harian, pemasakan kuali besi kayu bakar ranting kering, cetak batok kelapa alami tanpa pengawet',
    desa: 'Belitar Seberang',
    kabupaten: 'Rejang Lebong',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Gula aren cetak padat alami beraroma wangi khas aren pegunungan, dibuat murni dari nira pohon aren tanpa campuran gula tebu.',
    longDescription: 'Pohon aren (Arenga pinnata) tumbuh subur sebagai tanaman konservasi penyangga lereng bukit di Rejang Lebong dan Kepahiang. Gula aren cetak ini diolah secara tradisional langsung setelah nira disadap di pagi hari untuk menjaga keaslian rasa dan mencegah fermentasi dini. Bebas pengawet sintetis dan pemutih, ideal sebagai bahan baku kuliner dan minuman sehat.',
    price: 45000,
    stock: 40,
    unit: '500 gram (Isi 2 Batok Alami)',
    image: IMAGES.gulaArenCetak,
    tags: ['gula-aren', 'nira-murni', 'cetak-tradisional', 'rejang-lebong', 'tanpa-pengawet'],
    isSimulasi: SIMULASI,
  },
  {
    id: 'gula-semut-aren-bengkulu',
    name: 'Gula Semut Aren Kristal Organik',
    category: 'gula-aren' as ProductCategory,
    asalWilayah: 'Kabupaten Kepahiang, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: 'Nira Aren Segar Pilihan Dataran Tinggi Kepahiang',
    bentukPengolahan: 'Pengentalan suhu terkontrol, kristalisasi cepat aduk mekanik kayu, pengayakan mesh 18-20, pengeringan higienis',
    desa: 'Ai Sempiang',
    kabupaten: 'Kepahiang',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Gula aren serbuk butiran kristal halus berindeks glikemik rendah, sangat praktis sebagai pemanis kopi robusta dan sajian harian.',
    longDescription: 'Inovasi nilai tambah komoditas aren Bengkulu berupa gula aren kristal butiran (palm sugar granule). Memiliki kadar air di bawah 2% sehingga memiliki masa simpan lebih lama dan mudah larut seketika. Menjadi pelengkap sempurna untuk menyeduh Kopi Robusta Bengkulu dengan perpaduan rasa manis legit bernuansa smoky khas hutan tropis.',
    price: 55000,
    stock: 32,
    unit: '300 gram (Kemasan Standing Pouch)',
    image: IMAGES.gulaSemut,
    tags: ['gula-semut', 'kristal-aren', 'organik', 'kepahiang', 'indeks-glikemik-rendah'],
    isSimulasi: SIMULASI,
  },

  // ── 3. KOMODITAS: REBUNG ───────────────────────────────────────
  {
    id: 'rebung-asam-tradisional',
    name: 'Rebung Asam Tradisional Bengkulu',
    category: 'rebung' as ProductCategory,
    asalWilayah: 'Kabupaten Rejang Lebong, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: 'Tunas Rebung Bambu Betung Hutan Agroforestri Segar',
    bentukPengolahan: 'Pengupasan tunas muda, perajangan tipis, fermentasi asam laktat alami air cucian beras 3-4 hari, pasteurisasi vakum',
    desa: 'Sumber Urip',
    kabupaten: 'Rejang Lebong',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Olahan pangan fermentasi rebung khas kuliner tradisional Bengkulu yang kaya serat, renyah, dan beraroma asam segar alami.',
    longDescription: 'Rebung asam adalah kekayaan gastronomi tradisional dataran tinggi Bengkulu. Rebung bambu betung yang tumbuh di sempadan sungai hutan agroforestri dipanen saat masih sangat muda, kemudian difermentasi secara alami. Fermentasi menghasilkan asam laktat probiotik yang memberi cita rasa asam segar khas gulai rebung asam ikan mas atau tumis pedas.',
    price: 25000,
    stock: 45,
    unit: '400 gram (Kemasan Vakum Kedap Udara)',
    image: IMAGES.rebungAsam,
    tags: ['rebung-asam', 'fermentasi-alami', 'kuliner-tradisional', 'rejang-lebong', 'pangan-lokal'],
    isSimulasi: SIMULASI,
  },
  {
    id: 'keripik-rebung-bengkulu',
    name: 'Keripik Rebung Gurih Rempah',
    category: 'rebung' as ProductCategory,
    asalWilayah: 'Kabupaten Kepahiang, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: 'Rebung Bambu Muda Segar & Bumbu Rempah Alami (Kemiri, Kunyit, Bawang)',
    bentukPengolahan: 'Pengirisan lembaran tipis, perebusan rempah gurih, penggorengan suhu rendah vacuum frying, penirisan minyak sentrifugal',
    desa: 'Batu Ampar',
    kabupaten: 'Kepahiang',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Inovasi camilan bernilai tambah dari rebung hutan Bengkulu yang renyah gurih, kaya serat pangan, tanpa pewarna sintetis.',
    longDescription: 'Mengubah rebung hasil hutan bukan kayu menjadi camilan bernilai ekonomi tinggi. Melalui teknik penggorengan hampa udara (vacuum frying), tekstur rebung menjadi renyah seperti keripik kentang namun dengan aroma rebung yang gurih lembut. Camilan sehat berprotein nabati dan tinggi serat yang cocok sebagai buah tangan khas wisata agroforestri.',
    price: 30000,
    stock: 50,
    unit: '150 gram (Kemasan Foil Metalik)',
    image: IMAGES.keripikRebung,
    tags: ['keripik-rebung', 'camilan-sehat', 'vacuum-frying', 'kepahiang', 'nilai-tambah'],
    isSimulasi: SIMULASI,
  },

  // ── 4. KOMODITAS: KOLANG-KALING ───────────────────────────────
  {
    id: 'kolang-kaling-segar-bengkulu',
    name: 'Kolang-kaling Segar Buah Aren Alami',
    category: 'kolang-kaling' as ProductCategory,
    asalWilayah: 'Kabupaten Rejang Lebong, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: 'Buah Aren Pilihan dari Tegakan Pohon Aren Hutan Agroforestri',
    bentukPengolahan: 'Perebusan buah aren hutan, pemisahan biji higienis, pemipihan manual serat kenyal, perendaman air bersih mengalir',
    desa: 'Belitar Seberang',
    kabupaten: 'Rejang Lebong',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Kolang-kaling putih bersih alami tanpa bahan pemutih, bertekstur kenyal padat, kaya kolagen nabati dan serat pangan.',
    longDescription: 'Kolang-kaling dihasilkan dari buah pohon aren yang sama yang disadap niranya. Diolah oleh warga desa melalui perebusan bertahap dan pemipihan secara higienis. Bebas bahan kimia klorin atau pengawet berbahaya. Kolang-kaling segar ini siap diolah menjadi hidangan es campur, kolak, atau manisan sehat kaya kolagen untuk menjaga kesehatan sendi.',
    price: 20000,
    stock: 30,
    unit: '500 gram (Kemasan Pouch Higienis)',
    image: IMAGES.kolangKalingSegar,
    tags: ['kolang-kaling', 'buah-aren', 'tanpa-pemutih', 'rejang-lebong', 'serat-alami'],
    isSimulasi: SIMULASI,
  },
  {
    id: 'manisan-kolang-kaling-aren',
    name: 'Manisan Kolang-kaling Sirup Gula Aren',
    category: 'kolang-kaling' as ProductCategory,
    asalWilayah: 'Kabupaten Kepahiang, Provinsi Bengkulu',
    produsen: 'Potensi produk lokal Bengkulu (Ilustrasi pengembangan WANA PANGAN)',
    bahanBaku: 'Kolang-kaling Aren Segar & Sirup Kental Gula Aren Murni Asli Kepahiang',
    bentukPengolahan: 'Perendaman bertahap dalam karamel sirup gula aren dan daun pandan wangi hingga meresap ke dalam pori serat',
    desa: 'Ai Sempiang',
    kabupaten: 'Kepahiang',
    umkm: 'Potensi Produk Lokal Bengkulu',
    description: 'Hilirisasi terpadu dua produk pohon aren Bengkulu: kolang-kaling kenyal berpadu karamel legit gula aren murni.',
    longDescription: 'Sebuah contoh nyata hilirisasi agroforestri terintegrasi dalam model WANA PANGAN. Buah kolang-kaling dan nira gula aren dari lanskap hutan yang sama dipadukan menjadi manisan siap santap. Teksturnya kenyal nikmat dengan aroma wangi pandan dan manis gurih khas gula aren. Praktis disantap langsung atau dicampur dengan seduhan kopi dingin.',
    price: 35000,
    stock: 25,
    unit: '350 gram (Kemasan Jar Kedap Udara)',
    image: IMAGES.manisanKolangKaling,
    tags: ['manisan-kolang-kaling', 'sirup-aren', 'hilirisasi-pangan', 'kepahiang', 'siap-santap'],
    isSimulasi: SIMULASI,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  products.filter((p) => p.category === category);
