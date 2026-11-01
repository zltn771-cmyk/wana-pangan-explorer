import { Search, RotateCcw, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui';
import type { ProductCategory } from '@/types';
import { PRODUCT_CATEGORIES } from '@/types';

export interface ProductFilterState {
  search: string;
  category: string;
  priceRange: string;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}

interface ProductFilterProps {
  filters: ProductFilterState;
  onChange: (filters: ProductFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export function ProductFilter({
  filters,
  onChange,
  onReset,
  totalResults,
}: ProductFilterProps) {
  const isFiltered =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.sortBy !== 'price-asc';

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/90 shadow-xs space-y-4 mb-8">
      {/* Top row: Search, Sorting, and Counter */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Cari nama produk pangan, asal desa, atau olahan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown size={15} className="text-slate-400 shrink-0" />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as ProductFilterState['sortBy'],
              })
            }
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:border-forest"
          >
            <option value="price-asc">Harga: Termurah</option>
            <option value="price-desc">Harga: Tertinggi</option>
            <option value="name-asc">Nama: A — Z</option>
            <option value="name-desc">Nama: Z — A</option>
          </select>
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            <strong className="text-forest font-bold">{totalResults}</strong> produk ditemukan
          </span>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-xs text-slate-600 hover:text-red-600 h-8 px-2.5"
              leftIcon={<RotateCcw size={13} />}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Filter Category Tabs & Price Range */}
      <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row gap-4 lg:items-center justify-between text-xs">
        {/* Kategori Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-slate-400 font-semibold shrink-0 mr-1">Kategori:</span>
          <button
            type="button"
            onClick={() => onChange({ ...filters, category: 'all' })}
            className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
              filters.category === 'all'
                ? 'bg-forest text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Kategori
          </button>
          {Object.entries(PRODUCT_CATEGORIES).map(([catKey, label]) => (
            <button
              key={catKey}
              type="button"
              onClick={() => onChange({ ...filters, category: catKey })}
              className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
                filters.category === catKey
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Rentang Harga Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-slate-400 font-semibold shrink-0 mr-1">Rentang Harga:</span>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'under-30', label: '< Rp 30.000' },
            { id: '30-70', label: 'Rp 30rb – 70rb' },
            { id: 'above-70', label: '> Rp 70.000' },
          ].map((rng) => (
            <button
              key={rng.id}
              type="button"
              onClick={() => onChange({ ...filters, priceRange: rng.id })}
              className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
                filters.priceRange === rng.id
                  ? 'bg-earth text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {rng.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
