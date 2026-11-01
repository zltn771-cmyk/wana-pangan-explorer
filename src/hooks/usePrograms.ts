import { useLocalStorage } from './useLocalStorage';
import type { ConservationProgram } from '@/types';
import { conservationPrograms as initialPrograms } from '@/data/conservation';
import { generateId } from '@/utils/format';

export function usePrograms() {
  const [programs, setPrograms] = useLocalStorage<ConservationProgram[]>(
    'wana-programs',
    initialPrograms
  );

  const addProgram = (
    data: Omit<ConservationProgram, 'id' | 'isSimulasi'>
  ): ConservationProgram => {
    const newProg: ConservationProgram = {
      ...data,
      id: generateId('prg'),
      isSimulasi: true,
    };
    setPrograms((prev) => [newProg, ...prev]);
    return newProg;
  };

  const updateProgram = (
    id: string,
    data: Partial<Omit<ConservationProgram, 'id' | 'isSimulasi'>>
  ): void => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProgram = (id: string): void => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  const resetPrograms = (): void => {
    setPrograms(initialPrograms);
  };

  const getProgram = (id: string): ConservationProgram | undefined => {
    return programs.find((p) => p.id === id);
  };

  return {
    programs,
    addProgram,
    updateProgram,
    deleteProgram,
    resetPrograms,
    getProgram,
  };
}

export default usePrograms;
