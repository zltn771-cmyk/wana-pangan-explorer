'use client';

import React, {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children?: ReactNode;
  /** Mencegah penutupan saat klik backdrop */
  disableBackdropClose?: boolean;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  disableBackdropClose = false,
  className = '',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  /* ---- Escape key handler ---- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  /* ---- Focus trap & body scroll lock ---- */
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Move focus into dialog
      setTimeout(() => {
        dialogRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      // Restore previous focus
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  /* ---- Backdrop click ---- */
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!disableBackdropClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={[
        // Backdrop
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/50 backdrop-blur-sm',
        // Fade in animation
        'animate-[fadeIn_0.2s_ease-out]',
      ].join(' ')}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Dialog panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={[
          'relative w-full bg-white rounded-[20px] shadow-2xl',
          'flex flex-col max-h-[90vh]',
          'outline-none',
          // Scale + fade in
          'animate-[modalIn_0.2s_ease-out]',
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
            <h2
              id="modal-title"
              className="text-xl font-bold text-[#174B35] leading-tight"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup modal"
              className={[
                'flex items-center justify-center w-8 h-8 rounded-full',
                'text-gray-500 hover:text-[#174B35]',
                'hover:bg-[#174B35]/10',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-[#174B35]/40',
              ].join(' ')}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Close button without title */}
        {!title && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className={[
              'absolute top-4 right-4 z-10',
              'flex items-center justify-center w-8 h-8 rounded-full',
              'text-gray-500 hover:text-[#174B35]',
              'hover:bg-[#174B35]/10',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#174B35]/40',
            ].join(' ')}
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">{children}</div>
      </div>
    </div>
  );

  // Render into document body via portal
  return createPortal(modalContent, document.body);
}
