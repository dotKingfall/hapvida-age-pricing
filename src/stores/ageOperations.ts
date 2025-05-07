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

  return {
    ageInput,
    agePrices,
  }
})