import { useLocalStorage } from './useLocalStorage';
import type { Order, CartItem, CustomerInfo } from '@/types';
import { generateId } from '@/utils/format';

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('wana-orders', []);

  const createOrder = (
    items: CartItem[],
    customer: CustomerInfo,
    total: number,
    paymentMethod: string = 'transfer',
    shippingCost: number = 0,
  ): Order => {
    const newOrder: Order = {
      id: generateId('ord'),
      items,
      total,
      status: 'baru',
      customer,
      paymentMethod,
      shippingCost,
      createdAt: new Date().toISOString(),
      isSimulasi: true,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateStatus = (id: string, status: Order['status']): void => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    );
  };

  const deleteOrder = (id: string): void => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const resetOrders = (): void => {
    setOrders([]);
  };

  return { orders, createOrder, updateStatus, deleteOrder, resetOrders };
}

export default useOrders;
