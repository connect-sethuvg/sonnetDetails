import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from './ui/SectionHeading'
import { CompareTable } from './CompareTable'
import { comparePresets, variants } from '../data'
interface CompareSectionProps {
  selectedIds: string[]
  onSelectPreset: (a: string, b: string) => void
}

export function CompareSection({ selectedIds, onSelectPreset }: CompareSectionProps) {
  const [preset, setPreset] = useState(comparePresets[0].id)

  const variantA = variants.find((v) => v.id === selectedIds[0])
  const variantB = variants.find((v) => v.id === selectedIds[1])

  const applyPreset = (presetId: string) => {
    setPreset(presetId)
    const p = comparePresets.find((x) => x.id === presetId)
    if (p) onSelectPreset(p.variantAId, p.variantBId)
  }

  return (
    <section id="compare" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Compare"
        title="Side by side. No compromise."
        subtitle="Stack variants against each other with animated comparison rows."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {comparePresets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              preset === p.id
                ? 'bg-olive text-matte'
                : 'glass text-white/70 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {variantA && variantB ? (
          <motion.div
            key={`${variantA.id}-${variantB.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CompareTable variantA={variantA} variantB={variantB} />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/40 py-16 glass rounded-2xl"
          >
            Select 2 variants using the compare button on variant cards, or pick a preset above.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
