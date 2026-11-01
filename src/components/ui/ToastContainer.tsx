// ============================================================
// components/ui/ToastContainer.tsx — Kontainer notifikasi toast
// ============================================================

import { useEffect, useRef } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import type { ToastType } from '@/types';

// ── Icon & style map ──────────────────────────────────────────
const TOAST_CONFIG: Record<
  ToastType,
  { icon: React.ReactNode; bg: string; border: string; text: string }
> = {
  success: {
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    bg: 'bg-white',
    border: 'border-l-4 border-l-emerald-500',
    text: 'text-slate-800',
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-red-500" />,
    bg: 'bg-white',
    border: 'border-l-4 border-l-red-500',
    text: 'text-slate-800',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    bg: 'bg-white',
    border: 'border-l-4 border-l-amber-500',
    text: 'text-slate-800',
  },
  info: {
    icon: <Info className="h-5 w-5 text-blue-500" />,
    bg: 'bg-white',
    border: 'border-l-4 border-l-blue-500',
    text: 'text-slate-800',
  },
};

// ── Single Toast ──────────────────────────────────────────────
function ToastItem({
  id,
  type,
  message,
  duration = 4000,
}: {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}) {
  const { removeToast } = useToast();
  const config = TOAST_CONFIG[type];
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current || duration <= 0) return;
    const el = progressRef.current;
    el.style.transition = `width ${duration}ms linear`;
    requestAnimationFrame(() => {
      el.style.width = '0%';
    });
  }, [duration]);

  return (
    <div
      className={`relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5
        ${config.bg} ${config.border} ${config.text} px-4 py-3
        animate-slide-in-right`}
      role="alert"
    >
      <span className="mt-0.5 shrink-0">{config.icon}</span>
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={() => removeToast(id)}
        className="shrink-0 rounded p-0.5 opacity-50 transition hover:opacity-100 focus-visible:opacity-100"
        aria-label="Tutup notifikasi"
      >
        <X className="h-4 w-4" />
      </button>
      {/* Progress bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100">
          <div
            ref={progressRef}
            className="h-full w-full bg-sage/70 transition-[width]"
          />
        </div>
      )}
    </div>
  );
}

// ── Container ─────────────────────────────────────────────────
export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-6 right-4 z-[9999] flex flex-col items-end gap-3 sm:right-6"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto w-full max-w-sm">
          <ToastItem
            id={t.id}
            type={t.type}
            message={t.message}
            duration={t.duration}
          />
        </div>
      ))}
    </div>
  );
}
