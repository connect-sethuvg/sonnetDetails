import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import type { Variant } from '../types'
import { formatINR } from '../utils/format'

interface VariantModalProps {
  variant: Variant | null
  onClose: () => void
}

const PRICING_ROWS = [
  { key: 'exShowroom', label: 'Ex-showroom' },
  { key: 'tcs', label: 'TCS' },
  { key: 'roadTax', label: 'Road tax' },
  { key: 'registration', label: 'Registration' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'fastag', label: 'FASTag' },
  { key: 'extendedWarranty', label: 'Extended warranty' },
  { key: 'kiaConnect', label: 'Kia Connect' },
  { key: 'accessories', label: 'Accessories & MPP' },
] as const

export function VariantModal({ variant, onClose }: VariantModalProps) {
  return (
    <AnimatePresence>
      {variant && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="variant-modal-title"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[70] w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass border border-white/10"
          >
            <div className="sticky top-0 flex justify-between items-center p-5 glass border-b border-white/10 z-10">
              <div>
                <h2 id="variant-modal-title" className="font-display text-xl font-bold">
                  {variant.name}
                </h2>
                <p className="text-sm text-white/50">
                  {variant.engine} · {variant.transLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="h-40 bg-gradient-to-br from-graphite-light via-olive/30 to-matte" />

            <motion.div className="p-5 space-y-6">
              <section>
                <h3 className="text-xs font-bold tracking-widest text-olive-glow uppercase mb-3">
                  Pricing Breakdown
                </h3>
                <dl className="space-y-2">
                  {PRICING_ROWS.map(({ key, label }) => {
                    const val = variant.pricing[key]
                    if (!val) return null
                    return (
                      <div key={key} className="flex justify-between text-sm">
                        <dt className="text-white/50">{label}</dt>
                        <dd className="font-medium">{formatINR(val)}</dd>
                      </div>
                    )
                  })}
                  <div className="flex justify-between pt-3 border-t border-white/10 text-base font-bold">
                    <dt>Final on-road</dt>
                    <dd className="text-olive-glow">{formatINR(variant.onRoad)}</dd>
                  </div>
                </dl>
              </section>

              <section>
                <h3 className="text-xs font-bold tracking-widest text-olive-glow uppercase mb-3">
                  Features
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {variant.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-white/80">
                      <Check size={16} className="text-olive-glow shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              {variant.featureTags.includes('adas') && (
                <section>
                  <h3 className="text-xs font-bold tracking-widest text-olive-glow uppercase mb-2">
                    Safety & ADAS
                  </h3>
                  <p className="text-sm text-white/60">
                    ADAS Level 1 with 10 autonomous safety features including Lane Keep Assist,
                    Blind View Monitor, FCA, and Driver Attention Warning.
                  </p>
                </section>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
