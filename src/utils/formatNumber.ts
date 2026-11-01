/**
 * Format angka dengan desimal menggunakan koma (sesuai konvensi Indonesia).
 * Contoh: 11.83 → "11,83"
 */
export function formatNumber(value: number, decimals?: number): string {
  const fixed = decimals !== undefined ? value.toFixed(decimals) : String(value);
  return fixed.replace(".", ",");
}

/**
 * Format angka besar dengan pemisah ribuan titik dan desimal koma.
 * Contoh: 4318981 → "4.318.981"
 */
export function formatThousands(value: number): string {
  const parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}
