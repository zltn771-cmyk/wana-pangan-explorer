import React from 'react';

export interface SectionHeaderProps {
  /** Teks pill kecil di atas judul, misal: "Ekosistem" */
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** Gunakan warna terang untuk latar belakang gelap */
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={[
        'flex flex-col gap-3',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Tag pill */}
      {tag && (
        <span
          className={[
            'inline-flex items-center',
            'rounded-full px-3 py-1',
            'text-xs font-semibold tracking-wide uppercase',
            light
              ? 'bg-white/20 text-white border border-white/30'
              : 'bg-[#174B35]/10 text-[#174B35] border border-[#174B35]/20',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {tag}
        </span>
      )}

      {/* Title */}
      <h2
        className={[
          'text-3xl md:text-4xl font-bold leading-tight tracking-tight',
          light ? 'text-white' : 'text-[#174B35]',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={[
            'text-lg leading-relaxed',
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl',
            light ? 'text-white/80' : 'text-gray-600',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
