import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#1a5c3a] to-[#1e6b42] text-white shadow-md shadow-[#1a5c3a]/20 hover:shadow-[#1a5c3a]/40 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-[#f7f3eb] text-[#1a5c3a] border border-[#90c490]/40 hover:bg-[#90c490]/15 hover:border-[#90c490]/60 active:scale-95 disabled:opacity-50',
  outline:
    'border-2 border-[#1a5c3a] text-[#1a5c3a] bg-transparent hover:bg-[#1a5c3a] hover:text-white active:scale-95 disabled:border-[#1a5c3a]/40 disabled:text-[#1a5c3a]/40 disabled:hover:bg-transparent disabled:cursor-not-allowed',
  ghost:
    'text-[#1a5c3a] bg-transparent hover:bg-[#1a5c3a]/8 active:bg-[#1a5c3a]/15 active:scale-95 disabled:text-[#1a5c3a]/40 disabled:cursor-not-allowed',
  danger:
    'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-xl',
  md: 'px-6 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-8 py-3.5 text-base gap-2.5 rounded-2xl',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

function Spinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={`animate-spin shrink-0 ${iconSizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          'inline-flex items-center justify-center',
          'font-semibold transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5c3a]/50 focus-visible:ring-offset-2',
          'select-none cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <Spinner size={size} />
        ) : leftIcon ? (
          <span className={`shrink-0 ${iconSizeClasses[size]} flex items-center justify-center`}>
            {leftIcon}
          </span>
        ) : null}

        {children && <span>{children}</span>}

        {!loading && rightIcon ? (
          <span className={`shrink-0 ${iconSizeClasses[size]} flex items-center justify-center`}>
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
