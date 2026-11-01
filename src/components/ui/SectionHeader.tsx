import React from 'react';

export interface SectionHeaderProps {
  tag?: string;
  tagIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  tagIcon,
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
            'inline-flex items-center gap-1.5',
            'rounded-full px-4 py-1.5',
            'text-[11px] font-bold tracking-widest uppercase',
            light
              ? 'bg-white/15 text-white border border-white/25'
              : 'bg-[#1a5c3a]/8 text-[#1a5c3a] border border-[#1a5c3a]/18',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {tagIcon}
          {tag}
        </span>
      )}

      {/* Title */}
      <h2
        className={[
          'text-3xl md:text-4xl font-bold leading-tight tracking-tight font-display',
          light ? 'text-white' : 'text-[#1a5c3a]',
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
            'text-base md:text-lg leading-relaxed',
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl',
            light ? 'text-white/75' : 'text-slate-600',
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
