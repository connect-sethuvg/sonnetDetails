export type FuelType = 'petrol' | 'diesel'
export type TransmissionType = 'MT' | 'iMT' | 'DCT' | 'AT'

export interface PricingBreakdown {
  exShowroom: number
  tcs: number
  roadTax: number
  registration: number
  insurance: number
  fastag: number
  onRoadBase: number
  extendedWarranty: number
  kiaConnect: number
  accessories: number
  totalOnRoad: number
}

export interface Variant {
  id: string
  name: string
  trim: string
  engine: string
  fuel: FuelType
  transmission: TransmissionType
  transLabel: string
  badge: string
  premium: boolean
  recommended?: boolean
  dualTone?: boolean
  exShowroom: number
  onRoad: number
  pricing: PricingBreakdown
  highlights: string[]
  features: string[]
  featureTags: string[]
  image?: string
}

export interface EngineSpec {
  id: string
  name: string
  powerKw: number
  torqueNm: number
  fuel: FuelType
  tagline: string
}

export interface FeatureCategory {
  id: string
  title: string
  subtitle: string
  items: { title: string; description: string; image?: string }[]
}

export interface ComparePreset {
  id: string
  label: string
  variantAId: string
  variantBId: string
}

/** All gearbox types available in the multi-select filter */
export type GearboxFilterType = TransmissionType

export interface FilterState {
  search: string
  fuel: FuelType | 'all'
  /** Multi-select: MT, iMT, DCT, AT — empty means all gearboxes */
  transmissions: GearboxFilterType[]
  trim: string | 'all'
  budgetMin: number
  budgetMax: number
  features: string[]
  sort: 'price-asc' | 'price-desc' | 'name' | 'recommended'
}
