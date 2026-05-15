import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import type { Variant } from '../types'
import { formatINR } from '../utils/format'

interface CompareTableProps {
  variantA: Variant
  variantB: Variant
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="text-olive-glow mx-auto" size={18} />
    ) : (
      <Minus className="text-white/20 mx-auto" size={18} />
    )
  }
  return <span className="text-sm">{value}</span>
}

export function CompareTable({ variantA, variantB }: CompareTableProps) {
  const allFeatures = Array.from(
    new Set([...variantA.features, ...variantB.features]),
  ).slice(0, 12)

  const rows: { label: string; a: string | boolean; b: string | boolean }[] = [
    { label: 'Engine', a: variantA.engine, b: variantB.engine },
    { label: 'Transmission', a: variantA.transLabel, b: variantB.transLabel },
    { label: 'Ex-showroom', a: formatINR(variantA.exShowroom), b: formatINR(variantB.exShowroom) },
    { label: 'On-road Kerala', a: formatINR(variantA.onRoad), b: formatINR(variantB.onRoad) },
    { label: 'ADAS', a: variantA.featureTags.includes('adas'), b: variantB.featureTags.includes('adas') },
    { label: 'Bose Audio', a: variantA.featureTags.includes('bose'), b: variantB.featureTags.includes('bose') },
    { label: 'Sunroof', a: variantA.featureTags.includes('sunroof'), b: variantB.featureTags.includes('sunroof') },
    { label: 'Ventilated Seats', a: variantA.featureTags.includes('ventilated'), b: variantB.featureTags.includes('ventilated') },
    ...allFeatures.map((f) => ({
      label: f.length > 28 ? f.slice(0, 28) + '…' : f,
      a: variantA.features.includes(f),
      b: variantB.features.includes(f),
    })),
  ]

  return (
    <div className="overflow-x-auto rounded-2xl glass border border-white/10">
      <table className="w-full min-w-[600px] text-left">
        <thead className="sticky top-0 z-10 glass">
          <tr>
            <th className="p-4 text-xs text-white/40 font-medium w-1/3">Specification</th>
            <th className="p-4 font-display font-bold">{variantA.name}</th>
            <th className="p-4 font-display font-bold">{variantB.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-t border-white/5 hover:bg-white/[0.02]"
            >
              <td className="p-4 text-sm text-white/50">{row.label}</td>
              <td className="p-4 text-center">
                <Cell value={row.a} />
              </td>
              <td className="p-4 text-center">
                <Cell value={row.b} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
