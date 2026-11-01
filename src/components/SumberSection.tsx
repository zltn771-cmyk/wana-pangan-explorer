import { sumberData } from '../data/constants';

export default function SumberSection() {
  return (
    <section id="sumber" className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-forest-dark text-3xl font-bold mb-8">
          Sumber dan Metodologi
        </h2>

        <ol className="list-decimal list-outside pl-6 text-sm text-text-dark">
          {sumberData.map((sumber, index) => (
            <li
              key={index}
              className="p-3 border-b border-coffee/20 last:border-b-0 leading-relaxed"
            >
              {sumber}
            </li>
          ))}
        </ol>

        <div className="bg-forest/10 p-4 rounded-lg mt-6">
          <p className="text-sm font-medium text-forest-dark">
            Seluruh angka yang ditampilkan dalam prototipe ini dikutip dari sumber-sumber di atas.
          </p>
        </div>

        <footer className="py-8 text-center text-sm text-coffee mt-12">
          Wana Pangan Explorer — Prototipe Konsep
        </footer>
      </div>
    </section>
  );
}
