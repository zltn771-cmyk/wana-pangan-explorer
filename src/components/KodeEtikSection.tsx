import type { ReactNode } from 'react';
import { kodeEtik } from '../data/constants';

interface EtikIconProps {
  index: number;
}

function EtikIcon({ index }: EtikIconProps): ReactNode {
  switch (index) {
    case 0:
      // 1. No-take: crossed-out hand/leaf
      return (
        <svg
          className="w-5 h-5 text-cream"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 4C10 4 6 8 6 13c0 0 3.5-.8 5.5-2.5s3.5-4.2 4.5-6.5"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 13l-2 2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17L17 3" />
        </svg>
      );
    case 1:
      // 2. Quota: group/people icon
      return (
        <svg
          className="w-5 h-5 text-cream"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <circle cx="7" cy="6" r="2.5" />
          <path
            strokeLinecap="round"
            d="M2.5 15.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5"
          />
          <circle cx="13.5" cy="7" r="2" />
          <path strokeLinecap="round" d="M13.5 11c1.8.3 3 1.8 3 3.5" />
        </svg>
      );
    case 2:
      // 3. Guide: person with compass
      return (
        <svg
          className="w-5 h-5 text-cream"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <circle cx="6" cy="5.5" r="2.5" />
          <path strokeLinecap="round" d="M2 15c0-2.2 1.8-4 4-4" />
          <circle cx="13.5" cy="12.5" r="4" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.5 13.5l1.5-2.5 1 2.5-2.5-1z"
          />
        </svg>
      );
    case 3:
      // 4. Rafflesia: eye icon (observation only)
      return (
        <svg
          className="w-5 h-5 text-cream"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 10s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5-8-5.5-8-5.5z"
          />
          <circle cx="10" cy="10" r="2.5" />
        </svg>
      );
    case 4:
      // 5. Trash: trash bag icon
      return (
        <svg
          className="w-5 h-5 text-cream"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h12M7.5 6V4a1 1 0 011-1h3a1 1 0 011 1v2M5.5 6l1 10.5a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5L14.5 6"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 9.5v5M11.5 9.5v5" />
        </svg>
      );
    case 5:
    default:
      // 6. Respect: handshake/heart icon
      return (
        <svg
          className="w-5 h-5 text-cream"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 16.5l-1.2-1.1C4.5 11.5 2 9.2 2 6.4 2 4.1 3.9 2.5 6.2 2.5c1.3 0 2.6.6 3.4 1.6.8-1 2.1-1.6 3.4-1.6 2.3 0 4.2 1.6 4.2 3.9 0 2.8-2.5 5.1-6.8 9l-1.2 1.1z"
          />
        </svg>
      );
  }
}

export default function KodeEtikSection() {
  return (
    <section id="etika" className="bg-forest relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Subtle texture / pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="font-serif text-cream text-3xl font-bold">
            Kode Etik Pengunjung
          </h2>
          <p className="text-cream/70 mt-2 text-base">
            Enam prinsip yang wajib dipatuhi setiap pengunjung kawasan Wana Pangan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kodeEtik.map((text, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-terracotta text-cream flex items-center justify-center font-bold text-base shadow-sm">
                  {index + 1}
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <EtikIcon index={index} />
                </div>
              </div>
              <p className="text-cream text-sm leading-relaxed mt-3">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
