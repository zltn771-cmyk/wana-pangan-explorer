'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import type { Toast } from '@/context/ToastContext';

/* ------------------------------------------------------------------ */
/*  Per-toast config                                                    */
/* ------------------------------------------------------------------ */

type ToastType = Toast['type'];

interface ToastConfig {
  icon: React.ReactNode;
  barColor: string;
  iconColor: string;
  titleColor: string;
}

function getConfig(type: ToastType): ToastConfig {
  switch (type) {
    case 'success':
      return {
        icon: <CheckCircle size={20} aria-hidden="true" />,
        barColor: 'bg-green-500',
        iconColor: 'text-green-500',
        titleColor: 'text-green-800',
      };
    case 'error':
      return {
        icon: <XCircle size={20} aria-hidden="true" />,
        barColor: 'bg-red-500',
        iconColor: 'text-red-500',
        titleColor: 'text-red-800',
      };
    case 'warning':
      return {
        icon: <AlertTriangle size={20} aria-hidden="true" />,
        barColor: 'bg-amber-500',
        iconColor: 'text-amber-500',
        titleColor: 'text-amber-800',
      };
    case 'info':
    default:
      return {
        icon: <Info size={20} aria-hidden="true" />,
        barColor: 'bg-[#174B35]',
        iconColor: 'text-[#174B35]',
        titleColor: 'text-[#174B35]',
      };
  }
}

/* ------------------------------------------------------------------ */
/*  Single toast item                                                   */
/* ------------------------------------------------------------------ */

interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  // Trigger enter animation on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const config = getConfig(toast.type);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transform: visible ? 'translateX(0)' : 'translateX(110%)',
        opacity: visible ? 1 : 0,
      }}
      className={[
        'relative w-full max-w-sm',
        'bg-white shadow-xl rounded-[12px]',
        'overflow-hidden',
        'flex items-start gap-3 p-4',
        'border border-gray-100',
      ].join(' ')}
    >
      {/* Colored left bar */}
      <span
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-[12px] ${config.barColor}`}
        aria-hidden="true"
      />

      {/* Icon */}
      <span className={`shrink-0 mt-0.5 ${config.iconColor}`}>{config.icon}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className={`text-sm font-semibold leading-snug ${config.titleColor}`}>
            {toast.title}
          </p>
        )}
        {toast.message && (
          <p className="text-sm text-gray-600 leading-snug mt-0.5">{toast.message}</p>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Tutup notifikasi"
        className={[
          'shrink-0 flex items-center justify-center',
          'w-6 h-6 rounded-full',
          'text-gray-400 hover:text-gray-700',
          'hover:bg-gray-100 transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[#174B35]/30',
        ].join(' ')}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toast container                                                     */
/* ------------------------------------------------------------------ */

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      aria-label="Area notifikasi"
      className={[
        'fixed bottom-6 right-6 z-[9999]',
        'flex flex-col gap-3 items-end',
        'pointer-events-none',
        'w-full max-w-sm',
      ].join(' ')}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full">
          <ToastItem toast={toast} onClose={removeToast} />
        </div>
      ))}
    </div>,
    document.body,
  );
}
