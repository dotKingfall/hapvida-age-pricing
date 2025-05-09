import { Tier } from '@/types/planTypes'
import * as labels from '@/labels'
import { useAgeOperationsStore } from '@/stores/ageOperations'
import { useAppStore } from '@/stores/app'

interface OutputTier {
  range: number
  enf: number | null
  amb: number | null
  apt: number | null
}

type PriceData = {
  age: number
  range: string
  tier: OutputTier
}

export const formatPricingData = (data: PriceData[]) => {
  const ageOperation = useAgeOperationsStore()
  const appStore = useAppStore()

  const withCop: PriceData[] = data.map(item => {
    const { age, tier } = item
    const tierInfo = ageOperation.getTierForAge(age)
    const range = tierInfo.range

    const isSmartPlan = [
      labels.plan_names[4],
      labels.plan_names[5]
    ].includes(appStore.selectedPlan.getName())

    const index = isSmartPlan && ageOperation.ageInput.length >= 2 ? 3 : 1

    return {
      age,
      range,
      tier: {
        range: tier.getRange(),
        enf: tier.getEnf()[index],
        amb: tier.getAmb()[index],
        apt: tier.getApt()[index]
      }
    }
  })

  const noCop: PriceData[] = data.map(item => {
    const { age, tier } = item
    const tierInfo = ageOperation.getTierForAge(age)
    const range = tierInfo.range

    const isSmartPlan = [
      labels.plan_names[4],
      labels.plan_names[5]
    ].includes(appStore.selectedPlan.getName())

    const index = isSmartPlan && ageOperation.ageInput.length >= 2 ? 2 : 0

    return {
      age,
      range,
      tier: {
        range: tier.getRange(),
        enf: tier.getEnf()[index],
        amb: tier.getAmb()[index],
        apt: tier.getApt()[index]
      }
    }
  })

  return { withCop, noCop }
}