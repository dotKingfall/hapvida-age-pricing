import type { PriceData, Tier } from '@/types/planTypes'
import * as labels from '@/labels'
import { useAgeOperationsStore } from '@/stores/ageOperations'
import { useAppStore } from '@/stores/app'

interface OutputTier {
  range: number
  enf: number | null
  amb: number | null
  apt: number | null
}

export const formatPricingData = (data: PriceData[]) => {
  const ageOperation = useAgeOperationsStore()
  const appStore = useAppStore()

  const withCop: PriceData[] = data.map(item => {
    const { age, tier } = item
    const tierInfo = ageOperation.getTierForAge(age)
    const range = tierInfo?.range ?? 'None'

    const isSmartPlan = [
      labels.plan_names[4],
      labels.plan_names[5]
    ].includes(appStore.selectedPlan?.getName() ?? 'None')

    const index = isSmartPlan && ageOperation.ageInput.length >= 2 ? 3 : 1

    const tiers = appStore.selectedPlan?.getTiers()
    const tierInstance = tiers?.find(t => age <= t.getRange()) || tiers?.[tiers.length - 1]

    return {
      age,
      range,
      tier: {
        range: tierInstance?.getRange() ?? null,
        enf: tierInstance?.getEnf()[index] ?? null,
        amb: tierInstance?.getAmb()[index] ?? null,
        apt: tierInstance?.getApt()[index] ?? null,
      }
    }
  })

  const noCop: PriceData[] = data.map(item => {
    const { age, tier } = item
    const tierInfo = ageOperation.getTierForAge(age)
    const range = tierInfo?.range ?? 'None'

    const isSmartPlan = [
      labels.plan_names[4],
      labels.plan_names[5]
    ].includes(appStore.selectedPlan?.getName() ?? 'None')

    const index = isSmartPlan && ageOperation.ageInput.length >= 2 ? 2 : 0

    const tiers = appStore.selectedPlan?.getTiers()
    const tierInstance = tiers?.find(t => age <= t.getRange()) || tiers?.[tiers.length - 1]

    return {
      age,
      range,
      tier: {
        range: tierInstance?.getRange() ?? null,
        enf: tierInstance?.getEnf()[index] ?? null,
        amb: tierInstance?.getAmb()[index] ?? null,
        apt: tierInstance?.getApt()[index] ?? null,
      }
    }
  })

  return { withCop, noCop }
}