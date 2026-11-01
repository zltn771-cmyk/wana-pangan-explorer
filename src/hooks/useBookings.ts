import { useLocalStorage } from './useLocalStorage';
import type { Booking, BookingStatus } from '@/types';
import { generateId } from '@/utils/format';

export function useBookings() {
  const [bookings, setBookings] = useLocalStorage<Booking[]>('wana-bookings', []);

  const addBooking = (
    booking: Omit<Booking, 'id' | 'createdAt' | 'isSimulasi'>,
  ): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: generateId('bkg'),
      createdAt: new Date().toISOString(),
      isSimulasi: true,
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string): void => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'dibatalkan' } : b)),
    );
  };

  const updateStatus = (id: string, status: BookingStatus): void => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  };

  const deleteBooking = (id: string): void => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const resetBookings = (): void => {
    setBookings([]);
  };

  return { bookings, addBooking, cancelBooking, updateStatus, deleteBooking, resetBookings };
}

export default useBookings;
