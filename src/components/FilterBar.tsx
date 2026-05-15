import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { GearboxFilterType, FilterState, FuelType } from '../types'
import { filterTags, pricing } from '../data'

interface FilterBarProps {
  filters: FilterState
  onUpdate: (patch: Partial<FilterState>) => void
  onToggleFeature: (tag: string) => void
  onToggleTransmission: (trans: GearboxFilterType) => void
  onReset: () => void
}

const FUELS: { id: FuelType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
]

const TRANSMISSIONS: { id: GearboxFilterType; label: string }[] = [
  { id: 'MT', label: 'Manual' },
  { id: 'iMT', label: 'iMT' },
  { id: 'DCT', label: 'DCT' },
  { id: 'AT', label: 'AT' },
]

const TRIMS = ['all', 'HTE', 'HTE(O)', 'HTK', 'HTK(O)', 'HTK Plus', 'HTK+(O)', 'HTX', 'GTX Plus', 'X-Line']

const SORTS: { id: FilterState['sort']; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'name', label: 'Name' },
]

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
        active
          ? 'bg-gradient-to-r from-olive to-olive-glow text-matte shadow-lg shadow-olive/20'
          : 'glass text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </motion.button>
  )
}

export function FilterBar({
  filters,
  onUpdate,
  onToggleFeature,
  onToggleTransmission,
  onReset,
}: FilterBarProps) {
  return (
    <div className="space-y-4 sticky top-[72px] z-30 py-4 -mx-4 px-4 sm:static sm:py-0 sm:mx-0 sm:px-0 bg-matte/95 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none">
      <motion.div
        layout
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Fuel type filter"
      >
        {FUELS.map((f) => (
          <Chip
            key={f.id}
            active={filters.fuel === f.id}
            onClick={() => onUpdate({ fuel: f.id })}
          >
            {f.label}
          </Chip>
        ))}
      </motion.div>

      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-medium">
          Gearbox · multi-select
        </p>
        <div
          className="flex flex-wrap gap-2 items-center"
          role="group"
          aria-label="Gearbox filter — select Manual, iMT, DCT, or AT"
        >
          {TRANSMISSIONS.map((t) => (
            <Chip
              key={t.id}
              active={filters.transmissions.includes(t.id)}
              onClick={() => onToggleTransmission(t.id)}
            >
              {t.label}
            </Chip>
          ))}
          {filters.transmissions.length > 0 && (
            <button
              type="button"
              onClick={() => onUpdate({ transmissions: [] })}
              className="px-3 py-2 rounded-full text-xs text-white/40 hover:text-white underline-offset-2 hover:underline"
            >
              Clear gearbox
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1" role="group" aria-label="Trim filter">
        {TRIMS.map((trim) => (
          <Chip
            key={trim}
            active={filters.trim === trim}
            onClick={() => onUpdate({ trim })}
          >
            {trim === 'all' ? 'All Trims' : trim}
          </Chip>
        ))}
</div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Budget filter">
        {pricing.budgetRanges.map((range) => (
          <Chip
            key={range.id}
            active={filters.budgetMin === range.min && filters.budgetMax === range.max}
            onClick={() => onUpdate({ budgetMin: range.min, budgetMax: range.max })}
          >
            {range.label}
          </Chip>
        ))}
</div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Feature filter">
        {filterTags.map((tag) => (
          <Chip
            key={tag.id}
            active={filters.features.includes(tag.id)}
            onClick={() => onToggleFeature(tag.id)}
          >
            {tag.label}
          </Chip>
        ))}
</div>

      <motion.div layout className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Sort">
          {SORTS.map((s) => (
            <Chip
              key={s.id}
              active={filters.sort === s.id}
              onClick={() => onUpdate({ sort: s.id })}
            >
              {s.label}
            </Chip>
          ))}
</div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-olive-glow hover:text-white underline-offset-4 hover:underline"
        >
          Reset filters
        </button>
</motion.div>
</div>
  )
}
