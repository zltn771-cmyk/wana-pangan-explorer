import React, { type ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center text-center',
        'py-16 px-6 gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Ikon */}
      {icon && (
        <div
          className={[
            'flex items-center justify-center',
            'w-16 h-16 rounded-full',
            'bg-[#8FAF91]/20 text-[#174B35]',
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Teks */}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="text-lg font-semibold text-[#174B35]">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Aksi opsional */}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
