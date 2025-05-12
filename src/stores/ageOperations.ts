import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Plan, Tier, PriceData } from '@/types/planTypes'
import { useAppStore } from './app'

export const useAgeOperationsStore = defineStore('ageOperations', () => {
  // State
  const ageInput = ref<number[]>([])
  const agePrices = ref<PriceData[]>([])

  const appStore = useAppStore()

  const getTierForAge = (age?: number): PriceData | null => {
    if (!appStore.selectedPlan || age === undefined) return null

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

    // Default index (adjust based on your logic)
    const index = 0

    return {
      age,
      range: rangeStr,
      tier: {
        range: tier.getRange(),
        enf: tier.getEnf()[index] ?? null,
        amb: tier.getAmb()[index] ?? null,
        apt: tier.getApt()[index] ?? null,
      }
    }
  }

  watch([ageInput, () => appStore.selectedPlan], () => {
    agePrices.value = ageInput.value
      .map(age => getTierForAge(age))
      .filter((item): item is PriceData => item !== null)
  }, { deep: true })

  return {
    ageInput,
    agePrices,
    getTierForAge
  }
})