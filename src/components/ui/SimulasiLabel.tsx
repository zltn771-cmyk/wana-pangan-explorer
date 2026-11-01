import React, { type ReactNode } from 'react';
import { FlaskConical } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  SimulasiLabel — inline pill badge                                  */
/* ------------------------------------------------------------------ */

export interface SimulasiLabelProps {
  text?: string;
  className?: string;
}

export function SimulasiLabel({
  text = 'Data Simulasi',
  className = '',
}: SimulasiLabelProps) {
  return (
    <span
      className={[
        'simulasi-label',
        'inline-flex items-center gap-1',
        'rounded-full px-2 py-0.5',
        'bg-amber-100 text-amber-800 border border-amber-300',
        'text-[10px] font-semibold leading-none',
        'whitespace-nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <FlaskConical size={10} className="shrink-0" aria-hidden="true" />
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  SimulasiBox — full disclaimer container                            */
/* ------------------------------------------------------------------ */

export interface SimulasiBoxProps {
  children: ReactNode;
  className?: string;
}

export function SimulasiBox({ children, className = '' }: SimulasiBoxProps) {
  return (
    <div
      className={[
        'bg-amber-50 border border-amber-200 rounded-xl p-4',
        'text-sm text-amber-800',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="note"
      aria-label="Informasi data simulasi"
    >
      <div className="flex items-start gap-2">
        <FlaskConical
          size={16}
          className="mt-0.5 shrink-0 text-amber-600"
          aria-hidden="true"
        />
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
