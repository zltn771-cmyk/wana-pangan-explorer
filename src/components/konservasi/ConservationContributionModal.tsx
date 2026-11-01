import { useState } from 'react';
import { HeartHandshake, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Modal, Button, Input, Textarea, SimulasiLabel, SimulasiBox } from '@/components/ui';
import type { ConservationProgram } from '@/types';
import { formatRupiah } from '@/utils/format';
import { useContributions } from '@/hooks/useContributions';
import { useToast } from '@/contexts/ToastContext';

interface ConservationContributionModalProps {
  program: ConservationProgram | null;
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_AMOUNTS = [25000, 50000, 100000, 250000];

export function ConservationContributionModal({
  program,
  isOpen,
  onClose,
}: ConservationContributionModalProps) {
  const { addContribution } = useContributions();
  const { showToast } = useToast();

  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [contributor, setContributor] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdId, setCreatedId] = useState('');

  if (!program) return null;

  const handleSelectQuick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(parseInt(val, 10));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!contributor.trim()) {
      errs.contributor = 'Nama kontributor wajib diisi.';
    }
    if (amount <= 0) {
      errs.amount = 'Nominal kontribusi harus lebih besar dari Rp 0.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newContrib = addContribution({
      programId: program.id,
      programName: program.name,
      contributor: contributor.trim(),
      amount,
      note: note.trim() || undefined,
    });

    setCreatedId(newContrib.id);
    setIsSuccess(true);
    showToast(`Dukungan simulasi ${formatRupiah(amount)} berhasil dicatat!`, 'success');
  };

  const handleClose = () => {
    setIsSuccess(false);
    setContributor('');
    setNote('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? 'Kontribusi Simulasi Berhasil' : 'Dukung Aksi Konservasi (Simulasi)'}
      size="md"
    >
      {isSuccess ? (
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 bg-emerald-100 text-forest rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={32} />
          </div>

          <h4 className="text-lg font-bold text-slate-800">
            Terima Kasih atas Dukungan Anda!
          </h4>
          <p className="text-xs text-slate-500">
            Nomor Pencatatan: <strong className="font-mono text-forest">{createdId}</strong>
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Program:</span>
              <strong className="text-slate-800">{program.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kontributor:</span>
              <strong className="text-slate-800">{contributor}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nominal Dukungan:</span>
              <strong className="text-forest text-sm font-black">{formatRupiah(amount)}</strong>
            </div>
          </div>

          <SimulasiBox>
            <p className="text-xs text-left">
              <strong>Pemberitahuan Prototype:</strong> Ini adalah simulasi pencatatan partisipasi
              konservasi. Tidak ada dana riil yang ditransfer. Data kontribusi telah tersimpan di LocalStorage browser Anda.
            </p>
          </SimulasiBox>

          <Button
            variant="primary"
            size="md"
            className="w-full justify-center font-bold"
            onClick={handleClose}
          >
            Selesai
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Program Banner Mini */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Program Pilihan
              </p>
              <h5 className="text-xs font-bold text-slate-800 truncate">{program.name}</h5>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Nominal Dukungan Simulasi:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleSelectQuick(amt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    amount === amt && !customAmount
                      ? 'bg-forest text-white border-forest shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {formatRupiah(amt)}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="mt-3">
              <input
                type="text"
                placeholder="Atau ketik nominal kustom (misal: 150000)..."
                value={customAmount}
                onChange={handleCustomChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-forest"
              />
              {errors.amount && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.amount}
                </p>
              )}
            </div>
          </div>

          {/* Data Kontributor */}
          <div className="space-y-3">
            <Input
              label="Nama Lengkap / Komunitas *"
              placeholder="Contoh: Rian Pratama / Pegiat Hutan"
              value={contributor}
              onChange={(e) => setContributor(e.target.value)}
              error={errors.contributor}
            />

            <Textarea
              label="Pesan / Catatan Semangat (Opsional)"
              placeholder="Tuliskan harapan atau pesan pelestarian..."
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Disclaimer */}
          <SimulasiBox>
            <p className="text-xs">
              <strong>Simulasi Prototype:</strong> Fitur ini mendemonstrasikan mekanisme crowdfunding
              jasa lingkungan. Tidak ada sistem pembayaran gateway yang terpasang.
            </p>
          </SimulasiBox>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="flex-1 justify-center"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1 justify-center font-bold"
            >
              Kirim Dukungan ({formatRupiah(amount)})
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default ConservationContributionModal;
