import { motion, AnimatePresence } from 'framer-motion'
import { GitCompare, X } from 'lucide-react'

interface FloatingCompareProps {
  count: number
  canCompare: boolean
  onCompare: () => void
  onClear: () => void
}

export function FloatingCompare({ count, canCompare, onCompare, onClear }: FloatingCompareProps) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
        >
          <div className="glass rounded-full px-4 py-3 flex items-center gap-3 shadow-2xl shadow-black/40">
            <span className="text-sm font-medium">
              {count}/2 selected
            </span>
            {canCompare ? (
              <button
                type="button"
                onClick={onCompare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-olive text-matte text-sm font-bold"
              >
                <GitCompare size={16} />
                Compare Now
              </button>
            ) : (
              <span className="text-xs text-white/40">Select one more</span>
            )}
            <button
              type="button"
              onClick={onClear}
              className="p-1.5 rounded-full hover:bg-white/10"
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
