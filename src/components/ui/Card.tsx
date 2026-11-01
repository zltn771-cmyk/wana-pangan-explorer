import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'forest' | 'outline' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  children?: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-white rounded-[20px] border border-[#1a5c3a]/6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]',
  elevated:
    'bg-white rounded-[20px] border border-[#1a5c3a]/8 shadow-[0_12px_40px_-8px_rgba(26,92,58,0.15),0_4px_12px_rgba(0,0,0,0.06)]',
  forest:
    'bg-gradient-to-br from-[#1a5c3a] to-[#0e2e1c] text-white rounded-[20px] border border-white/8',
  outline:
    'bg-white/60 backdrop-blur-sm border-2 border-[#90c490]/35 rounded-[20px]',
  glass:
    'bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] text-white',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-7',
};

const hoverClass =
  'transition-all duration-300 hover:shadow-[0_16px_48px_-8px_rgba(26,92,58,0.2),0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          variantClasses[variant],
          paddingClasses[padding],
          hover ? hoverClass : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
