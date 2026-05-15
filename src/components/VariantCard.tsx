import { motion } from 'framer-motion'
import { GitCompare, Eye, Star } from 'lucide-react'
import type { Variant } from '../types'
import { formatINR } from '../utils/format'

interface VariantCardProps {
  variant: Variant
  index: number
  onView: (v: Variant) => void
  onCompare: (id: string) => void
  isComparing: boolean
}

export function VariantCard({
  variant: v,
  index,
  onView,
  onCompare,
  isComparing,
}: VariantCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-2xl overflow-hidden glass glow-border ${
        v.recommended ? 'ring-2 ring-olive-glow/50' : ''
      } ${isComparing ? 'ring-2 ring-accent' : ''}`}
    >
      {v.recommended && (
        <motion.div
          className="absolute top-0 inset-x-0 z-10 bg-gradient-to-r from-olive/90 to-olive-glow/90 text-matte text-[10px] font-bold tracking-wider text-center py-1.5 flex items-center justify-center gap-1"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <Star size={12} fill="currentColor" />
          RECOMMENDED — BEST VALUE
        </motion.div>
      )}

      <motion.div
        className={`h-28 bg-gradient-to-br ${
          v.fuel === 'petrol'
            ? 'from-graphite-light via-olive/20 to-matte'
            : 'from-graphite via-olive/30 to-graphite-light'
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(156,184,106,0.25),transparent_60%)]" />
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
            v.fuel === 'petrol' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
          }`}
        >
          {v.fuel}
        </span>
        {v.premium && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-olive-glow">
            Premium
          </span>
        )}
      </motion.div>

      <motion.div className="p-5 pt-4" style={{ paddingTop: v.recommended ? '2rem' : undefined }}>
        <motion.div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-display font-bold text-lg">{v.name}</h3>
            <p className="text-white/50 text-xs mt-0.5">
              {v.engine} · {v.transLabel}
            </p>
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
            style={{
              background: 'rgba(156,184,106,0.15)',
              color: '#9cb86a',
            }}
          >
            {v.badge}
          </span>
        </motion.div>

        <div className="mt-4 flex justify-between items-end">
          <motion.div>
            <p className="text-2xl font-display font-extrabold">{formatINR(v.onRoad)}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">On-road Kerala</p>
          </motion.div>
          <p className="text-xs text-white/40">Ex: {formatINR(v.exShowroom)}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {v.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onView(v)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold transition-colors"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            type="button"
            onClick={() => onCompare(v.id)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isComparing
                ? 'bg-olive text-matte'
                : 'border border-white/20 hover:border-olive-glow/50'
            }`}
            aria-pressed={isComparing}
          >
            <GitCompare size={16} />
          </button>
        </div>
      </motion.div>
    </motion.article>
  )
}
