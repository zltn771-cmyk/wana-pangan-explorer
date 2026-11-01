import { useLocalStorage } from './useLocalStorage';
import type { LumbungTransaction, FoodReserve } from '@/types';
import { initialLumbungTransactions, foodReserves as initialFoodReserves } from '@/data/lumbung';
import { generateId } from '@/utils/format';

export function useLumbung() {
  const [transactions, setTransactions] = useLocalStorage<LumbungTransaction[]>(
    'wana-lumbung-tx',
    initialLumbungTransactions
  );

  const [reserves, setReserves] = useLocalStorage<FoodReserve[]>(
    'wana-food-reserves',
    initialFoodReserves
  );

  // Perhitungan Saldo Kas Dinamis
  const totalPemasukan = transactions
    .filter((tx) => tx.type !== 'pengeluaran-darurat')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalPengeluaran = transactions
    .filter((tx) => tx.type === 'pengeluaran-darurat')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalSaldoKas = totalPemasukan - totalPengeluaran;

  // Saldo per Pos Dana Terpisah
  const saldoCadanganPangan =
    transactions
      .filter((tx) => tx.fund === 'cadangan-pangan' && tx.type !== 'pengeluaran-darurat')
      .reduce((sum, tx) => sum + tx.amount, 0) -
    transactions
      .filter((tx) => tx.fund === 'cadangan-pangan' && tx.type === 'pengeluaran-darurat')
      .reduce((sum, tx) => sum + tx.amount, 0);

  const saldoKonservasi =
    transactions
      .filter((tx) => tx.fund === 'konservasi' && tx.type !== 'pengeluaran-darurat')
      .reduce((sum, tx) => sum + tx.amount, 0) -
    transactions
      .filter((tx) => tx.fund === 'konservasi' && tx.type === 'pengeluaran-darurat')
      .reduce((sum, tx) => sum + tx.amount, 0);

  const saldoOperasional =
    transactions
      .filter((tx) => tx.fund === 'operasional' && tx.type !== 'pengeluaran-darurat')
      .reduce((sum, tx) => sum + tx.amount, 0) -
    transactions
      .filter((tx) => tx.fund === 'operasional' && tx.type === 'pengeluaran-darurat')
      .reduce((sum, tx) => sum + tx.amount, 0);

  const addTransaction = (
    tx: Omit<LumbungTransaction, 'id' | 'createdAt' | 'isSimulasi'>
  ): { success: boolean; message?: string } => {
    if (tx.amount <= 0) {
      return { success: false, message: 'Nominal transaksi harus lebih besar dari Rp 0.' };
    }

    if (tx.type === 'pengeluaran-darurat') {
      const targetSaldo =
        tx.fund === 'cadangan-pangan'
          ? saldoCadanganPangan
          : tx.fund === 'konservasi'
          ? saldoKonservasi
          : saldoOperasional;

      if (tx.amount > targetSaldo) {
        return {
          success: false,
          message: `Nominal pengeluaran melebihi saldo tersedia pada pos ${tx.fund}.`,
        };
      }
    }

    const newTx: LumbungTransaction = {
      ...tx,
      id: generateId('lt'),
      createdAt: new Date().toISOString().split('T')[0],
      isSimulasi: true,
    };

    setTransactions((prev) => [newTx, ...prev]);
    return { success: true };
  };

  const deleteTransaction = (id: string): void => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const updateFoodStock = (
    id: string,
    delta: number,
    keterangan?: string
  ): { success: boolean; message?: string } => {
    const item = reserves.find((r) => r.id === id);
    if (!item) {
      return { success: false, message: 'Komoditas tidak ditemukan.' };
    }

    if (item.quantity + delta < 0) {
      return {
        success: false,
        message: `Pengurangan melebihi stok yang tersedia (${item.quantity} ${item.unit}). Stok tidak boleh negatif.`,
      };
    }

    setReserves((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              quantity: r.quantity + delta,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );

    return { success: true };
  };

  const addNewCommodity = (
    komoditas: string,
    quantity: number,
    unit: string
  ): { success: boolean } => {
    const newComm: FoodReserve = {
      id: generateId('fr'),
      komoditas,
      quantity,
      unit,
      lastUpdated: new Date().toISOString().split('T')[0],
      isSimulasi: true,
    };
    setReserves((prev) => [...prev, newComm]);
    return { success: true };
  };

  const deleteCommodity = (id: string): void => {
    setReserves((prev) => prev.filter((r) => r.id !== id));
  };

  const resetLumbung = (): void => {
    setTransactions(initialLumbungTransactions);
    setReserves(initialFoodReserves);
  };

  return {
    transactions,
    reserves,
    totalSaldoKas,
    totalPemasukan,
    totalPengeluaran,
    saldoCadanganPangan,
    saldoKonservasi,
    saldoOperasional,
    addTransaction,
    deleteTransaction,
    updateFoodStock,
    addNewCommodity,
    deleteCommodity,
    resetLumbung,
  };
}

export default useLumbung;
