import variantsData from './variants.json'
import featuresData from './features.json'
import pricingData from './pricing.json'
import type { Variant, EngineSpec } from '../types'

export const variants = variantsData as Variant[]
export const features = featuresData
export const pricing = pricingData

export const engines = featuresData.engines as EngineSpec[]
export const filterTags = featuresData.filterTags
export const comparePresets = featuresData.comparePresets
