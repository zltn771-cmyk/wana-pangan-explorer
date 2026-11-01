import {
  HeroSection,
  EcosystemSection,
  VillageCandidatesSection,
  FeaturedProductsSection,
  HowItWorksSection,
  LumbungPreviewSection,
  CallToActionSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Mengenal Wana Pangan (4 Pilar Ekosistem) */}
      <EcosystemSection />

      {/* 3. Jelajahi Potensi Desa Kandidat */}
      <VillageCandidatesSection />

      {/* 4. Produk Pangan Unggulan (Katalog Preview) */}
      <FeaturedProductsSection />

      {/* 5. Bagaimana Wana Pangan Bekerja (Alur Sirkular) */}
      <HowItWorksSection />

      {/* 6. Lumbung Wana (Transparansi Cadangan Pangan) */}
      <LumbungPreviewSection />

      {/* 7. Ajakan Berpartisipasi (CTA Banner) */}
      <CallToActionSection />
    </div>
  );
}
