import { useLocalStorage } from './useLocalStorage';
import type { Destination } from '@/types';
import { destinations as initialDestinations } from '@/data/destinations';
import { generateId } from '@/utils/format';

export function useDestinations() {
  const [destinations, setDestinations] = useLocalStorage<Destination[]>(
    'wana-destinations',
    initialDestinations
  );

  const addDestination = (
    data: Omit<Destination, 'id' | 'isSimulasi'>
  ): Destination => {
    const newDest: Destination = {
      ...data,
      id: generateId('dst'),
      isSimulasi: true,
    };
    setDestinations((prev) => [newDest, ...prev]);
    return newDest;
  };

  const updateDestination = (
    id: string,
    data: Partial<Omit<Destination, 'id' | 'isSimulasi'>>
  ): void => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...data } : d))
    );
  };

  const deleteDestination = (id: string): void => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const resetDestinations = (): void => {
    setDestinations(initialDestinations);
  };

  const getDestination = (id: string): Destination | undefined => {
    return destinations.find((d) => d.id === id);
  };

  return {
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    resetDestinations,
    getDestination,
  };
}

export default useDestinations;
