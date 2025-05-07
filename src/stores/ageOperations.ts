import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Plan } from '@/types/planTypes'
import { useAppStore } from './app'

export const useAgeOperationsStore = defineStore('ageOperations', () => {
  // State
  const ageInput = ref<number[]>([])
  const agePrices = ref<Array<{
    age: number,
    range: string,
    enf: (number | null)[],
    amb: (number | null)[],
    apt: (number | null)[],
  }>>([])
  const plan = ref<Plan | null>(null)

  // Get the app store
  const appStore = useAppStore()

  // Watch selectedPlans and ageInput to update agePrices
  watch(
    [() => appStore.selectedPlans, ageInput],
    ([newSelectedPlans, newAges]) => {
      const selectedPlan = (newSelectedPlans as (Plan | null)[])?.find((p): p is Plan => p !== null) || null
      plan.value = selectedPlan

      if (selectedPlan && newAges.length > 0) {
        agePrices.value = newAges.map(age => selectedPlan.getAgePrice(age))
      } else {
        agePrices.value = []
      }
    },
    { deep: true, immediate: true }
  )

  return {
    ageInput,
    agePrices,
    plan,
  }
})