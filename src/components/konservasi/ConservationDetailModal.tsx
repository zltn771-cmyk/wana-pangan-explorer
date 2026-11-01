import { CheckCircle2, ShieldCheck, Target, Users, Trees, Calendar } from 'lucide-react';
import { Modal, Button, SimulasiLabel, SimulasiBox } from '@/components/ui';
import type { ConservationProgram } from '@/types';
import { CONSERVATION_CATEGORIES } from '@/types';

interface ConservationDetailModalProps {
  program: ConservationProgram | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContribute: (program: ConservationProgram) => void;
}

export function ConservationDetailModal({
  program,
  isOpen,
  onClose,
  onOpenContribute,
}: ConservationDetailModalProps) {
  if (!program) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={program.name}
      size="lg"
    >
      <div className="space-y-6">
        {/* Visual Banner */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
              Kategori: {CONSERVATION_CATEGORIES[program.category]}
            </span>
            <SimulasiLabel text="Rancangan Model Konservasi" />
          </div>
        </div>

        {/* Latar Belakang & Tujuan */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-slate-800">
            Latar Belakang & Tujuan Ekologis
          </h4>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {program.longDescription}
          </p>
        </div>

        {/* Bentuk Partisipasi & Indikator Keberhasilan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h5 className="font-bold text-xs text-forest flex items-center gap-1.5 uppercase tracking-wider">
              <Users size={14} />
              Partisipasi Masyarakat Desa
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Melibatkan kelompok tani hutan, karang taruna penggerak patroli hutan, serta ibu-ibu tani dalam pembibitan dan pemeliharaan pohon pangan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h5 className="font-bold text-xs text-earth flex items-center gap-1.5 uppercase tracking-wider">
              <Target size={14} />
              Indikator Keberhasilan Rencana
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Target terukur: <strong>{program.target}</strong> dengan pemantauan kelangsungan hidup tanaman minimal 85% pada tahun pertama.
            </p>
          </div>
        </div>

        {/* Rangkaian Rencana Kegiatan */}
        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
            Rangkaian Rencana Aksi Lapangan:
          </h5>
          <div className="space-y-2">
            {program.activities.map((act, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={15} className="text-forest shrink-0" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Prototype */}
        <SimulasiBox>
          <p className="text-xs">
            <strong>Penjelasan Status Kegiatan:</strong> Seluruh rincian kegiatan dan indikator capaian
            merupakan desain skema ecopreneurship Wana Pangan. Belum ada klaim pelaksanaan komersial penuh.
          </p>
        </SimulasiBox>

        {/* Modal Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            className="flex-1 justify-center"
            onClick={onClose}
          >
            Tutup
          </Button>

          <Button
            variant="primary"
            size="md"
            className="flex-1 justify-center font-bold"
            onClick={() => {
              onClose();
              onOpenContribute(program);
            }}
          >
            Dukung Program Ini (Simulasi)
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConservationDetailModal;
