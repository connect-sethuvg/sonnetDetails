import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  resultCount: number
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        size={18}
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search variants, engines, features..."
        className="w-full pl-12 pr-12 py-3.5 rounded-2xl glass text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-olive/40 transition-shadow"
        aria-label="Search variants"
      />
      {value && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          type="button"
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          aria-label="Clear search"
        >
          <X size={18} />
        </motion.button>
      )}
      <p className="mt-2 text-xs text-white/40" aria-live="polite">
        {resultCount} variant{resultCount !== 1 ? 's' : ''} found
      </p>
    </div>
  )
}
