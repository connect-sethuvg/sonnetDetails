import { useMemo, useState } from 'react'
import type { GearboxFilterType, FilterState, Variant } from '../types'

const DEFAULT: FilterState = {
  search: '',
  fuel: 'all',
  transmissions: [],
  trim: 'all',
  budgetMin: 0,
  budgetMax: 20_000_000,
  features: [],
  sort: 'recommended',
}

export function useFilters(variants: Variant[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT)

  const filtered = useMemo(() => {
    let list = [...variants]

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.trim.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q) ||
          v.highlights.some((h) => h.toLowerCase().includes(q)),
      )
    }

    if (filters.fuel !== 'all') list = list.filter((v) => v.fuel === filters.fuel)
    if (filters.transmissions.length > 0) {
      list = list.filter((v) =>
        filters.transmissions.includes(v.transmission),
      )
    }
    if (filters.trim !== 'all') list = list.filter((v) => v.trim === filters.trim)

    list = list.filter(
      (v) => v.onRoad >= filters.budgetMin && v.onRoad <= filters.budgetMax,
    )

    if (filters.features.length) {
      list = list.filter((v) =>
        filters.features.every((f) => v.featureTags.includes(f)),
      )
    }

    switch (filters.sort) {
      case 'price-asc':
        list.sort((a, b) => a.onRoad - b.onRoad)
        break
      case 'price-desc':
        list.sort((a, b) => b.onRoad - a.onRoad)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list.sort((a, b) => {
          if (a.recommended && !b.recommended) return -1
          if (!a.recommended && b.recommended) return 1
          return a.onRoad - b.onRoad
        })
    }

    return list
  }, [variants, filters])

  const update = (patch: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, ...patch }))

  const toggleFeature = (tag: string) =>
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(tag)
        ? prev.features.filter((f) => f !== tag)
        : [...prev.features, tag],
    }))

  const toggleTransmission = (trans: GearboxFilterType) =>
    setFilters((prev) => ({
      ...prev,
      transmissions: prev.transmissions.includes(trans)
        ? prev.transmissions.filter((t) => t !== trans)
        : [...prev.transmissions, trans],
    }))

  const reset = () => setFilters(DEFAULT)

  return { filters, filtered, update, toggleFeature, toggleTransmission, reset }
}
