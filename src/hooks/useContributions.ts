import { useLocalStorage } from './useLocalStorage';
import type { Contribution } from '@/types';
import { generateId } from '@/utils/format';

const INITIAL_CONTRIBUTIONS: Contribution[] = [
  {
    id: 'con-001',
    programId: 'pemulihan-inang-rafflesia',
    programName: 'Restorasi Tanaman Inang Rafflesia',
    contributor: 'Rian Pratama',
    amount: 100000,
    note: 'Semoga inang Tetrastigma lekas tumbuh subur',
    createdAt: '2026-10-28T09:30:00.000Z',
    isSimulasi: true,
  },
  {
    id: 'con-002',
    programId: 'penanaman-pohon-pangan',
    programName: 'Penanaman Pohon Pangan',
    contributor: 'Siti Aminah',
    amount: 50000,
    note: 'Untuk bibit pohon durian dan aren di Batu Ampar',
    createdAt: '2026-10-25T14:15:00.000Z',
    isSimulasi: true,
  },
  {
    id: 'con-003',
    programId: 'patroli-hutan-warga',
    programName: 'Patroli dan Perlindungan Kawasan',
    contributor: 'Komunitas Pecinta Rimba',
    amount: 250000,
    note: 'Dukungan perlengkapan rompi dan P3K patroli pemuda',
    createdAt: '2026-10-20T11:00:00.000Z',
    isSimulasi: true,
  },
];

export function useContributions() {
  const [contributions, setContributions] = useLocalStorage<Contribution[]>(
    'wana-contributions',
    INITIAL_CONTRIBUTIONS
  );

  const addContribution = (
    data: Omit<Contribution, 'id' | 'createdAt' | 'isSimulasi'>
  ): Contribution => {
    const newContrib: Contribution = {
      ...data,
      id: generateId('con'),
      createdAt: new Date().toISOString(),
      isSimulasi: true,
    };
    setContributions((prev) => [newContrib, ...prev]);
    return newContrib;
  };

  const totalSimulatedContributions = contributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );

  const resetContributions = (): void => {
    setContributions(INITIAL_CONTRIBUTIONS);
  };

  return { contributions, addContribution, totalSimulatedContributions, resetContributions };
}

export default useContributions;
