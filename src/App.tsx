import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MasalahSection from './components/MasalahSection'
import ModelSection from './components/ModelSection'
import KonfiguratorSection from './components/KonfiguratorSection'
import DesaSection from './components/DesaSection'
import RoadmapSection from './components/RoadmapSection'
import IndikatorRisikoSection from './components/IndikatorRisikoSection'
import KodeEtikSection from './components/KodeEtikSection'
import SumberSection from './components/SumberSection'

export default function App() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Navbar />
      <main>
        <Hero />
        <MasalahSection />
        <ModelSection />
        <KonfiguratorSection />
        <DesaSection />
        <RoadmapSection />
        <IndikatorRisikoSection />
        <KodeEtikSection />
        <SumberSection />
      </main>
    </div>
  )
}
