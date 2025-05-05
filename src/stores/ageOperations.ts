import { defineStore } from 'pinia'

export const useAgeOperationsStore = defineStore('ageOperations', {
  state: () => ({
    ageInput: [] as number[],
  }),
})