export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-forest-dark to-forest overflow-hidden px-4 sm:px-6 lg:px-8 text-center"
    >
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pt-12 pb-32 md:pb-40">
        <h1 className="text-5xl md:text-7xl font-serif text-cream font-bold tracking-tight mb-6">
          Wana Pangan
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Ketahanan pangan dataran tinggi Bengkulu masih menghadapi tantangan serius — model ecopreneurship desa hutan hadir sebagai hipotesis solusi.
        </p>
        <a
          href="#masalah"
          className="inline-flex items-center justify-center bg-terracotta hover:bg-terracotta/80 rounded text-cream px-8 py-3 font-medium transition duration-200 shadow-md hover:shadow-lg scroll-smooth"
        >
          Lihat Data
        </a>
      </div>

      {/* Decorative SVG Mountain & Tree Canopy Silhouette at Bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-40 sm:h-52 md:h-64 lg:h-72 block"
        >
          {/* Layer 1: Distant Mountain Silhouette */}
          <path
            d="M0,190 L120,150 L280,200 L440,130 L620,180 L780,110 L940,165 L1120,125 L1280,175 L1440,140 L1440,320 L0,320 Z"
            fill="#183618"
            opacity="0.5"
          />

          {/* Layer 2: Mid-range Peaks and Ridges */}
          <path
            d="M0,225 L160,170 L340,215 L520,155 L700,205 L860,145 L1040,195 L1220,160 L1380,200 L1440,185 L1440,320 L0,320 Z"
            fill="#1B3D1B"
            opacity="0.75"
          />

          {/* Layer 3: Rolling Rainforest Tree Canopy Ridge */}
          <path
            d="M0,240 
               C30,225 60,225 90,235 
               C120,218 160,218 190,232 
               C220,215 260,215 295,230 
               C330,210 370,210 405,228 
               C440,205 485,205 520,225 
               C555,200 600,200 635,222 
               C670,198 715,198 750,220 
               C785,195 830,195 865,218 
               C900,202 940,202 975,224 
               C1010,208 1050,208 1085,226 
               C1120,212 1160,212 1195,230 
               C1230,218 1270,218 1305,234 
               C1340,220 1385,220 1440,238 
               L1440,320 L0,320 Z"
            fill="#163416"
            opacity="0.9"
          />

          {/* Layer 4: Foreground Dense Forest Canopy Base */}
          <path
            d="M0,265 
               C40,252 75,252 115,262 
               C150,248 195,248 235,260 
               C270,245 315,245 355,258 
               C395,242 440,242 480,256 
               C520,240 565,240 605,254 
               C645,238 690,238 730,252 
               C770,236 815,236 855,252 
               C895,238 940,238 980,254 
               C1020,242 1065,242 1105,256 
               C1145,246 1190,246 1230,258 
               C1270,248 1315,248 1355,262 
               C1395,252 1425,254 1440,260 
               L1440,320 L0,320 Z"
            fill="#122A12"
          />
        </svg>
      </div>
    </section>
  );
}
