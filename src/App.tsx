import { lazy, Suspense, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { VariantsGrid } from './components/VariantsGrid'
import { VariantModal } from './components/VariantModal'
import { FloatingCompare } from './components/FloatingCompare'
import { PricingSection } from './components/PricingSection'
import { variants } from './data'
import { useFilters } from './hooks/useFilters'
import { useCompare } from './hooks/useCompare'
import type { Variant } from './types'

const FeatureSection = lazy(() =>
  import('./components/FeatureSection').then((m) => ({ default: m.FeatureSection })),
)
const EngineSection = lazy(() =>
  import('./components/EngineSection').then((m) => ({ default: m.EngineSection })),
)
const ADASSection = lazy(() =>
  import('./components/ADASSection').then((m) => ({ default: m.ADASSection })),
)
const CompareSection = lazy(() =>
  import('./components/CompareSection').then((m) => ({ default: m.CompareSection })),
)

function Loading() {
  return (
    <div className="py-20 flex justify-center">
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-olive border-t-transparent animate-spin"
      />
    </div>
  )
}

export default function App() {
  const { filters, filtered, update, toggleFeature, toggleTransmission, reset } =
    useFilters(variants)
  const { selected, toggle, clear, isSelected, canCompare } = useCompare()
  const [modalVariant, setModalVariant] = useState<Variant | null>(null)

  const scrollToCompare = useCallback(() => {
    document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handlePreset = useCallback((a: string, b: string) => {
    clear()
    toggle(a)
    toggle(b)
  }, [clear, toggle])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <VariantsGrid
          variants={filtered}
          filters={filters}
          onUpdate={update}
          onToggleFeature={toggleFeature}
          onToggleTransmission={toggleTransmission}
          onReset={reset}
          onView={setModalVariant}
          onCompare={toggle}
          isComparing={isSelected}
        />
        <Suspense fallback={<Loading />}>
          <FeatureSection />
          <EngineSection />
          <ADASSection />
          <CompareSection selectedIds={selected} onSelectPreset={handlePreset} />
        </Suspense>
        <PricingSection />
      </main>

      <footer className="py-12 px-4 text-center text-white/30 text-xs border-t border-white/5">
        <p>Kia Sonet 2026 · The Wild. Reborn. · Demo showroom experience</p>
        <p className="mt-2">Pricing: Incheon Motors Kerala W.E.F. 01.04.2026 · For illustration only</p>
      </footer>

      <VariantModal variant={modalVariant} onClose={() => setModalVariant(null)} />
      <FloatingCompare
        count={selected.length}
        canCompare={canCompare}
        onCompare={scrollToCompare}
        onClear={clear}
      />
    </>
  )
}
