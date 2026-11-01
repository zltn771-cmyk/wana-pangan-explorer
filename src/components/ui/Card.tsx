import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'forest' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  children?: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-white rounded-[16px] shadow-sm',
  elevated:
    'bg-white rounded-[16px] shadow-lg',
  forest:
    'bg-[#174B35] text-white rounded-[16px]',
  outline:
    'bg-transparent border-2 border-[#8FAF91]/40 rounded-[16px]',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const hoverClass =
  'transition-all duration-200 hover:shadow-xl hover:scale-[1.015] cursor-pointer';

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
