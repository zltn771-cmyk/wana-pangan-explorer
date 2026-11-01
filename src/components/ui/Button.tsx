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
    'bg-[#174B35] text-white hover:bg-[#0D3024] active:bg-[#0D3024] disabled:bg-[#174B35]/50',
  secondary:
    'bg-[#F3EFE4] text-[#174B35] hover:bg-[#8FAF91]/20 active:bg-[#8FAF91]/30 disabled:bg-[#F3EFE4]/50',
  outline:
    'border-2 border-[#174B35] text-[#174B35] bg-transparent hover:bg-[#174B35] hover:text-white active:bg-[#0D3024] active:text-white disabled:border-[#174B35]/40 disabled:text-[#174B35]/40 disabled:hover:bg-transparent disabled:hover:text-[#174B35]/40',
  ghost:
    'text-[#174B35] bg-transparent hover:bg-[#174B35]/10 active:bg-[#174B35]/20 disabled:text-[#174B35]/40',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-600/50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
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
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
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
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-[12px] font-semibold',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[#174B35]/40',
          'select-none cursor-pointer',
          'disabled:cursor-not-allowed',
          // Variant
          variantClasses[variant],
          // Size (includes gap)
          sizeClasses[size],
          // Custom
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {/* Left icon or spinner */}
        {loading ? (
          <Spinner size={size} />
        ) : leftIcon ? (
          <span className={`shrink-0 ${iconSizeClasses[size]} flex items-center justify-center`}>
            {leftIcon}
          </span>
        ) : null}

        {/* Label */}
        {children && <span>{children}</span>}

        {/* Right icon (hidden during loading) */}
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
