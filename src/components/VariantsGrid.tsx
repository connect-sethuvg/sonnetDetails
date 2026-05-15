import { AnimatePresence } from 'framer-motion'
import { SectionHeading } from './ui/SectionHeading'
import { SearchBar } from './SearchBar'
import { FilterBar } from './FilterBar'
import { VariantCard } from './VariantCard'
import type { Variant } from '../types'
import type { GearboxFilterType, FilterState } from '../types'
import { pricing } from '../data'

interface VariantsGridProps {
  variants: Variant[]
  filters: FilterState
  onUpdate: (patch: Partial<FilterState>) => void
  onToggleFeature: (tag: string) => void
  onToggleTransmission: (trans: GearboxFilterType) => void
  onReset: () => void
  onView: (v: Variant) => void
  onCompare: (id: string) => void
  isComparing: (id: string) => boolean
}

export function VariantsGrid({
  variants,
  filters,
  onUpdate,
  onToggleFeature,
  onToggleTransmission,
  onReset,
  onView,
  onCompare,
  isComparing,
}: VariantsGridProps) {
  return (
    <section id="variants" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Showroom"
        title="Choose your wild"
        subtitle={`${pricing.dealer} · ${pricing.region} on-road · W.E.F. ${pricing.effectiveDate}`}
      />

      <div className="space-y-6 mb-10">
        <SearchBar
          value={filters.search}
          onChange={(search) => onUpdate({ search })}
          resultCount={variants.length}
        />
        <FilterBar
          filters={filters}
          onUpdate={onUpdate}
          onToggleFeature={onToggleFeature}
          onToggleTransmission={onToggleTransmission}
          onReset={onReset}
        />
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {variants.map((v, i) => (
            <VariantCard
              key={v.id}
              variant={v}
              index={i}
              onView={onView}
              onCompare={onCompare}
              isComparing={isComparing(v.id)}
            />
          ))}
        </div>
      </AnimatePresence>

      {variants.length === 0 && (
        <p className="text-center text-white/40 py-20 glass rounded-2xl">
          No variants match your filters. Try adjusting search or filters.
        </p>
      )}
    </section>
  )
}
