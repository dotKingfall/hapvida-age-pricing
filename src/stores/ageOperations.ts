import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Plan, Tier } from '@/types/planTypes'
import { useAppStore } from './app'

type PriceData = {
  age: number
  range: string
  tier: Tier
}

export const useAgeOperationsStore = defineStore('ageOperations', () => {
  // State
  const ageInput = ref<number[]>([])
  const agePrices = ref<PriceData[]>([])

  const appStore = useAppStore()

  const getTierForAge = (age: number): { range: string, tier: Tier } | null => {
    if (!appStore.selectedPlan) return null

    const tiers = appStore.selectedPlan.getTiers()
    const tier = tiers.find(t => age <= t.getRange()) || tiers[tiers.length - 1]

    let rangeStr: string
    if (age >= 59) {
      rangeStr = '59 ou mais'
    } else {
      const rangeValue = tier.getRange()
      const start = rangeValue === 18 ? 0 : tiers[tiers.indexOf(tier) - 1]?.getRange() + 1 || 0
      const formattedStart = start < 10 ? `0${start}` : start
      const formattedEnd = rangeValue < 10 ? `0${rangeValue}` : rangeValue
      rangeStr = `${formattedStart} a ${formattedEnd}`
    }

    return { range: rangeStr, tier }
  }

  watch([ageInput, () => appStore.selectedPlan], () => {
    agePrices.value = ageInput.value
      .map(age => {
        const result = getTierForAge(age)
        if (!result) return null
        return {
          age,
          range: result.range,
          tier: result.tier
        }
      })
      .filter((item): item is PriceData => item !== null)
  }, { deep: true })

  return {
    ageInput,
    agePrices,
    getTierForAge
  }
})