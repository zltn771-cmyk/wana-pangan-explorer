import React, { type HTMLAttributes, type ReactNode } from 'react';

type BadgeVariant =
  | 'default'
  | 'forest'
  | 'sage'
  | 'earth'
  | 'warning'
  | 'success'
  | 'error'
  | 'simulasi';

type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-gray-100 text-gray-700 border border-gray-200',
  forest:
    'bg-[#174B35]/10 text-[#174B35] border border-[#174B35]/20',
  sage:
    'bg-[#8FAF91]/20 text-[#174B35]',
  earth:
    'bg-[#8B6547]/10 text-[#8B6547] border border-[#8B6547]/20',
  warning:
    'bg-amber-100 text-amber-800 border border-amber-200',
  success:
    'bg-green-100 text-green-800 border border-green-200',
  error:
    'bg-red-100 text-red-700 border border-red-200',
  simulasi:
    'bg-amber-100 text-amber-800 border border-amber-300',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...rest
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1',
        'rounded-full font-medium',
        'whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
}
