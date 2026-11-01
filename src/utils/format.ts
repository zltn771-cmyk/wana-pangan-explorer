// ── Number formatters ─────────────────────────────────────────
export const formatRupiah = (value: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number, decimals = 0): string =>
  new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

export const formatCompact = (value: number): string => {
  if (value >= 1_000_000_000) return `${formatNumber(value / 1_000_000_000, 1)} M`;
  if (value >= 1_000_000) return `${formatNumber(value / 1_000_000, 1)} Jt`;
  if (value >= 1_000) return `${formatNumber(value / 1_000, 0)} Rb`;
  return formatNumber(value);
};

// ── String helpers ─────────────────────────────────────────────
export const generateId = (prefix = 'id'): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const formatDateTime = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

export const slugify = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const truncate = (str: string, max: number): string =>
  str.length > max ? `${str.slice(0, max)}…` : str;
