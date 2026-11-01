import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Product, ProductCategory } from '@/types';
import { products as initialProducts } from '@/data/products';
import { generateId } from '@/utils/format';

export function useProducts() {
  const [products, setProducts] = useLocalStorage<Product[]>(
    'wana-products',
    initialProducts
  );

  // Migrasi otomatis ke skema komoditas lokal Bengkulu jika data lama tersimpan di browser
  useEffect(() => {
    if (products.length > 0 && (!products[0].bahanBaku || !products[0].asalWilayah)) {
      setProducts(initialProducts);
    }
  }, []);

  const addProduct = (
    data: Omit<Product, 'id' | 'isSimulasi'>
  ): Product => {
    const newProduct: Product = {
      ...data,
      id: generateId('prd'),
      isSimulasi: true,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (
    id: string,
    data: Partial<Omit<Product, 'id' | 'isSimulasi'>>
  ): void => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProduct = (id: string): void => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const reduceStock = (id: string, quantity: number): boolean => {
    let success = false;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          success = true;
          return { ...p, stock: Math.max(0, p.stock - quantity) };
        }
        return p;
      })
    );
    return success;
  };

  const resetProducts = (): void => {
    setProducts(initialProducts);
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    reduceStock,
    resetProducts,
    getProduct,
  };
}

export default useProducts;
