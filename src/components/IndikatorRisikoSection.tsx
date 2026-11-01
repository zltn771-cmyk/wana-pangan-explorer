import { indikatorKeberhasilan, riskCards } from '../data/constants';

export default function IndikatorRisikoSection() {
  return (
    <section id="indikator" className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Bagian A: Indikator Keberhasilan */}
        <div>
          <h2 className="font-serif text-forest-dark text-2xl font-bold mb-6">
            Indikator Keberhasilan
          </h2>
          <ul className="space-y-3">
            {indikatorKeberhasilan.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full bg-forest text-cream flex items-center justify-center text-xs shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-text-dark text-base leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bagian B: Risiko dan Mitigasi */}
        <div>
          <h2 className="font-serif text-forest-dark text-2xl font-bold mt-12 mb-6">
            Risiko dan Mitigasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-terracotta"
              >
                <h3 className="text-lg font-semibold text-text-dark mb-2">
                  ⚠️ {card.risiko}
                </h3>
                <p className="text-sm text-coffee leading-relaxed">
                  <span className="font-medium">Mitigasi: </span>
                  {card.mitigasi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
