import { defineStore } from 'pinia'

export const useGlobalConfigStore = defineStore('globalConfig', {
  state: () => ({
    applyDiscount: false,
    discountValue: 0,
    discount2Plus: 7,
    showRange: false,
  }),
  actions: {
    // Update discount settings
    setDiscountSettings({ apply, value, plus }: { apply: boolean; value: number; plus: number }) {
      this.applyDiscount = apply
      this.discountValue = value
      this.discount2Plus = plus
    },
    // Toggle showRange
    toggleShowRange() {
      this.showRange = !this.showRange
    },
  },
})