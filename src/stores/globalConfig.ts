import { defineStore } from 'pinia'

export const useGlobalConfigStore = defineStore('globalConfig', {
  state: () => {
    // Load initial state from localStorage, or use defaults
    const savedConfig = localStorage.getItem('globalConfig')
    return savedConfig
      ? JSON.parse(savedConfig)
      : {
          applyDiscount: false,
          discountValue: 0,
          discount2Plus: 7,
          showRange: false,
        }
  },
  actions: {
    // Update discount settings
    setDiscountSettings({ apply, value, plus }: { apply: boolean; value: number; plus: number }) {
      this.applyDiscount = apply
      this.discountValue = value
      this.discount2Plus = plus
      this.saveToLocalStorage()
    },
    // Toggle showRange
    toggleShowRange() {
      this.showRange = !this.showRange
      this.saveToLocalStorage()
    },
    // Save state to localStorage
    saveToLocalStorage() {
      localStorage.setItem('globalConfig', JSON.stringify(this.$state))
    },
  },
})