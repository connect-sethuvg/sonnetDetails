import { useCallback, useState } from 'react'

const MAX = 2

export function useCompare() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX) return [prev[1], id]
      return [...prev, id]
    })
  }, [])

  const clear = useCallback(() => setSelected([]), [])

  const isSelected = useCallback((id: string) => selected.includes(id), [selected])

  return { selected, toggle, clear, isSelected, canCompare: selected.length === 2 }
}
