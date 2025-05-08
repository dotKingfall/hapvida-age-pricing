import { useAppStore } from '@/stores/app'
import type { Tier } from '@/types/planTypes'
import * as labels from '@/labels'

type PriceData = {
  age: number
  range: string
  tier: Tier
}

export const formatPricingData = (data: PriceData[]) => {
  const withCop = data
  const noCop = data

  return { withCop, noCop }
}